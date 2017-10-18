using System;
using System.Activities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Xml.Linq;

using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;

using Ionic.Zip;


namespace Cognosante.Xrm.Plugins.Unzip
{
    public class UnzipArchive : ActivityBase
    {

        [Input("Email")]
        [RequiredArgument]
        [ReferenceTarget("email")]
        public InArgument<EntityReference> Email { get; set; }

        [Input("Associated Case")]
        [ReferenceTarget("cog_case")]
        public InArgument<EntityReference> Case { get; set; }

        [Input("Save to SharePoint?")]
        [RequiredArgument]
        [Default("False")]
        public InArgument<bool> SaveToSharePoint { get; set; }

        [Input("SharePointSite")]
        public InArgument<string> SharePointSite { get; set; }

        [Input("Archive Password")]
        public InArgument<string> Password { get; set; }

        private static string user = "wwilson";
        private static string pw = "***";
        private static string domain = "AZ";

        public override void Execute()
        {
            //  check for a valid sharepoint site for the case
            if(this.SaveToSharePoint.Get(ExecutionContext))
            {
                if(this.Case.Get(ExecutionContext) == null)
                {
                    throw new Exception("A case record must be specified to save files to SharePoint.");
                }
            }

            //  read attachments from CRM email record
            Guid emailId = this.Email.Get(ExecutionContext).Id;
            EntityCollection atts = GetAttachments(Service, emailId);
            foreach (Entity att in atts.Entities)
            {
                //  process zip archives
                if (att.Contains("filename"))
                {
                    string fileName = (string)att["filename"];
                    if (fileName.Substring(Math.Max(0, fileName.Length - 4)).ToLower() == ".zip")
                    {
                        //  extract file
                        Console.WriteLine("process " + fileName);
                        MemoryStream memStream = new MemoryStream(Convert.FromBase64String((string)att["body"]));
                        Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                        if (this.Password.Get(ExecutionContext) != null)
                        {
                            files = UnZipToMemoryPassword(memStream, this.Password.Get(ExecutionContext));
                        }
                        else
                        {
                            files = UnZipToMemory(memStream);
                        }
                        foreach (KeyValuePair<string, MemoryStream> file in files)
                        {
                            //  save to SP or CRM
                            if (this.SaveToSharePoint.Get(ExecutionContext))
                            {
                                //   determine SP library location
                                Entity location = GetDocumentLocation(Service, this.Case.Get(ExecutionContext).Id);

                                if (location == null)
                                {
                                    //  get sharepoint site
                                    Entity spSite = GetSharePointSite(Service);

                                    //  get parent site
                                    Entity parentSite = GetParentSite(Service);

                                    //  create location
                                    Entity docLocation = new Entity("sharepointdocumentlocation");
                                    docLocation.Attributes.Add("name", parentSite.GetStringValue("name"));
                                    docLocation.Attributes.Add("parentsiteorlocation", new EntityReference(parentSite.LogicalName, parentSite.Id));
                                    docLocation.Attributes.Add("relativeurl", string.Format("{0}_{1}", this.Case.Get(ExecutionContext).Name, this.Case.Get(ExecutionContext).Id.ToString().ToUpper()));
                                    docLocation.Attributes.Add("regardingobjectid", new EntityReference("cog_case", this.Case.Get(ExecutionContext).Id));
                                    Guid id = Service.Create(docLocation);
                                    location = Service.Retrieve("sharepointdocumentlocation", id, new ColumnSet(true));
                                }

                                if (location != null)
                                {
                                    //  upload to SharePoint
                                    string folder = string.Format("{0}_{1}", this.Case.Get(ExecutionContext).Name, this.Case.Get(ExecutionContext).Id.ToString().ToUpper());

                                    string spSite = this.SharePointSite.Get(ExecutionContext);  //  https://devnpisp.corp.cognosante.com/NPI-Test
                                    if (spSite == null) { throw new Exception("SharePoint site cannot be blank."); }

                                    string digest = GetFormDigest(spSite);
                                    string folderUrl = spSite + "/_api/web/GetFolderByServerRelativeUrl('/NPI-Test/COG_Case/" + folder + "')";

                                    WebClient wc = new WebClient() { Credentials = new NetworkCredential(user, pw, domain) };

                                    //  look for folder in SP
                                    try
                                    {
                                        Stream response = wc.OpenRead(folderUrl);
                                        StreamReader sr = new StreamReader(response);
                                        Console.WriteLine(sr.ReadToEnd());
                                    }
                                    catch (WebException wx)
                                    {
                                        HttpStatusCode status = ((HttpWebResponse)wx.Response).StatusCode;
                                        if (status == HttpStatusCode.NotFound)
                                        {
                                            //  folder's not in SP, we need to create it
                                            string body = "{ '__metadata': { 'type': 'SP.Folder' }, 'ServerRelativeUrl': '/NPI-Test/COG_Case/" + folder + "'}";
                                            wc.Headers.Add("X-RequestDigest", digest);
                                            wc.Headers.Add(HttpRequestHeader.Accept, "application/json;odata=verbose");
                                            wc.Headers.Add(HttpRequestHeader.ContentType, "application/json;odata=verbose");

                                            string createUrl = spSite + "/_api/web/folders";
                                            try
                                            {
                                                string result = wc.UploadString(createUrl, body);
                                            }
                                            catch (WebException wex)
                                            {
                                                //  unable to create folder
                                                throw new Exception("Unable to create folder in SharePoint.");
                                            }

                                        }
                                    }

                                    //  upload file
                                    byte[] content = file.Value.ToArray();
                                    string fileUrl = folderUrl + "/Files/add(url='"+file.Key+"',overwrite=true)";
                                    wc = new WebClient() { Credentials = new NetworkCredential(user, pw, domain) };
                                    wc.Headers.Add("X-RequestDigest", digest);
                                    wc.UploadData(fileUrl, content);
                                }
                            }
                            else
                            {
                                //  save to CRM
                                Entity addFile = new Entity("activitymimeattachment");
                                addFile["filename"] = file.Key;
                                addFile["body"] = Convert.ToBase64String(file.Value.ToArray());
                                addFile["objectid"] = new EntityReference("email", emailId);
                                addFile["objecttypecode"] = "email";
                                Guid createdId = Service.Create(addFile);
                            }
                        }
                    }
                }
            }
        }

        private static EntityCollection GetAttachments(IOrganizationService service, Guid emailId)
        {
            QueryExpression qry = new QueryExpression("activitymimeattachment")
            {
                ColumnSet = new ColumnSet(true),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        //Specify which template we need.
                        new ConditionExpression
                        {
                            AttributeName = "objectid",
                            Operator = ConditionOperator.Equal,
                            Values = {emailId}
                        }
                    }
                }
            };
            return service.RetrieveMultiple(qry);
        }

        private static Entity GetSharePointSite(IOrganizationService service)
        {
            QueryExpression qry = new QueryExpression("sharepointsite")
            {
                ColumnSet = new ColumnSet(true),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        //Specify which template we need.
                        new ConditionExpression
                        {
                            AttributeName = "isdefault",
                            Operator = ConditionOperator.Equal,
                            Values = { true }
                        }
                    }
                }
            };
            EntityCollection ec = service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
        }

        private static Entity GetParentSite(IOrganizationService service)
        {
            QueryExpression qry = new QueryExpression("sharepointdocumentlocation")
            {
                ColumnSet = new ColumnSet(true),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        //Specify which template we need.
                        new ConditionExpression
                        {
                            AttributeName = "relativeurl",
                            Operator = ConditionOperator.Equal,
                            Values = { "cog_case" }
                        }
                    }
                }
            };
            EntityCollection ec = service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
        }

        private static Entity GetDocumentLocation(IOrganizationService service, Guid caseId)
        {
            QueryExpression qry = new QueryExpression("sharepointdocumentlocation")
            {
                ColumnSet = new ColumnSet(true),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        //Specify which template we need.
                        new ConditionExpression
                        {
                            AttributeName = "regardingobjectid",
                            Operator = ConditionOperator.Equal,
                            Values = {caseId}
                        }
                    }
                }
            };
            EntityCollection ec = service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
        }

        private static Dictionary<string, MemoryStream> UnZipToMemory(Stream fileStream)
        {
            var result = new Dictionary<string, MemoryStream>();
            using (ZipFile zip = ZipFile.Read(fileStream))
            {
                foreach (ZipEntry e in zip)
                {
                    MemoryStream data = new MemoryStream();
                    e.Extract(data);
                    result.Add(e.FileName, data);
                }
            }
            return result;
        }

        private static Dictionary<string, MemoryStream> UnZipToMemoryPassword(Stream fileStream, string password)
        {
            var result = new Dictionary<string, MemoryStream>();

            using (ZipFile zip = ZipFile.Read(fileStream))
            {
                zip.Password = password;
                foreach (ZipEntry e in zip)
                {
                    MemoryStream data = new MemoryStream();
                    e.Extract(data);
                    result.Add(e.FileName, data);
                }
            }
            return result;
        }

        private static string GetFormDigest(string host)
        {
            string formDigest = "";
            string endpoint = "/_api/contextinfo";
            WebClient wc = new WebClient() { Credentials = new NetworkCredential(user, pw, domain) };

            var result = wc.UploadString(host + endpoint, "");
            // parse the ContextInfo response
            var resultXml = XDocument.Parse(result);

            // get the form digest value
            var e = from d in resultXml.Descendants()
                    where d.Name == XName.Get("FormDigestValue", "http://schemas.microsoft.com/ado/2007/08/dataservices")
                    select d;
            formDigest = e.First().Value;
            return formDigest;
        }

    }
}

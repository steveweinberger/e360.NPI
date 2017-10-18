using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;


namespace Cognosante.Xrm.Plugins.SharePoint
{
    public class CreateSharepointFolder : PluginBase, IPlugin
    {
        public CreateSharepointFolder(string config, string secureConfig) : base(config, secureConfig) { }

        public override void Execute()
        {
            //  grab id of target
            if (this.Context.InputParameters.Contains("Target") && this.Context.InputParameters["Target"] is Entity)
            {
                //  get current entity id
                //TracingService.Trace("Get current entity");
                Entity target = (Entity)this.Context.InputParameters["Target"];
                //TracingService.Trace("id: {0}", target.Id);

                //  query back in to get the auto-generated number
                Entity record = this.Service.Retrieve(target.LogicalName, target.Id, new ColumnSet("cog_name"));
                string name = (record.Contains("cog_name") ? (string)record["cog_name"] : "");    //  need to adjust this if using on canned entities. use metadata service for primary field?
                //TracingService.Trace("name: {0}", name);

                string relativeUrl = string.Format("{0}_{1}", name, target.Id.ToString().ToUpper());
                TracingService.Trace("relativeUrl: {0}", relativeUrl);

                //  get SP credentials from config entity
                //TracingService.Trace("Get SP Credentials");
                Entity config = GetPluginConfig();
                if(config == null) { throw new Exception("SharePoint Creds setting record not found."); }
                string creds = config.Contains("cog_textvalue") ? config.GetStringValue("cog_textvalue") : ";";
                string user = creds.Split(';')[0];
                string pwd = creds.Split(';')[1];

                //  get default sharepoint site
                //TracingService.Trace("Get Default SharePoint Site");
                Entity spSite = GetSharePointSite(Service);
                string siteUrl = (string)spSite["absoluteurl"];
                TracingService.Trace("siteUrl: {0}", siteUrl);

                //   determine SP library location
                TracingService.Trace("Get SP Library location");
                Entity location = GetDocumentLocation(Service, target.Id);

                if (location == null)
                {
                    //TracingService.Trace("Location not in CRM...creating...");
                    //  get parent site
                    //TracingService.Trace("  Get Parent Site");
                    Entity parentSite = GetParentSite(Service, target.LogicalName); //  assumes relative url is same as entity schema name (ie. cog_case)

                    //  create location
                    //TracingService.Trace("  Create Location");
                    Entity docLocation = new Entity("sharepointdocumentlocation");
                    docLocation.Attributes.Add("name", (string)parentSite["name"]);
                    docLocation.Attributes.Add("parentsiteorlocation", new EntityReference(parentSite.LogicalName, parentSite.Id));
                    docLocation.Attributes.Add("relativeurl", relativeUrl);
                    docLocation.Attributes.Add("regardingobjectid", new EntityReference(target.LogicalName, target.Id));
                    Guid id = Service.Create(docLocation);
                    location = Service.Retrieve("sharepointdocumentlocation", id, new ColumnSet(true));
                }

                //  https://cognosante.sharepoint.com/sites/npitest/_api/web/GetFolderByServerRelativeUrl('cog_case/521_3D201E4EAF17E61180E3C4346BDC0271')
                string folderUrl = string.Format("_api/web/GetFolderByServerRelativeUrl('{1}/{2}')", siteUrl, target.LogicalName, relativeUrl);
                TracingService.Trace("folderUrl: {0}", folderUrl);

                Uri spSiteUri = new Uri(siteUrl);
                //  attempt to connect to SharePoint location
                bool success = SpoAuthUtility.Create(spSiteUri, user, WebUtility.HtmlEncode(pwd), false);
                if (success)
                {
                    TracingService.Trace("create {0}", relativeUrl);
                    Uri createUrl = new Uri(String.Format("{0}/{1}", SpoAuthUtility.Current.SiteUrl,"_api/web/folders"));
                    string postBody = "{ '__metadata': { 'type': 'SP.Folder' }, 'ServerRelativeUrl': '" + 
                        target.LogicalName + "/" + relativeUrl + "'}";
                    TracingService.Trace("postBody: {0}", postBody);

                    byte[] result = HTTPHelper.SendODataJsonRequest(
                        createUrl,
                        "POST",
                        Encoding.UTF8.GetBytes(postBody.ToCharArray()),
                        (HttpWebRequest)HttpWebRequest.Create(createUrl),
                        SpoAuthUtility.Current,
                        new Dictionary<string, string> { { "X-RequestDigest", SpoAuthUtility.GetRequestDigest() } }
                        );
                    string response = Encoding.UTF8.GetString(result, 0, result.Length);
                    TracingService.Trace(response);
                }
            }
        }

        private Entity GetPluginConfig()
        {
            QueryExpression qry = new QueryExpression("cog_cogsetting")
            {
                ColumnSet = new ColumnSet(true),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        new ConditionExpression("cog_name",ConditionOperator.Equal,"SharePoint Creds")
                    }
                }
            };
            EntityCollection ec = this.Service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
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

        private static Entity GetParentSite(IOrganizationService service, string relativeUrl)
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
                            Values = { relativeUrl }
                        }
                    }
                }
            };
            EntityCollection ec = service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
        }

        private static Entity GetDocumentLocation(IOrganizationService service, Guid id)
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
                            Values = {id}
                        }
                    }
                }
            };
            EntityCollection ec = service.RetrieveMultiple(qry);
            return ec.Entities.Count == 1 ? ec.Entities[0] : null;
        }


    }
}

/// <reference path="Xrm.js" />

var EntityLogicalName = "cog_case";
var Form_7babd95b_7681_4fdf_aa04_a5100da7081b_Properties = {
cog_applicationtype: "cog_applicationtype"
,cog_callrequired: "cog_callrequired"
,cog_casecreatedfromfax: "cog_casecreatedfromfax"
,cog_casestatus: "cog_casestatus"
,cog_casetype: "cog_casetype"
,cog_clonecase: "cog_clonecase"
,cog_contactfirstname: "cog_contactfirstname"
,cog_contactid: "cog_contactid"
,cog_contactlastname: "cog_contactlastname"
,cog_contactphonenumber: "cog_contactphonenumber"
,cog_contactsameasprovider: "cog_contactsameasprovider"
,cog_correspondencestatus: "cog_correspondencestatus"
,cog_createdfromworkflow: "cog_createdfromworkflow"
,cog_datecasecompleted: "cog_datecasecompleted"
,cog_dateofbirth: "cog_dateofbirth"
,cog_dcn: "cog_dcn"
,cog_eincheckbox: "cog_eincheckbox"
,cog_entitytype: "cog_entitytype"
,cog_extensionnumber: "cog_extensionnumber"
,cog_followupcalldate: "cog_followupcalldate"
,cog_gatekeeper: "cog_gatekeeper"
,cog_gender: "cog_gender"
,cog_internationalnumber: "cog_internationalnumber"
,cog_lst: "cog_lst"
,cog_missingverifystateoflicense: "cog_missingverifystateoflicense"
,cog_name: "cog_name"
,cog_name_boolean: "cog_name_boolean"
,cog_noidentifiers: "cog_noidentifiers"
,cog_npi: "cog_npi"
,cog_npilist: "cog_npilist"
,cog_number: "cog_number"
,cog_organization: "cog_organization"
,cog_originalreceiptdate: "cog_originalreceiptdate"
,cog_other: "cog_other"
,cog_otheridentifiers: "cog_otheridentifiers"
,cog_parentcaseid: "cog_parentcaseid"
,cog_providerfirstname: "cog_providerfirstname"
,cog_providerlastname: "cog_providerlastname"
,cog_providername: "cog_providername"
,cog_receiptdate: "cog_receiptdate"
,cog_resolutiondate: "cog_resolutiondate"
,cog_resolutiontype: "cog_resolutiontype"
,cog_signatureverification: "cog_signatureverification"
,cog_ssnmissing: "cog_ssnmissing"
,cog_ssnvalidation: "cog_ssnvalidation"
,cog_statecountryofbirth: "cog_statecountryofbirth"
,cog_tid: "cog_tid"
,cog_timezone: "cog_timezone"
,cog_twobusinessdayslater: "cog_twobusinessdayslater"
,cog_verifyaddress: "cog_verifyaddress"
,cog_verifylicensestate: "cog_verifylicensestate"
,cog_verifyphone: "cog_verifyphone"
,cog_verifytaxonomycode: "cog_verifytaxonomycode"
,cog_verifytitleposition: "cog_verifytitleposition"
,createdon: "createdon"
,ownerid: "ownerid"
};

var Form_7babd95b_7681_4fdf_aa04_a5100da7081b_Controls = {
Cases: "Cases"
,cog_applicationtype: "cog_applicationtype"
,cog_callrequired: "cog_callrequired"
,cog_casecreatedfromfax: "cog_casecreatedfromfax"
,cog_casetype: "cog_casetype"
,cog_clonecase: "cog_clonecase"
,cog_contactfirstname: "cog_contactfirstname"
,cog_contactid: "cog_contactid"
,cog_contactlastname: "cog_contactlastname"
,cog_contactphonenumber: "cog_contactphonenumber"
,cog_contactsameasprovider: "cog_contactsameasprovider"
,cog_correspondencestatus: "cog_correspondencestatus"
,cog_createdfromworkflow: "cog_createdfromworkflow"
,cog_datecasecompleted: "cog_datecasecompleted"
,cog_dateofbirth: "cog_dateofbirth"
,cog_dcn: "cog_dcn"
,cog_eincheckbox: "cog_eincheckbox"
,cog_entitytype: "cog_entitytype"
,cog_extensionnumber: "cog_extensionnumber"
,cog_followupcalldate: "cog_followupcalldate"
,cog_gatekeeper: "cog_gatekeeper"
,cog_gender: "cog_gender"
,cog_internationalnumber: "cog_internationalnumber"
,cog_lst: "cog_lst"
,cog_missingverifystateoflicense: "cog_missingverifystateoflicense"
,cog_name: "cog_name"
,cog_name_boolean: "cog_name_boolean"
,cog_noidentifiers: "cog_noidentifiers"
,cog_npi: "cog_npi"
,cog_npilist: "cog_npilist"
,cog_organization: "cog_organization"
,cog_originalreceiptdate: "cog_originalreceiptdate"
,cog_other: "cog_other"
,cog_otheridentifiers: "cog_otheridentifiers"
,cog_parentcaseid: "cog_parentcaseid"
,cog_providerfirstname: "cog_providerfirstname"
,cog_providerlastname: "cog_providerlastname"
,cog_providername: "cog_providername"
,cog_receiptdate: "cog_receiptdate"
,cog_resolutiondate: "cog_resolutiondate"
,cog_resolutiontype: "cog_resolutiontype"
,cog_signatureverification: "cog_signatureverification"
,cog_ssnmissing: "cog_ssnmissing"
,cog_ssnvalidation: "cog_ssnvalidation"
,cog_statecountryofbirth: "cog_statecountryofbirth"
,cog_tid: "cog_tid"
,cog_timezone: "cog_timezone"
,cog_twobusinessdayslater: "cog_twobusinessdayslater"
,cog_verifyaddress: "cog_verifyaddress"
,cog_verifylicensestate: "cog_verifylicensestate"
,cog_verifyphone: "cog_verifyphone"
,cog_verifytaxonomycode: "cog_verifytaxonomycode"
,cog_verifytitleposition: "cog_verifytitleposition"
,Contact: "Contact"
,header_cog_casestatus: "header_cog_casestatus"
,header_cog_number: "header_cog_number"
,header_createdon: "header_createdon"
,header_ownerid: "header_ownerid"
,Letter: "Letter"
,Notes: "Notes"
,ownerid: "ownerid"
,PMA: "PMA"
,Providers: "Providers"
,WebResource_NPIDirections: "WebResource_NPIDirections"
};

var pageData = {
"Event": "none",
"SaveMode": 1,
"EventSource": null,
"AuthenticationHeader": "",
"CurrentTheme": "Default",
"OrgLcid":  1033,
"OrgUniqueName": "",
"QueryStringParameters": { "_gridType": "10007", "etc": "10007", "id": "", "pagemode": "iframe", "preloadcache": "1344548892170", "rskey": "141637534" },
"ServerUrl": "",
"UserId": "",
"UserLcid":  1033,
"UserRoles":  [""],
"isOutlookClient":  false,
"isOutlookOnline":  true,
"DataXml": "",
"EntityName": "cog_case",
"Id": "",
"IsDirty":  false,
"CurrentControl": "",
"CurrentForm":  null,
"Forms":  [],
"FormType":  2,
"ViewPortHeight":  558,
"ViewPortWidth":  1231,
"Attributes":  [
{ "Name": "cog_applicationtype", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "Reactivation", "value": 181310000 }, { "text" : "Returns", "value": 181310001 }, { "text" : "Deactivation", "value": 181310002 }, { "text" : "Initial", "value": 100000000 }, { "text" : "Change", "value": 100000001 }], "SelectedOption" : { "option" : "Reactivation", "value": 181310000 }, "Text": "Reactivation", "Controls": [{ "Name": "cog_applicationtype" }] }, 
{ "Name": "cog_callrequired", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_callrequired" }] }, 
{ "Name": "cog_casecreatedfromfax", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_casecreatedfromfax" }] }, 
{ "Name": "cog_casestatus", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "Open", "value": 181310000 }, { "text" : "Closed", "value": 181310002 }, { "text" : "Overdue", "value": 181310003 }, { "text" : "Frozen", "value": 181310004 }], "SelectedOption" : { "option" : "Open", "value": 181310000 }, "Text": "Open", "Controls": [{ "Name": "header_cog_casestatus" }] }, 
{ "Name": "cog_casetype", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "Inbound Call", "value": 181310000 }, { "text" : "Complaint", "value": 181310001 }, { "text" : "Error Resolution - Web", "value": 181310002 }, { "text" : "Error Resolution - EFI", "value": 181310003 }, { "text" : "Error Resolution - Paper", "value": 181310004 }, { "text" : "Email", "value": 181310005 }, { "text" : "Outbound Call", "value": 181310006 }, { "text" : "Fraud", "value": 181310007 }, { "text" : "Assistance Pilot", "value": 181310008 }, { "text" : "Correspondence", "value": 181310009 }, { "text" : "Paper Application", "value": 181310010 }], "SelectedOption" : { "option" : "Inbound Call", "value": 181310000 }, "Text": "Inbound Call", "Controls": [{ "Name": "cog_casetype" }] }, 
{ "Name": "cog_clonecase", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_clonecase" }] }, 
{ "Name": "cog_contactfirstname", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_contactfirstname" }] }, 
{ "Name": "cog_contactid", "Value": [{ "entityType": "Unknown", "id": "{27ACAE0A-5D79-E111-BBD3-2657AEB3167B}", "name": "Temp"}], "Type" : "lookup", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_contactid" }, { "Name": "Contact" }] }, 
{ "Name": "cog_contactlastname", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_contactlastname" }] }, 
{ "Name": "cog_contactphonenumber", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 20, "Controls": [{ "Name": "cog_contactphonenumber" }] }, 
{ "Name": "cog_contactsameasprovider", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_contactsameasprovider" }] }, 
{ "Name": "cog_correspondencestatus", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "To Be Worked", "value": 181310000 }, { "text" : "In Progress", "value": 181310001 }, { "text" : "Completed", "value": 181310002 }, { "text" : "Rejected", "value": 181310003 }], "SelectedOption" : { "option" : "To Be Worked", "value": 181310000 }, "Text": "To Be Worked", "Controls": [{ "Name": "cog_correspondencestatus" }] }, 
{ "Name": "cog_createdfromworkflow", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_createdfromworkflow" }] }, 
{ "Name": "cog_datecasecompleted", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_datecasecompleted" }] }, 
{ "Name": "cog_dateofbirth", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_dateofbirth" }] }, 
{ "Name": "cog_dcn", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_dcn" }] }, 
{ "Name": "cog_eincheckbox", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_eincheckbox" }] }, 
{ "Name": "cog_entitytype", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_entitytype" }] }, 
{ "Name": "cog_extensionnumber", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_extensionnumber" }] }, 
{ "Name": "cog_followupcalldate", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_followupcalldate" }] }, 
{ "Name": "cog_gatekeeper", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_gatekeeper" }] }, 
{ "Name": "cog_gender", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_gender" }] }, 
{ "Name": "cog_internationalnumber", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_internationalnumber" }] }, 
{ "Name": "cog_lst", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_lst" }] }, 
{ "Name": "cog_missingverifystateoflicense", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_missingverifystateoflicense" }] }, 
{ "Name": "cog_name", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_name" }] }, 
{ "Name": "cog_name_boolean", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_name_boolean" }] }, 
{ "Name": "cog_noidentifiers", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_noidentifiers" }] }, 
{ "Name": "cog_npi", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_npi" }] }, 
{ "Name": "cog_npilist", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 4000, "Controls": [{ "Name": "cog_npilist" }] }, 
{ "Name": "cog_number", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "header_cog_number" }] }, 
{ "Name": "cog_organization", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_organization" }] }, 
{ "Name": "cog_originalreceiptdate", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_originalreceiptdate" }] }, 
{ "Name": "cog_other", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_other" }] }, 
{ "Name": "cog_otheridentifiers", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_otheridentifiers" }] }, 
{ "Name": "cog_parentcaseid", "Value": [{ "entityType": "Unknown", "id": "{27ACAE0A-5D79-E111-BBD3-2657AEB3167B}", "name": "Temp"}], "Type" : "lookup", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_parentcaseid" }] }, 
{ "Name": "cog_providerfirstname", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_providerfirstname" }] }, 
{ "Name": "cog_providerlastname", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_providerlastname" }] }, 
{ "Name": "cog_providername", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_providername" }] }, 
{ "Name": "cog_receiptdate", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_receiptdate" }] }, 
{ "Name": "cog_resolutiondate", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_resolutiondate" }] }, 
{ "Name": "cog_resolutiontype", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "Enumerated/Change Processed", "value": 181310000 }, { "text" : "Rejected", "value": 181310001 }], "SelectedOption" : { "option" : "Enumerated/Change Processed", "value": 181310000 }, "Text": "Enumerated/Change Processed", "Controls": [{ "Name": "cog_resolutiontype" }] }, 
{ "Name": "cog_signatureverification", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_signatureverification" }] }, 
{ "Name": "cog_ssnmissing", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_ssnmissing" }] }, 
{ "Name": "cog_ssnvalidation", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_ssnvalidation" }] }, 
{ "Name": "cog_statecountryofbirth", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_statecountryofbirth" }] }, 
{ "Name": "cog_tid", "Value": "", "Type" : "string", "Format": "text", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "MaxLength" : 100, "Controls": [{ "Name": "cog_tid" }] }, 
{ "Name": "cog_timezone", "Value": null, "Type" : "optionset", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : 930650000, "Options" : [{ "text" : "Eastern", "value": 181310000 }, { "text" : "Central", "value": 181310001 }, { "text" : "Mountain", "value": 181310002 }, { "text" : "Pacific", "value": 181310003 }, { "text" : "Hawaiian", "value": 181310005 }, { "text" : "Alaskan", "value": 181310004 }], "SelectedOption" : { "option" : "Eastern", "value": 181310000 }, "Text": "Eastern", "Controls": [{ "Name": "cog_timezone" }] }, 
{ "Name": "cog_twobusinessdayslater", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "cog_twobusinessdayslater" }] }, 
{ "Name": "cog_verifyaddress", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_verifyaddress" }] }, 
{ "Name": "cog_verifylicensestate", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_verifylicensestate" }] }, 
{ "Name": "cog_verifyphone", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_verifyphone" }] }, 
{ "Name": "cog_verifytaxonomycode", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_verifytaxonomycode" }] }, 
{ "Name": "cog_verifytitleposition", "Value": null, "Type" : "boolean", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "InitialValue" : null, "Controls": [{ "Name": "cog_verifytitleposition" }] }, 
{ "Name": "createdon", "Value": null, "Type" : "datetime", "Format": "date", "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : false, "canCreate" : false}, "Controls": [{ "Name": "header_createdon" }] }, 
{ "Name": "ownerid", "Value": [{ "entityType": "Unknown", "id": "{27ACAE0A-5D79-E111-BBD3-2657AEB3167B}", "name": "Temp"}], "Type" : "lookup", "Format" : null, "IsDirty" : false, "RequiredLevel" : "none", "SubmitMode" : "dirty", "UserPrivilege": { "canRead" : true, "canUpdate" : true, "canCreate" : true}, "Controls": [{ "Name": "header_ownerid" }, { "Name": "ownerid" }] }]
, "AttributesLength": 56, 
"Controls": [
, 
{ "Name": "cog_applicationtype", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Application Type", "Attribute": "cog_applicationtype" }, 
{ "Name": "cog_callrequired", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Call Required", "Attribute": "cog_callrequired" }, 
{ "Name": "cog_casecreatedfromfax", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Case Created From Fax", "Attribute": "cog_casecreatedfromfax" }, 
{ "Name": "cog_casetype", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Case Type", "Attribute": "cog_casetype" }, 
{ "Name": "cog_clonecase", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Clone Case", "Attribute": "cog_clonecase" }, 
{ "Name": "cog_contactfirstname", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact First Name", "Attribute": "cog_contactfirstname" }, 
{ "Name": "cog_contactid", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact", "Attribute": "cog_contactid" }, 
{ "Name": "cog_contactlastname", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact Last Name", "Attribute": "cog_contactlastname" }, 
{ "Name": "cog_contactphonenumber", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact Phone Number", "Attribute": "cog_contactphonenumber" }, 
{ "Name": "cog_contactsameasprovider", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact Same as Provider", "Attribute": "cog_contactsameasprovider" }, 
{ "Name": "cog_correspondencestatus", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Application Status", "Attribute": "cog_correspondencestatus" }, 
{ "Name": "cog_createdfromworkflow", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Created From Workflow", "Attribute": "cog_createdfromworkflow" }, 
{ "Name": "cog_datecasecompleted", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Date Case Completed", "Attribute": "cog_datecasecompleted" }, 
{ "Name": "cog_dateofbirth", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Date of Birth", "Attribute": "cog_dateofbirth" }, 
{ "Name": "cog_dcn", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Original  DCN", "Attribute": "cog_dcn" }, 
{ "Name": "cog_eincheckbox", "Type": "standard", "Disabled": false, "Visible": true, "Label": "EIN", "Attribute": "cog_eincheckbox" }, 
{ "Name": "cog_entitytype", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Entity Type", "Attribute": "cog_entitytype" }, 
{ "Name": "cog_extensionnumber", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Ext.", "Attribute": "cog_extensionnumber" }, 
{ "Name": "cog_followupcalldate", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Follow Up Date", "Attribute": "cog_followupcalldate" }, 
{ "Name": "cog_gatekeeper", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Gatekeeper", "Attribute": "cog_gatekeeper" }, 
{ "Name": "cog_gender", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Gender", "Attribute": "cog_gender" }, 
{ "Name": "cog_internationalnumber", "Type": "standard", "Disabled": false, "Visible": true, "Label": "International Number", "Attribute": "cog_internationalnumber" }, 
{ "Name": "cog_lst", "Type": "standard", "Disabled": false, "Visible": true, "Label": "LST", "Attribute": "cog_lst" }, 
{ "Name": "cog_missingverifystateoflicense", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Missing/ Verify State of License", "Attribute": "cog_missingverifystateoflicense" }, 
{ "Name": "cog_name", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Name", "Attribute": "cog_name" }, 
{ "Name": "cog_name_boolean", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Name", "Attribute": "cog_name_boolean" }, 
{ "Name": "cog_noidentifiers", "Type": "standard", "Disabled": false, "Visible": true, "Label": "No Identification", "Attribute": "cog_noidentifiers" }, 
{ "Name": "cog_npi", "Type": "standard", "Disabled": false, "Visible": true, "Label": "NPI", "Attribute": "cog_npi" }, 
{ "Name": "cog_npilist", "Type": "standard", "Disabled": false, "Visible": true, "Label": "NPI List", "Attribute": "cog_npilist" }, 
{ "Name": "cog_organization", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Organization", "Attribute": "cog_organization" }, 
{ "Name": "cog_originalreceiptdate", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Original Receipt Date", "Attribute": "cog_originalreceiptdate" }, 
{ "Name": "cog_other", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Other", "Attribute": "cog_other" }, 
{ "Name": "cog_otheridentifiers", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Other Identifiers", "Attribute": "cog_otheridentifiers" }, 
{ "Name": "cog_parentcaseid", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Parent Case", "Attribute": "cog_parentcaseid" }, 
{ "Name": "cog_providerfirstname", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Provider First Name", "Attribute": "cog_providerfirstname" }, 
{ "Name": "cog_providerlastname", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Provider Last Name", "Attribute": "cog_providerlastname" }, 
{ "Name": "cog_providername", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Provider/ Org Name", "Attribute": "cog_providername" }, 
{ "Name": "cog_receiptdate", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Receipt Date", "Attribute": "cog_receiptdate" }, 
{ "Name": "cog_resolutiondate", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Resolution Date", "Attribute": "cog_resolutiondate" }, 
{ "Name": "cog_resolutiontype", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Resolution Type", "Attribute": "cog_resolutiontype" }, 
{ "Name": "cog_signatureverification", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Signature Verification", "Attribute": "cog_signatureverification" }, 
{ "Name": "cog_ssnmissing", "Type": "standard", "Disabled": false, "Visible": true, "Label": "SSN Missing", "Attribute": "cog_ssnmissing" }, 
{ "Name": "cog_ssnvalidation", "Type": "standard", "Disabled": false, "Visible": true, "Label": "SSN Validation", "Attribute": "cog_ssnvalidation" }, 
{ "Name": "cog_statecountryofbirth", "Type": "standard", "Disabled": false, "Visible": true, "Label": "State/Country of Birth", "Attribute": "cog_statecountryofbirth" }, 
{ "Name": "cog_tid", "Type": "standard", "Disabled": false, "Visible": true, "Label": "TID", "Attribute": "cog_tid" }, 
{ "Name": "cog_timezone", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Time Zone", "Attribute": "cog_timezone" }, 
{ "Name": "cog_twobusinessdayslater", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Two Business Days Later", "Attribute": "cog_twobusinessdayslater" }, 
{ "Name": "cog_verifyaddress", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Verify Address", "Attribute": "cog_verifyaddress" }, 
{ "Name": "cog_verifylicensestate", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Verify License/State", "Attribute": "cog_verifylicensestate" }, 
{ "Name": "cog_verifyphone", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Verify Phone", "Attribute": "cog_verifyphone" }, 
{ "Name": "cog_verifytaxonomycode", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Verify Taxonomy Code", "Attribute": "cog_verifytaxonomycode" }, 
{ "Name": "cog_verifytitleposition", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Verify Title/ Position", "Attribute": "cog_verifytitleposition" }, 
{ "Name": "Contact", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Contact", "Attribute": "cog_contactid" }, 
{ "Name": "header_cog_casestatus", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Case Status", "Attribute": "cog_casestatus" }, 
{ "Name": "header_cog_number", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Number", "Attribute": "cog_number" }, 
{ "Name": "header_createdon", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Created On", "Attribute": "createdon" }, 
{ "Name": "header_ownerid", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Owner", "Attribute": "ownerid" }, 
{ "Name": "ownerid", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Owner", "Attribute": "ownerid" }], 
"ControlsLength": 58, 
"Navigation": [
{"Id": "navConnections", "Key": "navConnections", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_cog_applicationticket_CaseId", "Key": "nav_cog_case_cog_applicationticket_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_cog_callaudit_CaseId", "Key": "nav_cog_case_cog_callaudit_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_cog_dataentryaudit_CaseId", "Key": "nav_cog_case_cog_dataentryaudit_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_cog_efi_CaseId", "Key": "nav_cog_case_cog_efi_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_cog_solicitedcorrespondence_CaseId", "Key": "nav_cog_case_cog_solicitedcorrespondence_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_email_CaseId", "Key": "nav_cog_case_email_CaseId", "Label": "", "Visible": true }, 
{"Id": "nav_cog_case_phonecall_CaseId", "Key": "nav_cog_case_phonecall_CaseId", "Label": "", "Visible": true }], 
"Tabs": [
{ "Label": "Hidden", "Name": "tab_2", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Section", "Name": "tab_2_section_1", "Visible": true, "Controls": [
{ "Name": "cog_name" }, 
{ "Name": "ownerid" }, 
{ "Name": "cog_twobusinessdayslater" }, 
{ "Name": "cog_casetype" }, 
{ "Name": "cog_createdfromworkflow" }, 
{ "Name": "cog_npilist" }, 
{ "Name": "cog_datecasecompleted" }, 
{ "Name": "cog_casecreatedfromfax" }, 
{ "Name": "cog_clonecase" }]}]}, 
{ "Label": "Contact Information", "Name": "tab_8", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Section", "Name": "tab_8_section_1", "Visible": true, "Controls": [
{ "Name": "Contact" }]}]}, 
{ "Label": "NPI", "Name": "tab_3", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Section", "Name": "tab_3_section_1", "Visible": true, "Controls": [
{ "Name": "Providers" }]}]}, 
{ "Label": "Error Resolution", "Name": "{bb4c0aa4-9e23-4aa1-8dc9-2ff679cf47bf}", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Application Type", "Name": "{bb4c0aa4-9e23-4aa1-8dc9-2ff679cf47bf}_section_3", "Visible": true, "Controls": [
{ "Name": "cog_applicationtype" }, 
{ "Name": "cog_correspondencestatus" }, 
{ "Name": "cog_callrequired" }]}, 
{ "Label": "Application Information", "Name": "{83cdd087-a049-4722-a0a6-e9827bc805bb}", "Visible": true, "Controls": [
{ "Name": "cog_tid" }, 
{ "Name": "cog_receiptdate" }, 
{ "Name": "cog_providerfirstname" }, 
{ "Name": "cog_providerlastname" }, 
{ "Name": "cog_timezone" }, 
{ "Name": "cog_organization" }, 
{ "Name": "cog_followupcalldate" }]}, 
{ "Label": "Contact Information", "Name": "tab_5_section_2", "Visible": true, "Controls": [
{ "Name": "cog_contactsameasprovider" }, 
{ "Name": "cog_contactid" }, 
{ "Name": "cog_contactfirstname" }, 
{ "Name": "cog_contactlastname" }, 
{ "Name": "cog_internationalnumber" }, 
{ "Name": "cog_contactphonenumber" }, 
{ "Name": "cog_extensionnumber" }]}, 
{ "Label": "Notes", "Name": "tab_4_section_1", "Visible": true, "Controls": [
{ "Name": "Notes" }]}]}, 
{ "Label": "Miscellaneous Information", "Name": "tab_5", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "General", "Name": "tab_5_section_1", "Visible": true, "Controls": [
{ "Name": "cog_providername" }, 
{ "Name": "cog_statecountryofbirth" }, 
{ "Name": "cog_eincheckbox" }, 
{ "Name": "cog_ssnmissing" }, 
{ "Name": "cog_dateofbirth" }, 
{ "Name": "cog_gender" }, 
{ "Name": "cog_ssnvalidation" }]}, 
{ "Label": "Address & Phone", "Name": "tab_5_section_5", "Visible": true, "Controls": [
{ "Name": "cog_verifyaddress" }, 
{ "Name": "cog_verifyphone" }]}, 
{ "Label": "Taxonomy/License", "Name": "tab_5_section_3", "Visible": true, "Controls": [
{ "Name": "cog_verifytaxonomycode" }, 
{ "Name": "cog_missingverifystateoflicense" }, 
{ "Name": "cog_verifylicensestate" }, 
{ "Name": "cog_lst" }]}, 
{ "Label": "Authorized Official", "Name": "tab_5_section_6", "Visible": true, "Controls": [
{ "Name": "cog_verifytitleposition" }, 
{ "Name": "cog_name_boolean" }]}, 
{ "Label": "Miscellaneous", "Name": "tab_5_section_8", "Visible": true, "Controls": [
{ "Name": "cog_entitytype" }, 
{ "Name": "cog_signatureverification" }, 
{ "Name": "cog_otheridentifiers" }, 
{ "Name": "cog_noidentifiers" }, 
{ "Name": "cog_gatekeeper" }, 
{ "Name": "cog_other" }]}, 
{ "Label": "Change Information", "Name": "tab_5_section_7", "Visible": true, "Controls": [
{ "Name": "cog_originalreceiptdate" }, 
{ "Name": "cog_dcn" }]}, 
{ "Label": "Disposistion Information", "Name": "tab_5_section_4", "Visible": true, "Controls": [
{ "Name": "cog_resolutiontype" }, 
{ "Name": "cog_resolutiondate" }, 
{ "Name": "WebResource_NPIDirections" }, 
{ "Name": "cog_npi" }]}, 
{ "Label": "Section", "Name": "tab_5_section_9", "Visible": true, "Controls": [
]}]}, 
{ "Label": "Activities", "Name": "tab_6", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Section", "Name": "tab_6_section_1", "Visible": true, "Controls": [
{ "Name": "Letter" }, 
{ "Name": "PMA" }]}]}, 
{ "Label": "Associated Cases", "Name": "tab_7", "DisplayState": "expanded", "Visible": true, "Sections": [
{ "Label": "Section", "Name": "tab_7_section_1", "Visible": true, "Controls": [
{ "Name": "cog_parentcaseid" }, 
{ "Name": "Cases" }]}]}]
};

var Xrm = new _xrm(pageData);

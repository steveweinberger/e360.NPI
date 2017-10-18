/// <reference path="../Common/XrmServiceToolkit.js" />
/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../Common/FormMainScripts.js" />

document.EntityScript.OnCreateSpecificScript = function () {
    MapCaseInfo();
};

document.EntityScript.OnEditSpecificScript = function () {
    HandleCorrespondenceTypeOptions();
};

function HandleCorrespondenceTypeOptions() {
    var val = Xrm.Page.getAttribute("cog_correspondencetype").getValue();
    if (val === 181310004) {
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(true);
        Xrm.Page.getControl("cog_otherdescription").setVisible(false);
        Xrm.Page.getAttribute("cog_otherdescription").setValue(null);
    } else if (val === 181310005) {
        Xrm.Page.getControl("cog_otherdescription").setVisible(true);
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(false);
        Xrm.Page.getAttribute("cog_foreignproviderprojecttype").setValue(null);
    } else {
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(false);
        Xrm.Page.getControl("cog_otherdescription").setVisible(false);
        Xrm.Page.getAttribute("cog_foreignproviderprojecttype").setValue(null);
        Xrm.Page.getAttribute("cog_otherdescription").setValue(null);
    }
}

function MapCaseInfo() {
    var regarding = Xrm.Page.getAttribute("regardingobjectid").getValue();
    if (regarding === null) return;
    if (regarding[0].typename !== "cog_case") return;

    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='cog_case'>" + "<attribute name='cog_caseid' />" + "<attribute name='cog_npilist' />" + "<attribute name='cog_contactphonenumber' />" + "<attribute name='cog_contactlastname' />" + "<attribute name='cog_contactfirstname' />" + "<attribute name='cog_contactemail' />" + "<attribute name='cog_tid' />" + "<attribute name='cog_dcn' />" + "<attribute name='cog_organization' />" + "<order attribute='cog_npilist' descending='false' />" + "<filter type='and'>" + "<condition attribute='cog_caseid' operator='eq' uitype='cog_case' value='" + regarding[0].id + "' />" + "</filter>" + "</entity>" + "</fetch>";

    var results = XrmServiceToolkit.Soap.Fetch(fetchXml)[0];

    if (typeof results.attributes.cog_contactfirstname !== "undefined") Xrm.Page.getAttribute("cog_contactfirstname").setValue(results.attributes.cog_contactfirstname.value);
    if (typeof results.attributes.cog_contactlastname !== "undefined") Xrm.Page.getAttribute("cog_contactlastname").setValue(results.attributes.cog_contactlastname.value);
    if (typeof results.attributes.cog_organization !== "undefined") Xrm.Page.getAttribute("cog_organization").setValue(results.attributes.cog_organization.value);
    if (typeof results.attributes.cog_npilist !== "undefined") Xrm.Page.getAttribute("cog_npi").setValue(results.attributes.cog_npilist.value);
    if (typeof results.attributes.cog_tid !== "undefined") Xrm.Page.getAttribute("cog_tid").setValue(results.attributes.cog_tid.value);
    if (typeof results.attributes.cog_dcn !== "undefined") Xrm.Page.getAttribute("cog_dcn").setValue(results.attributes.cog_dcn.value);
}
/// <reference path="../../../Intellisense Files/Data Entry Audit Form - Information.js" />
/// <reference path="../Common/FormMainScripts.js" />

document.EntityScript.AssignRecordName = function () {
    var caseObj = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseObj === null) return;

    var caseName = caseObj[0].name;

    Xrm.Page.getAttribute("cog_name").setValue("Data Entry Audit for Case " + caseName);
};

document.EntityScript.OnCreateSpecificScript = function () {
    RemoveOptionFromOs();
};

document.EntityScript.OnEditSpecificScript = function () {
    RemoveOptionFromOs();
};

function RemoveOptionFromOs() {
    Xrm.Page.getControl("cog_shouldbereturned").removeOption(181310000);
}

document.EntityScript.ForceDisabledFieldsToSubmit = function () {
    Xrm.Page.getAttribute("cog_providerevidenterrorstotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_nonproviderevidenterrorstotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_overallrating").setSubmitMode("always");
};
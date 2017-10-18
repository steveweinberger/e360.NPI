/// <reference path="../../../Intellisense Files/Call Audit Form - Information.js" />
/// <reference path="../Common/FormMainScripts.js" />

document.EntityScript.AssignRecordName = function () {
    var caseObj = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseObj === null) return;

    var caseName = caseObj[0].name;

    Xrm.Page.getAttribute("cog_name").setValue("Call Audit for Case " + caseName);
};

document.EntityScript.ForceDisabledFieldsToSubmit = function () {
    Xrm.Page.getAttribute("cog_callprocedurestotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_callmanagementtotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_overallrating").setSubmitMode("always");
};
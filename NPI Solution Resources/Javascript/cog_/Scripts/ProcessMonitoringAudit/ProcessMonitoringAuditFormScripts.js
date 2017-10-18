document.EntityScript.AssignRecordName = function () {
    var caseObj = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseObj === null) return;

    var caseName = caseObj[0].name;

    Xrm.Page.getAttribute("cog_name").setValue("Process Monitoring Audit for Case " + caseName);
};

document.EntityScript.ForceDisabledFieldsToSubmit = function () {
    Xrm.Page.getAttribute("cog_providerevidenterrorstotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_nonproviderevidenterrorstotal").setSubmitMode("always");
    Xrm.Page.getAttribute("cog_overallrating").setSubmitMode("always");
};
/// <reference path="../Common/FormMainScripts.js" />

document.EntityScript.OnCreateSpecificScript = function () {
    SetToday();
};

// -----

function SetToday() {
    var isCreateForm = Xrm.Page.ui.getFormType() == 1;
    var dateField = Xrm.Page.getAttribute("scheduledend");
    if (isCreateForm) { // Check that this is a new Record
        dateField.setValue(new Date()); // Set the Date field to Today
        dateField.setSubmitMode("always"); // Save Disabled Fields
    }
}
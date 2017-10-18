/// <reference path="../Common/FormMainScripts.js" />

document.EntityScript.OnCreateSpecificScript = function () {
    HideNPI();
};

document.EntityScript.OnSaveSpecificScript = function () {
    //PhoneIncorrect();
};

// ------

function HideNPI() {
    //var isCreateForm = Xrm.Page.ui.getFormType() === 1;
    //var npi = Xrm.Page.getAttribute("cog_npi");

    //if (isCreateForm) { // Check that this is a new Record
    //    Xrm.Page.ui.controls.get("cog_npi").setVisible(true);
    //}
}

//Alerts user if the phone number is incorrect when trying to save & will stop the save event until entered correctly
function PhoneIncorrect() {

    //if (ExecutionContextObj.getEventArgs().getSaveMode() === 1 || ExecutionContextObj.getEventArgs().getSaveMode() === 2 || ExecutionContextObj.getEventArgs().getSaveMode() === 59) {
    //    var phoneField = Xrm.Page.getAttribute("cog_contactphone");
    //    if (phoneField.getValue() != null) {
    //        var isnum = /(^[0-9]\d{9}$)|(^[0-9]\d{15}$)/.test(phoneField.getValue());

    //        if (isnum === false) {
    //            alert("Must enter a valid 10 or 16 digit phone number before saving. Please use the following format:  1234567890 or 1234567890123456.");
    //            ExecutionContextObj.getEventArgs().preventDefault();
    //        }
    //    }
    //}
}
/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../../../Intellisense Files/Application Request Form - Information.js" />
/// <reference path="../Common/CrmUser.js" />
/// <reference path="../Common/FormConstants.js" />
/// <reference path="../Common/FormMainScripts.js" />
/// <reference path="../Common/FormUtilities.js" />
/// <reference path="../Common/XrmServiceToolkit.js" />

// Overridden function
document.EntityScript.OnCreateSpecificScript = function () {
    SetToday();
};

document.EntityScript.OnEditSpecificScript = function () {

};

document.EntityScript.OnSaveSpecificScript = function () {
    StateIncorrect();
    ZipIncorrect();
    //PhoneIncorrect();
};

document.EntityScript.ForceDisabledFieldsToSubmit = function () {
    Xrm.Page.getAttribute("scheduledend").setSubmitMode("always");
};

// ------------------

function SetToday() {
    var isCreateForm = Xrm.Page.ui.getFormType() === 1;
    var dateField = Xrm.Page.getAttribute("scheduledend");
    if (isCreateForm) { // Check that this is a new Record
        dateField.setValue(new Date()); // Set the Date field to Today
    }
}

//Alerts user if the zip code is incorrect when trying to save & will stop the save event until entered correctly
function StateIncorrect() {
    var executionContextObj = document.EntityScript.ExecutionContextObj;
    if (executionContextObj.getEventArgs().getSaveMode() === 1 || executionContextObj.getEventArgs().getSaveMode() === 2 || executionContextObj.getEventArgs().getSaveMode() === 59) {
        var stateField = Xrm.Page.getAttribute("cog_state");
        if (stateField.getValue() !== null) {
            var isValidState = /(^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$)/.test(stateField.getValue());

            if (!isValidState) {
                alert("Must enter a valid state abbreviation before saving.");
                executionContextObj.getEventArgs().preventDefault();
            }
        }
    }
}

//Alerts user if the zip code is incorrect when trying to save & will stop the save event until entered correctly
function ZipIncorrect() {
    var executionContextObj = document.EntityScript.ExecutionContextObj;
    if (executionContextObj.getEventArgs().getSaveMode() === 1 || executionContextObj.getEventArgs().getSaveMode() === 2 || executionContextObj.getEventArgs().getSaveMode() === 59) {
        var zipField = Xrm.Page.getAttribute("cog_zipcode");
        if (zipField.getValue() !== null) {
            var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}\d{4}$)/.test(zipField.getValue());

            if (!isValidZip) {
                alert("Must enter a valid 5 or 9 digit zip code before saving.");
                executionContextObj.getEventArgs().preventDefault();
            }
        }
    }
}

//Alerts user if the phone number is incorrect when trying to save & will stop the save event until entered correctly
function PhoneIncorrect() {
    var executionContextObj = document.EntityScript.ExecutionContextObj;
    if (executionContextObj.getEventArgs().getSaveMode() === 1 || executionContextObj.getEventArgs().getSaveMode() === 2 || executionContextObj.getEventArgs().getSaveMode() === 59) {
        var phoneField = Xrm.Page.getAttribute("cog_phonenumber");
        if (phoneField.getValue() !== null) {
            var isnum = /^[0-9]\d{9}$/.test(phoneField.getValue());

            if (!isnum) {
                alert("Must enter a valid 10 digit phone number before saving. Please use the following format:  1234567890.");
                executionContextObj.getEventArgs().preventDefault();
            }
        }
    }
}

// -- OLD SCRIPTS NOT SURE OF USE

//Updates the header of the Assistance Pilot using Assistance Pilot Number
function updateHeader() {
    var subject = Xrm.Page.getAttribute("subject");
    var apNum = Xrm.Page.getAttribute("new_assistancepilotnumber").getValue();
    var specialist = Xrm.Page.data.entity.attributes.get("new_specialistfx").getValue()[0].name;
    var date = Xrm.Page.getAttribute("scheduledend").getValue();

    if (apNum != null && specialist != null) {
        subject.setValue(apNum + "-" + specialist + "-" + date);
        Xrm.Page.getAttribute("subject").setSubmitMode("getIsDirty");
    } else {
        subject.setValue(specialist + "-" + date);
        Xrm.Page.getAttribute("subject").setSubmitMode("getIsDirty");
    }
}
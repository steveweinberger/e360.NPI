/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../../../Intellisense Files/Case Form - Inbound Call.js" />
/// <reference path="../Common/FormMainScripts.js" />
document.EntityScript.OnCreateSpecificScript = function () {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();
    if (formName === "EMAIL") TriggerEmailWF();
    SetCorrectForm();
    SetRequiredFields();
};
document.EntityScript.OnEditSpecificScript = function () {
    SetCorrectForm();
    SetRequiredFields();
    //MakeDemographicsReadOnlyIfPopulated();
    //alert( "about to filter" );
    //FilterCaseReasons( );
};

document.EntityScript.ShowHideFieldsOnCreate = function () {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "COMPLAINT":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "ERROR RESOLUTION - WEB":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        HandleApplicationTypeOptionSetsForErrorResolution();
        break;
    case "ERROR RESOLUTION - EFI":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactEmail();
        HandleApplicationTypeOptionSetsForErrorResolution();
        break;
    case "ERROR RESOLUTION - PAPER":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        HandleApplicationTypeOptionSetsForErrorResolutionPaper();
        break;
    case "EMAIL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactEmail();
        break;
    case "OUTBOUND CALL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "FRAUD":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "ASSISTANCE PILOT":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "CORRESPONDENCE":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactCorrespondence();
        break;
    case "PAPER APPLICATION":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    }
};

document.EntityScript.ShowHideFieldsOnEdit = function () {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "COMPLAINT":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "ERROR RESOLUTION - WEB":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        HandleApplicationTypeOptionSetsForErrorResolution();
        break;
    case "ERROR RESOLUTION - EFI":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactEmail();
        HandleApplicationTypeOptionSetsForErrorResolution();
        break;
    case "ERROR RESOLUTION - PAPER":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        HandleApplicationTypeOptionSetsForErrorResolutionPaper();
        break;
    case "EMAIL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactEmail();
        break;
    case "OUTBOUND CALL":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "FRAUD":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "ASSISTANCE PILOT":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    case "CORRESPONDENCE":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContactCorrespondence();
        break;
    case "PAPER APPLICATION":
        HandleCaseStatus();
        ShowHideFieldsBasedOffContact();
        break;
    }
};
document.EntityScript.OnSaveSpecificScript = function () {
    Xrm.Page.getAttribute("cog_casestatus").setSubmitMode("always");
    UpdateCaseType();

    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "COMPLAINT":
        SetDateOfCaseCompletion();
        //RemoveRedundantNPINumbers( );
        break;
    case "ERROR RESOLUTION - WEB":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "ERROR RESOLUTION - EFI":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "ERROR RESOLUTION - PAPER":
        UpdateCaseStatusFromCorrStatus();
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "EMAIL":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "OUTBOUND CALL":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "FRAUD":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "ASSISTANCE PILOT":
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "CORRESPONDENCE":
        UpdateCaseStatusFromCorrStatus();
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    case "PAPER APPLICATION":
        UpdateCaseStatusFromCorrStatus(); // Share the field with Corr
        SetDateOfCaseCompletion();
        RemoveRedundantNPINumbers();
        break;
    }
};

// --

function RemoveRedundantNPINumbers() {
    var npi = Xrm.Page.getAttribute("cog_npi").getValue();
    if (npi === null) return;
    npi = npi.replace(/\s+/g, "");
    var npiArr = npi.split(";");

    var npiList = Xrm.Page.getAttribute("cog_npilist").getValue();
    if (npiList === null) return;
    var npiListArr = npiList.split(";");

    Xrm.Page.getAttribute("cog_npi").setValue(npi);

    var i;
    var ii;
    for (i = 0; i < npiArr.length; i++) {
        for (ii = 0; ii < npiListArr.length; ii++) {
            if (npiArr[i] === npiListArr[ii]) {
                npiArr.splice(i, 1);
                i--;
            }
        }
    }
    var z;
    var newNpiList = "";
    for (z = 0; z < npiArr.length; z++)
    newNpiList += npiArr[z] + ";";

    newNpiList = newNpiList.substring(0, newNpiList.length - 1);

    Xrm.Page.getAttribute("cog_npi").setValue(newNpiList);
}

function SetDateOfCaseCompletion() {
    var status = Xrm.Page.getAttribute("cog_casestatus").getValue();

    if (status === 181310002) Xrm.Page.getAttribute("cog_datecasecompleted").setValue(Date.now());
    else Xrm.Page.getAttribute("cog_datecasecompleted").setValue(null);
}

function ShowHideFieldsBasedOffContact() {
    var contactid = Xrm.Page.getAttribute("cog_contactid").getValue();
    if (contactid !== null) {
        Xrm.Page.getControl("cog_contactfirstname").setVisible(false);
        Xrm.Page.getControl("cog_contactlastname").setVisible(false);
        Xrm.Page.getControl("cog_contactphonenumber").setVisible(false);
        Xrm.Page.getControl("cog_contactid").setVisible(true);
    }
}

function ShowHideFieldsBasedOffContactEmail() {
    var contactid = Xrm.Page.getAttribute("cog_contactid").getValue();
    if (contactid !== null) {
        Xrm.Page.getControl("cog_contactfirstname").setVisible(false);
        Xrm.Page.getControl("cog_contactlastname").setVisible(false);
        Xrm.Page.getControl("cog_contactphonenumber").setVisible(false);
        Xrm.Page.getControl("cog_contactemail").setVisible(false);
        Xrm.Page.getControl("cog_contactid").setVisible(true);
    }
}

function ShowHideFieldsBasedOffContactCorrespondence() {
    var contactid = Xrm.Page.getAttribute("cog_contactid").getValue();
    if (contactid !== null) {
        Xrm.Page.getControl("cog_contactfirstname").setVisible(false);
        Xrm.Page.getControl("cog_contactlastname").setVisible(false);
        Xrm.Page.getControl("cog_contactid").setVisible(true);
    }
}

function HandleApplicationTypeOptionSetsForErrorResolution() {
    var appType = Xrm.Page.getControl("cog_applicationtype");
    appType.removeOption(181310000);
    appType.removeOption(181310001);
    appType.removeOption(181310002);
}

function HandleApplicationTypeOptionSetsForErrorResolutionPaper() {
    var appType = Xrm.Page.getControl("cog_applicationtype");
    appType.removeOption(181310001);
}

function UpdateCaseStatusFromCorrStatus() {
    var val = Xrm.Page.getAttribute("cog_correspondencestatus").getValue();

    if (val === 181310002) Xrm.Page.getAttribute("cog_casestatus").setValue(181310002);
    else Xrm.Page.getAttribute("cog_casestatus").setValue(181310000);
}

function HideNpiIfItContainsData() {
    if (Xrm.Page.getAttribute("cog_npi").getValue() !== null) Xrm.Page.getControl("cog_npi").setVisible(false);
}

function MakeDemographicsReadOnlyIfPopulated() {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "COMPLAINT":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "ERROR RESOLUTION - WEB":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "ERROR RESOLUTION - EFI":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "ERROR RESOLUTION - PAPER":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "EMAIL":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactemail").getValue() !== null) Xrm.Page.getControl("cog_contactemail").setDisabled(true);
        break;
    case "OUTBOUND CALL":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "FRAUD":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "ASSISTANCE PILOT":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    case "CORRESPONDENCE":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        break;
    case "PAPER APPLICATION":
        if (Xrm.Page.getAttribute("cog_contactfirstname").getValue() !== null) Xrm.Page.getControl("cog_contactfirstname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactlastname").getValue() !== null) Xrm.Page.getControl("cog_contactlastname").setDisabled(true);
        if (Xrm.Page.getAttribute("cog_contactphonenumber").getValue() !== null) Xrm.Page.getControl("cog_contactphonenumber").setDisabled(true);
        break;
    }
}

function SetCorrectForm() {
    var caseCreatedFromFax = Xrm.Page.getAttribute("cog_casecreatedfromfax").getValue();
    var currentForm = Xrm.Page.ui.formSelector.getCurrentItem();
    var formName = Xrm.Page.getAttribute("cog_casetype").getText();

    if (caseCreatedFromFax && formName === null) return; // this is a fresh case from a fax and needs to be set still

    if (currentForm.getLabel() !== formName) {
        if (currentForm.getLabel() !== formName) { //make sure it's not already this form
            var availableForms = Xrm.Page.ui.formSelector.items.get();
            for (var i in availableForms) {
                var form = availableForms[i];
                if (form.getLabel() === formName) form.navigate();
            }
        }
    }
}

function UpdateCaseType() {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310000);
        break;
    case "COMPLAINT":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310001);
        break;
    case "ERROR RESOLUTION - WEB":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310002);
        break;
    case "ERROR RESOLUTION - EFI":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310003);
        break;
    case "ERROR RESOLUTION - PAPER":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310004);
        break;
    case "EMAIL":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310005);
        break;
    case "OUTBOUND CALL":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310006);
        break;
    case "FRAUD":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310007);
        break;
    case "ASSISTANCE PILOT":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310008);
        break;
    case "CORRESPONDENCE":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310009);
        break;
    case "PAPER APPLICATION":
        Xrm.Page.getAttribute("cog_casetype").setValue(181310010);
        break;
    }

    //switch (formName) {
    //    case "INBOUND CALL":
    //        break;
    //    case "COMPLAINT":
    //        break;
    //    case "ERROR RESOLUTION - WEB":
    //        break;
    //    case "ERROR RESOLUTION - EFI":
    //        break;
    //    case "ERROR RESOLUTION - PAPER":
    //        break;
    //    case "EMAIL":
    //        break;
    //    case "OUTBOUND CALL":
    //        break;
    //    case "FRAUD":
    //        break;
    //    case "ASSISTANCE PILOT":
    //        break;
    //}

}

function SetRequiredFields() {
    var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel().toUpperCase();

    switch (formName) {
    case "INBOUND CALL":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute( "cog_npi" ).setRequiredLevel( "required" );
        break;
    case "COMPLAINT":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        break;
    case "ERROR RESOLUTION - WEB":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute( "cog_npi" ).setRequiredLevel( "required" );
        break;
    case "ERROR RESOLUTION - EFI":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute( "cog_npi" ).setRequiredLevel( "required" );
        break;
    case "ERROR RESOLUTION - PAPER":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute( "cog_npi" ).setRequiredLevel( "required" );
        break;
    case "EMAIL":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactemail").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactlastname").setRequiredLevel("required");
        break;
    case "OUTBOUND CALL":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        break;
    case "FRAUD":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        //Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        break;
    case "ASSISTANCE PILOT":
        //Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        //Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        break;
    case "CORRESPONDENCE":
        break;
    case "PAPER APPLICATION":
        Xrm.Page.getAttribute("cog_contactfirstname").setRequiredLevel("required");
        //Xrm.Page.getAttribute("cog_contactphonenumber").setRequiredLevel("required");
        break;
    }

}

function TriggerEmailWF() {
    Xrm.Page.getAttribute("cog_wfassociateemail").setValue(true);
}

function FilterCaseReasons() {
    var ctrl = document.getElementById("CaseReasons");

    /* IDENTIFIER FILTER */
    var identifier_filter = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='cog_casereason'>" + "<filter type='and'>" + "<condition attribute='cog_casetype' operator='eq' value='181310006' />" + "</filter>" + "</entity>" + "</fetch>";

    //ctrl.addCustomFilter(identifier_filter, "contact");
    ctrl.control.SetParameter("fetchXml", identifier_filter);
    ctrl.control.refresh();

    //var obj = document.getElementById( "inlineLookupControlForSubgrid_CaseReasons" );
}

function HandleCaseStatus() {
    var control = Xrm.Page.ui.controls.get("header_cog_casestatus");
    control.removeOption(181310003);
}
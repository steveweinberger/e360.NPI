/// <reference path="../../../Intellisense Files/Xrm.js" />

document.EntityScript.OnCreateSpecificScript = function () {
    SetUpForm();
    SetUserAsFrom();
};

document.EntityScript.OnEditSpecificScript = function () {
    SetUpForm();
};

function SetUpForm() {
    var type = Xrm.Page.getAttribute("cog_lettertype").getText();

    switch (type) {
    case "SSN Disallowance":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        break;
    case "Non SSN Disallowance":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        Xrm.Page.getControl("cog_npi").setVisible(true);
        Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("required");
        Xrm.Page.getControl("cog_applicationtype").setVisible(true);
        Xrm.Page.getAttribute("cog_lastcontactattemptdate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_lastcontactattemptdate").setVisible(true);
        break;
    case "Development":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.getAttribute("cog_lastcontactattemptdate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_lastcontactattemptdate").setVisible(true);
        Xrm.Page.getAttribute("cog_npiapplicationsubmitmethod").setRequiredLevel("required");
        Xrm.Page.getControl("cog_npiapplicationsubmitmethod").setVisible(true);
        Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("required");
        Xrm.Page.getControl("cog_applicationtype").setVisible(true);
        Xrm.Page.getAttribute("cog_duedate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_duedate").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Complaint":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Misc Corr":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Deceased Provider":
        HideFields();
        Xrm.Page.getAttribute("cog_deceasedprovidername").setRequiredLevel("required");
        Xrm.Page.getControl("cog_deceasedprovidername").setVisible(true);
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        break;
    case "EFI Return Certification":
        HideFields();
        Xrm.Page.getAttribute("cog_efiorganizationname").setRequiredLevel("required");
        Xrm.Page.getControl("cog_efiorganizationname").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "EFIO Welcome Letter":
        HideFields();
        Xrm.Page.getAttribute("cog_efiorganizationname").setRequiredLevel("required");
        Xrm.Page.getControl("cog_efiorganizationname").setVisible(true);
        break;
    case "Misc Reject":
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("required");
        Xrm.Page.getControl("cog_applicationtype").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Fraud":
        HideFields();
        Xrm.Page.getAttribute("cog_duedate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_duedate").setVisible(true);
        break;
    case "Return":
        HideFields();
        //Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        Xrm.Page.getControl("cog_npi").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    default:
        HideFields();
        break;
    }
}

document.EntityScript.OnSaveSpecificScript = function () {
    var to = Xrm.Page.getAttribute("cog_contactid").getValue()[0].name;
    var from = Xrm.Page.getAttribute("cog_userid").getValue()[0].name;

    Xrm.Page.getAttribute("cog_totext").setValue(to);
    Xrm.Page.getAttribute("cog_fromtext").setValue(from);
};

function SetUserAsFrom() {
    var lookup = new Array();
    lookup[0] = new Object();
    lookup[0].id = Xrm.Page.context.getUserId();
    lookup[0].name = Xrm.Page.context.getUserName();
    lookup[0].entityType = "systemuser";
    Xrm.Page.getAttribute("cog_userid").setValue(lookup);
}

function ClearFields() {
    Xrm.Page.getAttribute("cog_trackingid").setValue(null);
    Xrm.Page.getAttribute("cog_applicationtype").setValue(null);
    Xrm.Page.getAttribute("cog_lastcontactattemptdate").setValue(null);
    Xrm.Page.getAttribute("cog_npiapplicationsubmitmethod").setValue(null);
    Xrm.Page.getAttribute("cog_duedate").setValue(null);
    Xrm.Page.getAttribute("cog_efiorganizationname").setValue(null);
    Xrm.Page.getAttribute("description").setValue(null);
    Xrm.Page.getAttribute("cog_deceasedprovidername").setValue(null);

    Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_lastcontactattemptdate").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_npiapplicationsubmitmethod").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_duedate").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_efiorganizationname").setRequiredLevel("none");
    Xrm.Page.getAttribute("description").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_deceasedprovidername").setRequiredLevel("none");
}

function HideFields() {
    Xrm.Page.getControl("cog_efiorganizationname").setVisible(false);
    Xrm.Page.getControl("cog_duedate").setVisible(false);
    Xrm.Page.getControl("cog_npiapplicationsubmitmethod").setVisible(false);
    Xrm.Page.getControl("cog_lastcontactattemptdate").setVisible(false);
    Xrm.Page.getControl("cog_applicationtype").setVisible(false);
    Xrm.Page.getControl("cog_trackingid").setVisible(false);
    Xrm.Page.getControl("cog_npi").setVisible(false);
    Xrm.Page.getControl("cog_deceasedprovidername").setVisible(false);
    Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(false);
    Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(false);
}
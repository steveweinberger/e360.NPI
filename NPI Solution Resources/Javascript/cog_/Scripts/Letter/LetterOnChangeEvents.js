/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="~/Javascript/cog_/Scripts/Letter/LetterFormScripts.js" />
cog_lettertype_OnChangeEvent = function () {
    var type = Xrm.Page.getAttribute("cog_lettertype").getText();

    switch (type) {
    case "SSN Disallowance":
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        break;
    case "Non SSN Disallowance":
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        //Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        Xrm.Page.getControl("cog_npi").setVisible(true);
        Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("required");
        Xrm.Page.getControl("cog_applicationtype").setVisible(true);
        Xrm.Page.getAttribute("cog_lastcontactattemptdate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_lastcontactattemptdate").setVisible(true);
        break;
    case "Development":
        ClearFields();
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
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Misc Corr":
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Deceased Provider":
        ClearFields();
        HideFields();
        Xrm.Page.getAttribute("cog_deceasedprovidername").setRequiredLevel("required");
        Xrm.Page.getControl("cog_deceasedprovidername").setVisible(true);
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        break;
    case "EFI Return Certification":
        ClearFields();
        Xrm.Page.getAttribute("cog_efiorganizationname").setRequiredLevel("required");
        Xrm.Page.getControl("cog_efiorganizationname").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "EFIO Welcome Letter":
        ClearFields();
        HideFields();
        Xrm.Page.getAttribute("cog_efiorganizationname").setRequiredLevel("required");
        Xrm.Page.getControl("cog_efiorganizationname").setVisible(true);
        break;
    case "Misc Reject":
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_trackingid").setRequiredLevel("required");
        Xrm.Page.getControl("cog_trackingid").setVisible(true);
        Xrm.Page.getAttribute("cog_applicationtype").setRequiredLevel("required");
        Xrm.Page.getControl("cog_applicationtype").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    case "Fraud":
        ClearFields();
        HideFields();
        Xrm.Page.getAttribute("cog_duedate").setRequiredLevel("required");
        Xrm.Page.getControl("cog_duedate").setVisible(true);
        break;
    case "Return":
        ClearFields();
        HideFields();
        //Xrm.Page.getAttribute("cog_npi").setRequiredLevel("required");
        Xrm.Page.getControl("cog_npi").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("SUMMARY_TAB_section_5").setVisible(true);
        Xrm.Page.ui.tabs.get("SUMMARY_TAB").sections.get("description").setVisible(true);
        break;
    default:
        ClearFields();
        HideFields();
        break;
    }
};
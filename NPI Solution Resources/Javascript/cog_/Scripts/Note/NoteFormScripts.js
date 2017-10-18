/// <reference path="../Common/FormMainScripts.js" />
/// <reference path="../../../Intellisense Files/Xrm.js" />

document.EntityScript.OnCreateSpecificScript = function () {
    HandleRequiredFields();
    ShowCorrectWebResource();
};

document.EntityScript.OnEditSpecificScript = function () {
    HandleRequiredFields();
    ShowCorrectWebResource();
};

document.EntityScript.AssignRecordName = function () {
    var cogcase = Xrm.Page.getAttribute("cog_caseid").getValue();
    var applicationRequest = Xrm.Page.getAttribute("cog_applicationrequestid").getValue();
    //var assistancePilot = Xrm.Page.getAttribute("cog_assistancepilotid").getValue();
    var efi = Xrm.Page.getAttribute("cog_efiid").getValue();

    var name = "Note for ";

    if (cogcase != null) name += cogcase[0].name;
    else if (applicationRequest != null) name += applicationRequest[0].name;
    //else if (assistancePilot != null) name += assistancePilot[0].name;
    else if (efi != null) name += efi[0].name;

    Xrm.Page.getAttribute("cog_name").setValue(name);
}

// -------

function HandleRequiredFields() {
    Xrm.Page.getAttribute("cog_caseid").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_applicationrequestid").setRequiredLevel("none");
    //Xrm.Page.getAttribute("cog_assistancepilotid").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_efiid").setRequiredLevel("none");
    Xrm.Page.getAttribute("cog_solicitedcorrespondenceid").setRequiredLevel("none");
}

function ShowCorrectWebResource() {
    var cogcase = Xrm.Page.getAttribute("cog_caseid").getValue();
    var solCorId = Xrm.Page.getAttribute("cog_solicitedcorrespondenceid").getValue();
    var applicationRequest = Xrm.Page.getAttribute("cog_applicationrequestid").getValue();
    var efi = Xrm.Page.getAttribute("cog_efiid").getValue();

    if (cogcase !== null) {
        var type = Xrm.Page.getAttribute("cog_casetype").getText();
        switch (type) {
        case "Paper Application":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("PaperApplication").setVisible(true);
            break;
        case "Inbound Call":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("InboundCall").setVisible(true);
            break;
        case "Fraud":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("Fraud").setVisible(true);
            break;
        case "Outbound Call":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("OutboundCall").setVisible(true);
            break;
        case "Assistance Pilot":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("AssistancePilot").setVisible(true);
            break;
        case "Correspondence":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("Correspondence").setVisible(true);
            break;
        case "Email":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("Email").setVisible(true);
            break;
        case "Error Resolution - Web":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("ERWeb").setVisible(true);
            break;
        case "Error Resolution - EFI":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("EREFI").setVisible(true);
            break;
        case "Error Resolution - Paper":
            Xrm.Page.ui.tabs.get("tab_3").sections.get("ERPaper").setVisible(true);
            break;
        }
    }
    else if (solCorId !== null) {
        Xrm.Page.ui.tabs.get("tab_3").sections.get("SolicitedCorr").setVisible(true);
    }
}
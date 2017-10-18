/// <reference path="../../../Intellisense Files/Call Audit Form - Information.js" />

cog_verifyprivacy_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_obtainnamephone_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_followcallrequirements_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_remaininscope_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_followcmsdirectives_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_crmcasecorrect_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_completeinternalaction_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_completecustomerrequest_OnChangeEvent = function () {
    CalculateProcedures();
};

cog_professionalism_OnChangeEvent = function () {
    CalculateManagement();
};

cog_tone_OnChangeEvent = function () {
    CalculateManagement();
};

cog_listeningskills_OnChangeEvent = function () {
    CalculateManagement();
};

cog_communicationskills_OnChangeEvent = function () {
    CalculateManagement();
};

cog_ownership_OnChangeEvent = function () {
    CalculateManagement();
};

function CalculateProcedures() {
    var score = 0;
    var fields = ["cog_verifyprivacy", "cog_obtainnamephone", "cog_followcallrequirements", "cog_remaininscope", "cog_followcmsdirectives", "cog_crmcasecorrect", "cog_completeinternalaction", "cog_completecustomerrequest"];
    for (var i = 0; i < fields.length; i++) {
        var val = Xrm.Page.getAttribute(fields[i]).getValue();
        if (val != null) score += (val - 181310000);
    }
    Xrm.Page.getAttribute("cog_callprocedurestotal").setValue(score);
    CalculateCallOverallRating();
}

function CalculateManagement() {
    var score = 0;
    var fields = ["cog_professionalism", "cog_tone", "cog_listeningskills", "cog_communicationskills", "cog_ownership"];
    for (var i = 0; i < fields.length; i++) {
        var val = Xrm.Page.getAttribute(fields[i]).getValue();
        if (val != null) score += (val - 181310000);
    }
    Xrm.Page.getAttribute("cog_callmanagementtotal").setValue(score);
    CalculateCallOverallRating();
}

function CalculateCallOverallRating() {
    var rating;
    var mgmt = Xrm.Page.getAttribute("cog_callmanagementtotal").getValue();
    var proc = Xrm.Page.getAttribute("cog_callprocedurestotal").getValue();
    var privacyCheck = Xrm.Page.getAttribute("cog_verifyprivacy").getValue();

    if (mgmt === null) mgmt = 0;
    if (proc === null) proc = 0;

    rating = ((mgmt + proc) / 32) * 100;

    Xrm.Page.getAttribute("cog_total").setValue(mgmt + proc);

    if (privacyCheck !== 181310001) {
        if (rating <= 100 && rating >= 93) Xrm.Page.getAttribute("cog_overallrating").setValue(181310003);
        else if (rating <= 92.99 && rating >= 84) Xrm.Page.getAttribute("cog_overallrating").setValue(181310002);
        else if (rating <= 8.399 && rating >= 75) Xrm.Page.getAttribute("cog_overallrating").setValue(181310001);
        else if (rating <= 74.99) Xrm.Page.getAttribute("cog_overallrating").setValue(181310000);
    } else Xrm.Page.getAttribute("cog_overallrating").setValue(181310000);
}
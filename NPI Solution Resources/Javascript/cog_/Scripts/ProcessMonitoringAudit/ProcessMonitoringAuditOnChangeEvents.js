/// <reference path="../../../Intellisense Files/Process Monitoring Audit Form - Information.js" />

cog_correctprocessaction_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_maintainaccuracy_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_applicablenotes_OnChangeEvent = function () {
    CalculateNonProviderEvident();
};

cog_procedurerequirements_OnChangeEvent = function () {
    CalculateNonProviderEvident();
};

function CalculateProviderEvident() {
    var score = 0;
    var fields = ["cog_correctprocessaction", "cog_maintainaccuracy"];
    for (var i = 0; i < fields.length; i++) {
        var val = Xrm.Page.getAttribute(fields[i]).getValue();
        if (val != null) score += (val - 181310000);
    }
    Xrm.Page.getAttribute("cog_providerevidenterrorstotal").setValue(score);
    CalculateCallOverallRating();
}

function CalculateNonProviderEvident() {
    var score = 0;
    var fields = ["cog_applicablenotes", "cog_procedurerequirements"];
    for (var i = 0; i < fields.length; i++) {
        var val = Xrm.Page.getAttribute(fields[i]).getValue();
        if (val != null) score += (val - 181310000);
    }
    Xrm.Page.getAttribute("cog_nonproviderevidenterrorstotal").setValue(score);
    CalculateCallOverallRating();
}

function CalculateCallOverallRating() {
    var rating;
    var mgmt = Xrm.Page.getAttribute("cog_providerevidenterrorstotal").getValue();
    var proc = Xrm.Page.getAttribute("cog_nonproviderevidenterrorstotal").getValue();

    if (mgmt === null) mgmt = 0;
    if (proc === null) proc = 0;

    rating = ((mgmt + proc) / 8) * 100;

    Xrm.Page.getAttribute("cog_total").setValue(mgmt + proc);

    if (rating <= 100 && rating >= 93) Xrm.Page.getAttribute("cog_overallrating").setValue(181310003);
    else if (rating <= 92.99 && rating >= 84) Xrm.Page.getAttribute("cog_overallrating").setValue(181310002);
    else if (rating <= 8.399 && rating >= 75) Xrm.Page.getAttribute("cog_overallrating").setValue(181310001);
    else if (rating <= 74.99) Xrm.Page.getAttribute("cog_overallrating").setValue(181310000);
}
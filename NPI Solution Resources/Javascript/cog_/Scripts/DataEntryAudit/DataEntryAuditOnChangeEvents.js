/// <reference path="../../../Intellisense Files/Data Entry Audit Form - Information.js" />

cog_correctprofileaction_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_maintainprofileaccuracy_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_correctmailingpractice_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_accuracymailingpractice_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_correctotheridentifiers_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_accuracyotheridentifiers_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_correcttaxonomy_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_accuracytaxonomy_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_correctcontactauthorized_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_accuracycontactauthorized_OnChangeEvent = function () {
    CalculateProviderEvident();
};

cog_shouldbereturned_OnChangeEvent = function () {
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
    var fields = ["cog_correctprofileaction", "cog_maintainprofileaccuracy", "cog_correctmailingpractice", "cog_accuracymailingpractice", "cog_correctotheridentifiers", "cog_accuracyotheridentifiers", "cog_correcttaxonomy", "cog_accuracytaxonomy", "cog_correctcontactauthorized", "cog_accuracycontactauthorized"];
    for (var i = 0; i < fields.length; i++) {
        var val = Xrm.Page.getAttribute(fields[i]).getValue();
        if (val != null) score += (val - 181310000);
    }
    var shouldBeReturned = Xrm.Page.getAttribute("cog_shouldbereturned").getValue();
    if (shouldBeReturned === 181310001) score += 2;

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
    var shouldBeReturned = Xrm.Page.getAttribute("cog_shouldbereturned").getValue();

    if (mgmt === null) mgmt = 0;
    if (proc === null) proc = 0;

    rating = ((mgmt + proc) / 26) * 100;

    Xrm.Page.getAttribute("cog_total").setValue(mgmt + proc);

    if (shouldBeReturned !== 181310002) {
        if (rating <= 100 && rating >= 93) Xrm.Page.getAttribute("cog_overallrating").setValue(181310003);
        else if (rating <= 92.99 && rating >= 84) Xrm.Page.getAttribute("cog_overallrating").setValue(181310002);
        else if (rating <= 8.399 && rating >= 75) Xrm.Page.getAttribute("cog_overallrating").setValue(181310001);
        else if (rating <= 74.99) Xrm.Page.getAttribute("cog_overallrating").setValue(181310000);
    } else Xrm.Page.getAttribute("cog_overallrating").setValue(181310000);
}
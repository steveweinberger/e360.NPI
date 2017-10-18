/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../../../Intellisense Files/Application Request Form - Information.js" />

//Only accepts valid state abbreviations
document.EntityScript.cog_state_OnChangeEvent = function () {
    //var stateField = Xrm.Page.getAttribute("cog_state").getValue();
    //var isValidState = /(^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$)/.test(stateField);

    //if (isValidState === false) alert("Please enter a valid state abbreviation.");
};

//Checks to determine if 5 or 9 digit zip code is entered
document.EntityScript.cog_zipcode_OnChangeEvent = function () {
    //var zipField = Xrm.Page.getAttribute("cog_zipcode");
    //if (zipField != null) {
    //    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{5}\d{4}$)/.test(zipField.getValue());

    //    if (isValidZip === false) alert("Please enter a valid 5 or 9 digit zip code.");
    //}
};

// Allows to enter only Numbers & upto 10 char's
cog_phonenumber_OnChangeEvent = function () {
    FormScripts.FormUtilities.FormatPhone(Xrm.Page.getAttribute("cog_phonenumber"), 10, 12);
};
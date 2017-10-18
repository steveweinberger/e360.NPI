/// <reference path="../Common/FormMainScripts.js" />
/// <reference path="../Common/FormUtilities.js" />

//Input EOR First and Last Name if Contact First and Last Name if 'Contact is for EOR' is checked
cog_contactiseor_OnChangeEvent = function () {

    var flag = Xrm.Page.getAttribute("cog_contactiseor").getValue();
    var firstName = Xrm.Page.getAttribute("cog_contactfirstname").getValue();
    var lastName = Xrm.Page.getAttribute("cog_contactlastname").getValue();
    if (flag) {
        if (firstName != null) Xrm.Page.getAttribute("cog_eorfirstname").setValue(firstName);
        else Xrm.Page.getAttribute("cog_eorfirstname").setValue(null);
        if (lastName != null) Xrm.Page.getAttribute("cog_eorlastname").setValue(lastName);
        else Xrm.Page.getAttribute("cog_eorlastname").setValue(null);
    } else {
        Xrm.Page.getAttribute("cog_eorfirstname").setValue(null);
        Xrm.Page.getAttribute("cog_eorlastname").setValue(null);
    }
};

// Allows to enter only Numbers & upto 10 char's
cog_contactphone_OnChangeEvent = function () {
    //var phone = Xrm.Page.getAttribute("cog_contactphone").getValue();
    //var isnum = /(^[0-9]\d{9}$)|(^[0-9]\d{15}$)/.test(phone);

    //if (isnum == false) {
    //    alert("Please enter a valid 10 or 16 digit phone number in this format:  1234567890 or 1234567890123456.");
    //    var field = Xrm.Page.ui.controls.get("new_contactphone");
    //}
    FormScripts.FormUtilities.FormatPhone(Xrm.Page.getAttribute("cog_contactphone"), 10, 12);

};
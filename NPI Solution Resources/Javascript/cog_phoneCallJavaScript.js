// JavaScript source code
function populateCallto() {

    var regarding = Xrm.Page.data.entity.attributes.get("regardingobjectid").getValue();
    var callToValue = Xrm.Page.data.entity.attributes.get("to").getValue();
    var contactName = Xrm.Page.data.entity.attributes.get("cog_contactphonecallid");

    if (regarding != null && callToValue == null) {
        var callTo = Xrm.Page.getAttribute("to");

        callTo.setValue(regarding);
        contactName.setValue(regarding);
        Xrm.Page.getAttribute("to").setSubmitMode("getIsDirty");
    }
}

function populateContactPhone() {

    var callToValue = Xrm.Page.data.entity.attributes.get("to").getValue()[0].name;

    if (callToValue != null) {
        Xrm.Page.data.entity.attributes.get("cog_contactphonecallid").setValue(callToValue);
        Xrm.Page.getAttribute("cog_contactphonecallid").setSubmitMode("getIsDirty");
    }
}

function setToday(date) {
    var isCreateForm = Xrm.Page.ui.getFormType() == 1;
    var dateField = Xrm.Page.getAttribute("scheduledend");
    if (isCreateForm) { // Check that this is a new Record
        dateField.setValue(new Date());
        dateField.setSubmitMode("always");
    }
}

function hideInquiryInfo() {
    var queue = Xrm.Page.data.entity.attributes.get("cog_queue").getText();

    if (queue == "Outbound Call") {
        Xrm.Page.ui.tabs.get("phonecall").sections.get("inqinfo").setVisible(true);
    } else {
        Xrm.Page.ui.tabs.get("phonecall").sections.get("inqinfo").setVisible(false);
    }
}

//Factors in the weekend days in order for follow-up calls and letters to not fall on a weekend
function addDays() {
    var today = new Date();
    var dayNum = today.getDay();
    var dateField = Xrm.Page.getAttribute("cog_twobusinessdayslater");

    if (dayNum == 4 || dayNum == 5) {
        today.setDate(today.getDate() + 4);
        dateField.setValue(today);
        dateField.setSubmitMode("always");
    } else {
        today.setDate(today.getDate() + 2);
        dateField.setValue(today);
        dateField.setSubmitMode("always");
    }
}

//Sets Value of Follow-Up Number field -- need to get working
function followUp() {

    var fuNum = Xrm.Page.getAttribute("cog_followupnumber");
    var firstFU = Xrm.Page.getAttribute("cog_firstfollowup");

    if (firstFU.getValue() == null) {
        fuNum2 = Xrm.Page.getAttribute("cog_followupnumber").getValue();
        fuNum.setValue(fuNum2 + 1);
        fuNum.setSubmitMode("always");
        firstFU.setValue("1");
        firstFU.setSubmitMode("always");
    }
}
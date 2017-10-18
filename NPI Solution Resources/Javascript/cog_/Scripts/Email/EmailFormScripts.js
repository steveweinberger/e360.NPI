/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../../../Intellisense Files/COG Case Form - Email.js" />
/// <reference path="../Common/XrmServiceToolkit.js" />
document.EntityScript.OnCreateSpecificScript = function () {
    SetFromField();
    SetToField();
    Subject();
    //SetRegardingOrCaseId( );
    Xrm.Page.getControl("cog_caseid").setDisabled(false);
    Xrm.Page.getAttribute("cog_caseid").setRequiredLevel("none");
    //alert("on create");
    //PopulateCaseId();
};

document.EntityScript.OnEditSpecificScript = function () {
    //alert("on edit");
    SetFromField();
    SetToField();
    Subject();
    //SetRegardingOrCaseId( );

    Xrm.Page.getControl("cog_caseid").setDisabled(false);
    Xrm.Page.getAttribute("cog_caseid").setRequiredLevel("none");
    //PopulateCaseId();
};

document.EntityScript.OnInactiveSpecificScript = function () {
    //alert("on Inactive");
    Xrm.Page.getControl("cog_caseid").setDisabled(false);
    //SetFromField( );
};

document.EntityScript.OnSaveSpecificScript = function () {
    var saveMode = document.EntityScript.ExecutionContextObj.getEventArgs().getSaveMode();

    if (saveMode === 70)
        document.EntityScript.ExecutionContextObj.getEventArgs().preventDefault();

    if (Xrm.Page.getAttribute("statecode").getValue() === 1) return;

    var parentObject = Xrm.Page.getAttribute("parentactivityid").getValue();
    if (parentObject !== null && saveMode !== 70) {
        var receiptDate = RetrieveDateEmailWasReceived(parentObject);
        var daysBetween = DaysBetween(receiptDate, new Date());
        UpdateCase(daysBetween);
    } else if (parentObject === null && saveMode !== 70) SetCaseCreatedFromEmailFlag();

    if (Xrm.Page.getAttribute("regardingobjectid").getValue() !== null) return;

    var contact = Xrm.Page.getAttribute("cog_caseid").getValue();

    Xrm.Page.getAttribute("regardingobjectid").setValue(contact);
};

function SetCaseCreatedFromEmailFlag() {
    var caseId = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseId === null) return;
    var cogCase = new XrmServiceToolkit.Soap.BusinessEntity("cog_case", caseId[0].id);
    cogCase.attributes["cog_casecreatedfromemail"] = {
        value: true,
        type: "boolean"
    };
    XrmServiceToolkit.Soap.Update(cogCase);
}

function RetrieveDateEmailWasReceived(parentObject) {
    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='email'>" + "<attribute name='activityid' />" + "<attribute name='createdon' />" + "<order attribute='createdon' descending='false' />" + "<filter type='and'>" + "<condition attribute='activityid' operator='eq' uitype='email' value='" + parentObject[0].id + "' />" + "</filter>" + "</entity>" + "</fetch>";

    var records = XrmServiceToolkit.Soap.Fetch(fetchXml);

    return new Date(records[0].attributes.createdon.value);

}

function UpdateCase(daysBetween) {
    var caseId = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseId === null) return;
    var cogCase = new XrmServiceToolkit.Soap.BusinessEntity("cog_case", caseId[0].id);

    if (daysBetween <= 5) {
        cogCase.attributes["cog_emailrepliedwithinlimitations"] = {
            value: true,
            type: "boolean"
        };
    } else {
        cogCase.attributes["cog_emailrepliedwithinlimitations"] = {
            value: false,
            type: "boolean"
        };
    }

    cogCase.attributes["cog_emailresponsedays"] = {
        value: daysBetween,
        type: "int"
    };

    XrmServiceToolkit.Soap.Update(cogCase);
}

function DaysBetween(firstDate, secondDate) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

function SetFromField() {

    if (Xrm.Page.getAttribute("statecode").getValue() === 1) return;

    if (Xrm.Page.getAttribute("statuscode").getValue() === 1) {
        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='systemuser'>" + "<attribute name='fullname' />" + "<attribute name='systemuserid' />" + "<order attribute='fullname' descending='false' />" + "<filter type='and'>" + "<condition attribute='cog_defaultemailaddress' operator='eq' value='1' />" + "</filter>" + "</entity>" + "</fetch>";

        var records = XrmServiceToolkit.Soap.Fetch(fetchXml);

        if (records.length < 1) {
            alert("Default email address is not set up. Please alert System Administrator");
            return;
        }

        var id = records[0].id;

        var lookup = new Array();
        lookup[0] = new Object();
        lookup[0].id = records[0].id;
        lookup[0].name = records[0].attributes.fullname.value;
        lookup[0].entityType = records[0].logicalName;
        Xrm.Page.getAttribute("from").setValue(lookup);
    }
}

function SetToField() {

    if (Xrm.Page.getAttribute("statecode").getValue() === 1) return;
    if (Xrm.Page.getAttribute("to").getValue() !== null) return;

    var caseId = Xrm.Page.getAttribute("cog_caseid").getValue();
    if (caseId === null) return;

    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='cog_case'>" + "<attribute name='cog_caseid' />" + "<attribute name='cog_contactid' />" + "<order attribute='cog_contactid' descending='false' />" + "<filter type='and'>" + "<condition attribute='cog_caseid' operator='eq' uitype='cog_case' value='" + caseId[0].id + "' />" + "</filter>" + "</entity>" + "</fetch>";

    var records = XrmServiceToolkit.Soap.Fetch(fetchXml);

    if (records.length < 1) return;

    var lookup = new Array();
    lookup[0] = new Object();
    lookup[0].id = records[0].attributes.cog_contactid.id;
    lookup[0].entityType = records[0].attributes.cog_contactid.logicalName;
    lookup[0].name = records[0].attributes.cog_contactid.name;
    Xrm.Page.getAttribute("to").setValue(lookup);
}

//Populates Enumerator Response for Subject of Email
function Subject() {

    if (Xrm.Page.getAttribute("statecode").getValue() === 1) return;
    var subjField = Xrm.Page.getAttribute("subject");

    if (subjField.getValue() == null) {
        subjField.setValue("Enumerator Response");
        Xrm.Page.getAttribute("subject").setSubmitMode("always");
    }
}

function SetRegardingOrCaseId() {
    //var contact = Xrm.Page.getAttribute( "cog_caseid" ).getValue( );
    //var regarding = Xrm.Page.getAttribute( "regardingobjectid" ).getValue( );

    //if ( contact !== null )
    //    Xrm.Page.getAttribute( "regardingobjectid" ).setValue( contact );
    //else if ( regarding !== null )
    //    Xrm.Page.getAttribute( "cog_caseid" ).setValue( regarding );
}

function PopulateCaseId() {
    var parentId = Xrm.Page.getAttribute("parentactivityid").getValue();
    if (parentId === null) return;

    var caseObj = Xrm.Page.getAttribute("cog_caseid");

    if (caseObj.getValue() !== null) return;

    var regarding = Xrm.Page.getAttribute("regardingobjectid").getValue();
    if (regarding === null) return;

    Xrm.Page.getAttribute("cog_caseid").setValue(regarding);

    //var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
    //    "<entity name='email'>" +
    //    "<attribute name='activityid' />" +
    //    "<attribute name='cog_caseid' />" +
    //    "<order attribute='cog_caseid' descending='false' />" +
    //    "<filter type='and'>" +
    //    "<condition attribute='activityid' operator='eq' uitype='email' value='" + parentId[0].id + "' />" +
    //    "</filter>" +
    //    "</entity>" +
    //    "</fetch>";

    //var records = XrmServiceToolkit.Soap.Fetch(fetchXml);

    //if (records.length < 1)
    //    return;

    //var lookup = new Array();
    //lookup[0] = new Object();
    //lookup[0].id = records[0].attributes.cog_caseid.id;
    //lookup[0].entityType = records[0].attributes.cog_caseid.logicalName;
    //lookup[0].name = records[0].attributes.cog_caseid.name;
    //caseObj.setValue(lookup);

    //caseObj.setValue(records[0].attributes.cog_caseid.id);
}
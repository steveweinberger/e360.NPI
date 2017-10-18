/// <reference path="../Intellisense Files/Xrm.js" />
/// <reference path="XrmServiceToolkit.js" />
function PickQueueItem(UserID) {
    var queueItemsGridView = document.getElementById("crmGrid_SavedNewQuerySelector");
    var queueItemsQueues = document.getElementById("crmQueueSelector");
    var queueItemsSelectedTest = queueItemsQueues.options[queueItemsQueues.selectedIndex].text;
    var queueItemsSelectedValue = queueItemsQueues.options[queueItemsQueues.selectedIndex].value;

    GetOldestCase(queueItemsSelectedValue);

}

// do not get any cases where actual coverage year or coverage year != 2014
//(actual cov is null and cov != 2014) or (actual cov != 2014 && actual != null) or (cov and actual = null)
function GetOldestCase(queueId) {
    //XrmServiceToolkit.Rest.RetrieveMultiple( "QueueItemSet", "$select=cog_ItemDate,ObjectId,QueueItemId,cog_case_QueueItems/cog_ActualCoverageYear,cog_case_QueueItems/cog_CoverageYear&$orderby=cog_ItemDate asc&$expand=cog_case_QueueItems&$filter=WorkerId/Id eq null and StateCode/Value eq 0 and QueueId/Id eq  (guid'" + queueueId + "')", function( results ) {
    //        var firstResult = results[ 0 ];
    //        if ( firstResult != null )
    //            AssignRecords( firstResult );
    //        else
    //            alert( "There are no cases available in this queue. Please select a different Queue." );

    //    },
    //    function( error ) {
    //        equal( true, false, error.message );
    //    },
    //    function onComplete( ) {

    //    },
    //    false );

    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='queueitem'>" + "<attribute name='objecttypecode' />" + "<attribute name='objectid' />" + "<attribute name='title' />" + "<attribute name='enteredon' />" + "<attribute name='workerid' />" + "<attribute name='objectid' />" + "<order attribute='enteredon' descending='false' />" + "<filter type='and'>" + "<condition attribute='queueid' operator='eq' uitype='queue' value='" + queueId + "' />" + "<condition attribute='workerid' operator='null' />" + "<condition attribute='statecode' operator='eq' value='0' />" + "</filter>" + "</entity>" + "</fetch>";

    var queueResults = XrmServiceToolkit.Soap.Fetch(fetchXml);
    var firstResult = queueResults[0];
    if (firstResult != null) AssignRecords(firstResult);
    else alert("There are no items available in this queue. Please select a different Queue.");
}

function AssignRecords(results) {
    var userId = Xrm.Page.context.getUserId();
    var queueItemId = results.attributes.queueitemid.value;
    var queueItem = {};

    queueItem.WorkerId = {
        Id: userId,
        LogicalName: "systemuser"
    };

    XrmServiceToolkit.Rest.Update(
    queueItemId, queueItem, "QueueItemSet", function () {
        //alert( "The q record should have been updated.");
    },
    function (error) {
        alert(error.message);
    },
    false);

    var recordType = results.attributes.objectid.name;

    var recordId = results.attributes.objectid.id;

    // if email assign case as well
    if (recordType === "email") RetrieveCase(recordId, userId);

    XrmServiceToolkit.Soap.Assign(recordType, recordId, "systemuser", userId, function () {
        alert('Item succesfully assigned and can be found in the "Items I am working on" view');
    });
}

function RetrieveCase(emailId, userId) {
    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" + "<entity name='email'>" + "<attribute name='activityid' />" + "<attribute name='cog_caseid' />" + "<order attribute='cog_caseid' descending='false' />" + "<filter type='and'>" + "<condition attribute='activityid' operator='eq' uitype='email' value='" + emailId + "' />" + "</filter>" + "</entity>" + "</fetch>";

    var emailResults = XrmServiceToolkit.Soap.Fetch(fetchXml);
    var firstResult = emailResults[0];
    if (firstResult != null) {
        if (firstResult.attributes.cog_caseid != null) {
            XrmServiceToolkit.Soap.Assign("cog_case", firstResult.attributes.cog_caseid.id, "systemuser", userId, function () {});
        }
    }
}
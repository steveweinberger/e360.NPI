function getIdFromQS() {
    var vals = new Array();
    if (location.search != "") {
        vals = location.search.substr(1).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }
        //look for the parameter named 'id'
        for (var i in vals) {
            if (vals[i][0].toLowerCase() == "id") {
                return vals[i][1];
            }
        }
    }
}
function getData() {
    var d = new Date();
    var startDate = d.getFullYear() + "," + (d.getMonth() + 1) + "," + d.getDate();
    var data = {
        timeline: {
            headline: "",
            type: "default",
            text: "",
            date: new Array()
        }
    };
    //  query for timeline activity records
    var id = getIdFromQS();
    var records = new Array();
    XrmServiceToolkit.Rest.RetrieveMultiple("cog_timelineactivitySet", "$select=ActivityId,ActualStart,ActualEnd,Subject,Description,RegardingObjectId&$filter=(RegardingObjectId/Id eq (guid'" + id + "')) or (cog_ProviderId/Id eq (guid'" + id + "'))", function (results) {
        records = results;
    },
    function (error) {
        console.log(error.message);
    },
    function onComplete() {},
    false);
    console.log(records);
    if (records.length > 0) {
        for (var i = 0; i < records.length; i++) {
            var r = records[i];
            var sd = r.ActualStart.getFullYear() + "," + (r.ActualStart.getMonth() + 1) + "," + r.ActualStart.getDate();
            data.timeline.date.push({
                startDate: sd,
                headline: r.Subject,
                text: r.Description
            });
        }
    }
    else {
        data.timeline.date.push({
            startDate: startDate,
            headline: "No Data",
            text: "There have not been any timeline events created."
        });
    }
    return data;
}

requirejs(['../Common/XrmServiceToolkit'], function () {
    createStoryJS({
        type: 'timeline',
        width: '100%',
        height: "350",
        start_at_today: true,
        source: getData(),
        embed_id: 'timeline',
        start_zoom_adjust: 1
    });
    console.log('timeline initialized');
});
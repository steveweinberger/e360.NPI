// JavaScript source code
function LoadDocs() {
    if (Xrm.Page.ui.getFormType() === 1) return;

    var recordid = Xrm.Page.data.entity.getId();
    var strrecordid = recordid.toString().replace("{", "").replace("}", "");
    var typecode = Xrm.Page.context.getQueryStringParameters().etc;
    var formId = Xrm.Page.ui.formSelector.getCurrentItem().getId();
    var iFrame = Xrm.Page.ui.controls.get("IFRAME_Documents");

    var url = Xrm.Page.context.getClientUrl() + "/userdefined/areas.aspx?formid=" + formId + "&inlineEdit=1&navItemName=Documents&oId=%7b" + strrecordid + "%7d&oType=" + typecode + "&pagemode=iframe&rof=true&security=852023&tabSet=areaSPDocuments&theme=Outlook15White";

    iFrame.setSrc(url);

}
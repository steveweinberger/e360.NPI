cog_correspondencetype_OnChangeEvent = function () {
    var val = Xrm.Page.getAttribute("cog_correspondencetype").getValue();
    if (val === 181310004) {
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(true);
        Xrm.Page.getControl("cog_otherdescription").setVisible(false);
        Xrm.Page.getAttribute("cog_otherdescription").setValue(null);
    }
    else if (val === 181310005) {
        Xrm.Page.getControl("cog_otherdescription").setVisible(true);
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(false);
        Xrm.Page.getAttribute("cog_foreignproviderprojecttype").setValue(null);
    } else {
        Xrm.Page.getControl("cog_foreignproviderprojecttype").setVisible(false);
        Xrm.Page.getControl("cog_otherdescription").setVisible(false);
        Xrm.Page.getAttribute("cog_foreignproviderprojecttype").setValue(null);
        Xrm.Page.getAttribute("cog_otherdescription").setValue(null);
    }
};
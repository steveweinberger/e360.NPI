/// <reference path="XrmServiceToolkit.js" />

if (typeof(FormScripts) == "undefined") {
    FormScripts = {
        __namespace: true
    };
}

FormScripts.CrmUser = {
    firstName: '',
    lastName: '',
    fullName: '',
    guid: '',
    secRoleGuids: null,
    secRoleDesc: []
    /* todo: add more  attributes  as  needed -dfdfd  */
};
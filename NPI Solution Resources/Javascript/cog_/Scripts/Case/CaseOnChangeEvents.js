/// <reference path="../../../Intellisense Files/Xrm.js" />
/// <reference path="../../../Intellisense Files/ESANTE Case Form - Error Resolution - Paper (cog_case).js" />
/// <reference path="../Common/FormUtilities.js" />
cloneCase_ViewGrid = function( selectedItems ) {
    //alert( "hello world" );
    //alert(selectedItems[0].Id);
    //alert(selectedItems[0].Name);

    var i;
    for ( i = 0; i < selectedItems.length; i++ ) {
        var cogCase = new XrmServiceToolkit.Soap.BusinessEntity( "cog_case", selectedItems[ i ].Id );

        cogCase.attributes[ "cog_clonecase" ] = true;

        var updateResponse = XrmServiceToolkit.Soap.Update( cogCase );

        console.log( updateResponse );
    }
};

cloneButton_OnChangeEvent = function( ) {
    var caseTypeValue = Xrm.Page.getAttribute( "cog_casetype" ).getValue( );
    if ( caseTypeValue === 181310002 || caseTypeValue === 181310010) {// || caseTypeValue === 181310004 ) {
        Xrm.Page.getAttribute( "cog_clonecase" ).setValue( true );
        Xrm.Page.data.entity.save( );
    }
};

cog_contactphonenumber_OnChangeEvent = function( ) {
    var international = Xrm.Page.getAttribute( "cog_internationalnumber" ).getValue( );
    if ( international )
        return;
    FormScripts.FormUtilities.FormatPhone( Xrm.Page.getAttribute( "cog_contactphonenumber" ), 10, 15 );
};

cog_zipcode_OnChangeEvent = function( ) {
    FormScripts.FormUtilities.FormatZIP( Xrm.Page.getAttribute( "cog_zipcode" ) );
};

cog_npi_OnChangeEvent = function( ) {
    var npi = Xrm.Page.getAttribute( "cog_npi" ).getValue( );
    if ( npi === null )
        return;
    npi = npi.replace( /\s+/g, "" );
    var npiArr = npi.split( ";" );

    var npiList = Xrm.Page.getAttribute( "cog_npilist" ).getValue( );
    if ( npiList === null )
        return;
    var npiListArr = npiList.split( ";" );

    Xrm.Page.getAttribute( "cog_npi" ).setValue( npi );

    var i;
    var ii;
    for ( i = 0; i < npiArr.length; i++ ) {
        for ( ii = 0; ii < npiListArr.length; ii++ ) {
            if ( npiArr[ i ] === npiListArr[ ii ] ) {
                npiArr.splice( i, 1 );
                i--;
            }
        }
    }
    var z;
    var newNpiList = "";
    for ( z = 0; z < npiArr.length; z++ )
        newNpiList += npiArr[ z ] + ";";

    newNpiList = newNpiList.substring( 0, newNpiList.length - 1 );

    Xrm.Page.getAttribute( "cog_npi" ).setValue( newNpiList );
};

cog_providersameascontact = function( ) {
    var flag = Xrm.Page.getAttribute( "cog_providersameascontact" ).getValue( );
    var firstName = Xrm.Page.getAttribute( "cog_contactfirstname" ).getValue( );
    var lastName = Xrm.Page.getAttribute( "cog_contactlastname" ).getValue( );
    if ( flag ) {
        if ( firstName != null )
            Xrm.Page.getAttribute( "cog_providerfirstname" ).setValue( firstName );
        else
            Xrm.Page.getAttribute( "cog_providerfirstname" ).setValue( null );
        if ( lastName != null )
            Xrm.Page.getAttribute( "cog_providerlastname" ).setValue( lastName );
        else
            Xrm.Page.getAttribute( "cog_providerlastname" ).setValue( null );
    } else {
        Xrm.Page.getAttribute( "cog_providerfirstname" ).setValue( null );
        Xrm.Page.getAttribute( "cog_providerlastname" ).setValue( null );
    }
};

cog_follow224_OnChangeEvent = function( ) {
    var dateField = Xrm.Page.getAttribute( "cog_twobusinessdayslater" );
    if ( Xrm.Page.getAttribute( "cog_follow224" ).getValue( ) ) {
        var today = new Date( );
        var dayNum = today.getDay( );

        if ( dayNum === 4 || dayNum === 5 ) {
            today.setDate( today.getDate( ) + 4 );
            dateField.setValue( today );
            dateField.setSubmitMode( "always" );
        } else {
            today.setDate( today.getDate( ) + 2 );
            dateField.setValue( today );
            dateField.setSubmitMode( "always" );
        }
    } else {
        dateField.setValue( null );
        dateField.setSubmitMode( "always" );
    }
};
cog_contactsameasprovider = function( ) {
    var flag = Xrm.Page.getAttribute( "cog_contactsameasprovider" ).getValue( );
    var firstName = Xrm.Page.getAttribute( "cog_providerfirstname" ).getValue( );
    var lastName = Xrm.Page.getAttribute( "cog_providerlastname" ).getValue( );
    if ( flag ) {
        if ( firstName != null )
            Xrm.Page.getAttribute( "cog_contactfirstname" ).setValue( firstName );
        else
            Xrm.Page.getAttribute( "cog_contactfirstname" ).setValue( null );
        if ( lastName != null )
            Xrm.Page.getAttribute( "cog_contactlastname" ).setValue( lastName );
        else
            Xrm.Page.getAttribute( "cog_contactlastname" ).setValue( null );
    } else {
        Xrm.Page.getAttribute( "cog_contactfirstname" ).setValue( null );
        Xrm.Page.getAttribute( "cog_contactlastname" ).setValue( null );
    }
};

cog_ssn_OnChangeEvent = function( ) {
    FormScripts.FormUtilities.FormatSSN( Xrm.Page.getAttribute( "cog_ssn" ) );
};

cog_casestatus_OnChangeEvent = function( ) {
    //var caseStausObj = Xrm.Page.getAttribute("cog_casestatus");
    //if ( caseStausObj.getValue( ) === 181310003 ) {
    //    alert("Please choose an option other than 'Overdue'");
    //    caseStausObj.setValue( 181310000 );
    //}


};
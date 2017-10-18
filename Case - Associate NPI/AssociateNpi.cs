using System;
using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Case___Asspociate_NPI
{
    public class AssociateNpi
    {
        private readonly IOrganizationService _OrgService;
        private Entity Case;
        private bool CaseUpdated;

        public AssociateNpi( IOrganizationService _orgService )
        {
            _OrgService = _orgService;
        }

        public void InitializeAssociation( Guid caseId )
        {
            if ( !RetrieveCase( caseId ) ) // Check to see if last name is populated
            {
                AssociateProvider();
                ClearNpi();
                return;
            }
            var guids = AssociateProvider( );
            AssociateContacts( guids );
            ClearNpi( );
        }

        public void ContactAssociationOnly( Guid caseId )
        {
            if ( !RetrieveCase( caseId ) ) // Check to see if last name is populated
                return;

            if (Case.Contains("cog_npilist"))
            {
                // NPI are associated already
                var guids = RetrieveAssociatedProviders();
                AssociateContacts(guids);
            }
            else if ( RetrieveContactsWithoutNpi( ) )
            {
                var contact = new Entity( "contact" );
                if ( Case.Contains( "cog_contactfirstname" ) )
                    contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                if ( Case.Contains( "cog_contactlastname" ) )
                    contact[ "lastname" ] = Case[ "cog_contactlastname" ];
                if ( Case.Contains( "cog_contactphonenumber" ) )
                    contact[ "telephone1" ] = Case[ "cog_contactphonenumber" ];
                if ( Case.Contains( "cog_contactemail" ) )
                    contact[ "emailaddress1" ] = Case[ "cog_contactemail" ];

                var contactId = _OrgService.Create( contact );

                UpdateCase( contactId, null, null, null );
            }
        }

        private bool RetrieveCase( Guid caseId )
        {
            Case = _OrgService.Retrieve( "cog_case", caseId, new ColumnSet( true ) );

            if ( !Case.Contains( "cog_contactlastname" ) )
                return false;

            return true;
        }

        private List < Guid > AssociateProvider( )
        {
            var proivderEntities = new EntityReferenceCollection( );

            // Split array at ';' for multiple NPI
            var npi = Case[ "cog_npi" ].ToString( );
            if ( Case.Contains( "cog_npilist" ) )
                Case[ "cog_npilist" ] = Case[ "cog_npilist" ] + ";" + npi;
            else
                Case[ "cog_npilist" ] = npi;
            var npiArr = npi.Split( ';' );
            var guids = new List < Guid >( );

            for ( var i = 0; i < npiArr.Length; i++ )
            {
                Guid providerId;

                var qba = new QueryByAttribute( "cog_provider" );
                qba.ColumnSet = new ColumnSet( true );
                qba.Attributes.AddRange( "cog_name" );
                qba.Values.Add( npiArr[ i ] );
                var ec = _OrgService.RetrieveMultiple( qba );

                if ( ec.Entities.Count == 0 ) // No matches
                {
                    var provider = new Entity( "cog_provider" );
                    provider[ "cog_name" ] = npiArr[ i ];

                    if ( npiArr.Length == 1 ) // if multiple NPI do not enter demographic info
                    {
                        if ( Case.Contains( "cog_contactfirstname" ) )
                            provider[ "cog_contactfirstname" ] = Case[ "cog_contactfirstname" ];
                        if ( Case.Contains( "cog_contactlastname" ) )
                            provider[ "cog_contactlastname" ] = Case[ "cog_contactlastname" ];
                        if ( Case.Contains( "cog_contactphonenumber" ) )
                            provider[ "cog_contactphonenumber" ] = Case[ "cog_contactphonenumber" ];
                        if ( Case.Contains( "cog_contactemail" ) )
                            provider[ "cog_contactemailaddress" ] = Case[ "cog_contactemail" ];
                    }

                    providerId = _OrgService.Create( provider );
                }
                else
                    providerId = ec[ 0 ].Id; // We found a match
                proivderEntities.Add( new EntityReference( "cog_provider", providerId ) );
                guids.Add( providerId );
            }

            // ASSOCIATE
            var relationship = new Relationship( "cog_provider_cog_case" );
            _OrgService.Associate( "cog_case", Case.Id, relationship, proivderEntities );
            return guids;
        }

        private void UpdateCase( Guid contactId,
                                 string firstName,
                                 string lastName,
                                 string phoneNumber )
        {
            if ( !CaseUpdated )
            {
                Case[ "cog_contactid" ] = new EntityReference( "contact", contactId );
                //Case["cog_contactfirstname"] = firstName;
                //Case["cog_contactlastname"] = lastName;
                //Case["cog_contactphonenumber"] = phoneNumber;
                _OrgService.Update( Case );
                CaseUpdated = true;
            }
        }

        private void AssociateContacts( List < Guid > guids )
        {
            var fetchXml = "";
            fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                       "<entity name='contact'>" +
                       "<attribute name='telephone1' />" +
                       "<attribute name='contactid' />" +
                       "<attribute name='lastname' />" +
                       "<attribute name='firstname' />" +
                       "<attribute name='emailaddress1' />" +
                       "<order attribute='telephone1' descending='false' />" +
                       "<link-entity name='cog_provider_contact' from='contactid' to='contactid' visible='false' intersect='true'>" +
                       "<link-entity name='cog_provider' from='cog_providerid' to='cog_providerid' alias='ab'>" +
                       "<filter type='and'>" +
                       "<condition attribute='cog_providerid' operator='in'>";
            foreach ( var guid in guids )
                fetchXml += "<value uitype='cog_provider'>" + guid + "</value>";
            fetchXml += "</condition>" +
                        "</filter>" +
                        "</link-entity>" +
                        "</link-entity>" +
                        "</entity>" +
                        "</fetch>";

            var contacts = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );

            var matched = false;

            foreach ( var contact in contacts.Entities )
                matched = AnalyzeContactForMatch( contact, guids, matched );

            // look for contacts with matching attributes
            if ( !matched )
                matched = RetrieveContactsWithoutNpi( );

            if ( !matched ) // if there is no match create a contact and associate it and set the lookup
            {
                var newContact = new Entity( "contact" );
                if ( Case.Contains( "cog_contactfirstname" ) )
                    newContact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                if ( Case.Contains( "cog_contactlastname" ) )
                    newContact[ "lastname" ] = Case[ "cog_contactlastname" ];
                if ( Case.Contains( "cog_contactphonenumber" ) )
                    newContact[ "telephone1" ] = Case[ "cog_contactphonenumber" ];
                if ( Case.Contains( "cog_contactemail" ) )
                    newContact[ "emailaddress1" ] = Case[ "cog_contactemail" ];
                var newContactId = _OrgService.Create( newContact );

                // ASSOCIATE to Provider
                AssociateContactToProvider( newContactId, guids );

                // Update Contact Id on Case
                UpdateCase( newContactId, null, null, null );
            }
        }

        private bool AnalyzeContactForMatch( Entity contact,
                                             List < Guid > guids,
                                             bool matched )
        {
            // If any of the three scenarios match take info from Case and update the Contact
            if ( contact.Contains( "firstname" ) && contact.Contains( "lastname" ) )
            {
                if ( Case.Contains( "cog_contactfirstname" ) && Case.Contains( "cog_contactlastname" ) )
                {
                    if ( ( contact[ "firstname" ].ToString( ).ToLower( ).Trim( ) == Case[ "cog_contactfirstname" ].ToString( ).ToLower( ).Trim( ) )
                         && ( contact[ "lastname" ].ToString( ).ToLower( ).Trim( ) == Case[ "cog_contactlastname" ].ToString( ).ToLower( ).Trim( ) ) )
                    {
                        if ( Case.Contains( "cog_contactphonenumber" ) )
                            contact[ "telephone1" ] = Case[ "cog_contactphonenumber" ];
                        if ( Case.Contains( "cog_contactemail" ) )
                            contact[ "emailaddress1" ] = Case[ "cog_contactemail" ];
                        matched = true;
                        _OrgService.Update( contact );
                        UpdateCase( contact.Id, null, null, null );
                    }
                }
            }

            if ( contact.Contains( "telephone1" ) && !matched )
            {
                if ( Case.Contains( "cog_contactphonenumber" ) && Case.Contains( "cog_contactlastname" ) )
                {
                    var telephone = contact[ "telephone1" ].ToString( ).Trim( '-', '(', ')' );
                    var caseTelephone = Case[ "cog_contactphonenumber" ].ToString( ).Trim( '-', '(', ')' );
                    if ( telephone == caseTelephone
                         && ( contact[ "lastname" ].ToString( ).ToLower( ).Trim( ) == Case[ "cog_contactlastname" ].ToString( ).ToLower( ).Trim( ) ) )
                    {
                        if ( Case.Contains( "cog_contactfirstname" ) )
                            contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                        if ( Case.Contains( "cog_contactlastname" ) )
                            contact[ "lastname" ] = Case[ "cog_contactlastname" ];
                        if ( Case.Contains( "cog_contactemail" ) )
                            contact[ "emailaddress1" ] = Case[ "cog_contactemail" ];
                        matched = true;
                        _OrgService.Update( contact );
                        UpdateCase( contact.Id, null, null, null );
                    }
                }
            }
            if ( contact.Contains( "emailaddress1" ) && !matched )
            {
                if ( Case.Contains( "cog_contactemail" ) && Case.Contains( "cog_contactlastname" ) )
                {
                    if ( contact[ "emailaddress1" ].ToString( ).Trim( ) == Case[ "cog_contactemail" ].ToString( ).Trim( )
                         && ( contact[ "lastname" ].ToString( ).ToLower( ).Trim( ) == Case[ "cog_contactlastname" ].ToString( ).ToLower( ).Trim( ) ) )
                    {
                        if ( Case.Contains( "cog_contactfirstname" ) )
                            contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                        if ( Case.Contains( "cog_contactlastname" ) )
                            contact[ "lastname" ] = Case[ "cog_contactlastname" ];
                        if ( Case.Contains( "cog_contactphonenumber" ) )
                            contact[ "telephone1" ] = Case[ "cog_contactphonenumber" ];
                        matched = true;
                        _OrgService.Update( contact );
                        UpdateCase( contact.Id, null, null, null );
                    }
                }
            }

            AssociateContactToProvider( contact.Id, guids );

            return matched;
        }

        private void AssociateContactToProvider( Guid contactId,
                                                 List < Guid > guids )
        {
            // TODO Retrieve Associated Provider Guids so you don't associate it twice

            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                           "<entity name='cog_provider'>" +
                           "<attribute name='cog_providerid' />" +
                           "<attribute name='cog_name' />" +
                           "<order attribute='cog_name' descending='false' />" +
                           "<link-entity name='cog_provider_contact' from='cog_providerid' to='cog_providerid' visible='false' intersect='true'>" +
                           "<link-entity name='contact' from='contactid' to='contactid' alias='ab'>" +
                           "<filter type='and'>" +
                           "<condition attribute='contactid' operator='eq' uitype='contact' value='" + contactId + "' />" +
                           "</filter>" +
                           "</link-entity>" +
                           "</link-entity>" +
                           "</entity>" +
                           "</fetch>";

            var providers = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );

            var indexToRemove = new List < int >( );
            foreach ( var provider in providers.Entities )
            {
                for ( var i = 0; i < guids.Count; i++ )
                {
                    if ( guids[ i ] == provider.Id )
                        indexToRemove.Add( i );
                }
            }

            foreach ( var i in indexToRemove )
                guids.RemoveAt( i );

            if ( guids.Count == 0 )
                return;
            var providerEntities = new EntityReferenceCollection( );
            foreach ( var guid in guids )
                providerEntities.Add( new EntityReference( "cog_provider", guid ) );
            var relationship = new Relationship( "cog_provider_contact" );
            _OrgService.Associate( "contact", contactId, relationship, providerEntities );
        }

        private bool RetrieveContactsWithoutNpi( )
        {
            // Retrieve all contacts with last name
            if ( !Case.Contains( "cog_contactlastname" ) || !Case.Contains( "cog_contactfirstname" ) )
                return false;

            string firstName = string.Empty;

            if ( Case[ "cog_contactfirstname" ].ToString( ).Length < 2 )
                firstName = Case[ "cog_contactfirstname" ].ToString( );
            else
                firstName = Case[ "cog_contactfirstname" ].ToString( ).Substring( 0, 2 );

            //HttpUtility.HtmlEncode("Do you want to subscribe to 1 & 2?")
            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                           "<entity name='contact'>" +
                           "<attribute name='telephone1' />" +
                           "<attribute name='contactid' />" +
                           "<attribute name='lastname' />" +
                           "<attribute name='firstname' />" +
                           "<attribute name='emailaddress1' />" +
                           "<order attribute='telephone1' descending='false' />" +
                           "<filter type='and'>" +
                           "<condition attribute='lastname' operator='eq' value='" + Case["cog_contactlastname"].ToString().Replace("<", "&lt;").Replace(">", "&gt;").Replace("'", "&apos;").Replace("&", "&amp;").Replace("\"", "&quot;") + "' />" +
                           "<condition attribute='firstname' operator='like' value='" + firstName.Replace("<", "&lt;").Replace(">", "&gt;").Replace("'", "&apos;").Replace("&", "&amp;").Replace("\"", "&quot;") + "%' />" +
                           "</filter>" +
                           "</entity>" +
                           "</fetch>";

            var ec = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );

            foreach ( var contact in ec.Entities )
            {
                if ( contact.Contains( "firstname" ) && contact.Contains( "telephone1" ) )
                {
                    string contactFirstName = string.Empty;

                    if (Case["cog_contactfirstname"].ToString().Length < 2)
                        contactFirstName = contact["firstname"].ToString();
                    else
                        contactFirstName = contact["firstname"].ToString().Substring(0, 2);

                    if ( Case.Contains( "cog_contactfirstname" ) && Case.Contains( "cog_contactphonenumber" ) )
                    {
                        if (firstName == contactFirstName &&
                             Case[ "cog_contactphonenumber" ].ToString( ) == contact[ "telephone1" ].ToString( ) )
                        {
                            if ( Case.Contains( "cog_contactfirstname" ) )
                                contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                            if ( Case.Contains( "cog_contactemail" ) )
                                contact[ "emailaddress1" ] = Case[ "cog_contactemail" ];
                            _OrgService.Update( contact );
                            UpdateCase( contact.Id, null, null, null );
                            return true;
                        }
                    }
                }

                if ( contact.Contains( "firstname" ) && contact.Contains( "emailaddress1" ) )
                {
                    string contactFirstName = string.Empty;

                    if (Case["cog_contactfirstname"].ToString().Length < 2)
                        contactFirstName = contact["firstname"].ToString();
                    else
                        contactFirstName = contact["firstname"].ToString().Substring(0, 2);

                    if ( Case.Contains( "cog_contactfirstname" ) && Case.Contains( "cog_contactemail" ) )
                    {
                        if (firstName == contactFirstName &&
                             Case[ "cog_contactemail" ].ToString( ) == contact[ "emailaddress1" ].ToString( ) )
                        {
                            if ( Case.Contains( "cog_contactfirstname" ) )
                                contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                            if ( Case.Contains( "cog_contactfirstname" ) )
                                contact[ "firstname" ] = Case[ "cog_contactfirstname" ];
                            if ( Case.Contains( "cog_contactphonenumber" ) )
                                contact[ "telephone1" ] = Case[ "cog_contactphonenumber" ];
                            _OrgService.Update( contact );
                            UpdateCase( contact.Id, null, null, null );
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        private void ClearNpi( )
        {
            Case[ "cog_npi" ] = string.Empty;
            _OrgService.Update( Case );
        }

        private List<Guid> RetrieveAssociatedProviders()
        {
            var fetchxml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                           "<entity name='cog_provider'>" +
                           "<attribute name='cog_providerid' />" +
                           "<attribute name='cog_name' />" +
                           "<attribute name='createdon' />" +
                           "<order attribute='cog_name' descending='false' />" +
                           "<link-entity name='cog_provider_cog_case' from='cog_providerid' to='cog_providerid' visible='false' intersect='true'>" +
                           "<link-entity name='cog_case' from='cog_caseid' to='cog_caseid' alias='aa'>" +
                           "<filter type='and'>" +
                           "<condition attribute='cog_caseid' operator='eq' uitype='cog_case' value='" + Case.Id.ToString() + "' />" +
                           "</filter>" +
                           "</link-entity>" +
                           "</link-entity>" +
                           "</entity>" +
                           "</fetch>";

            var providers = _OrgService.RetrieveMultiple(new FetchExpression(fetchxml));
            var guids = new List<Guid>();

            foreach ( var provider in providers.Entities )
            {
                guids.Add(provider.Id);
            }
            return guids;
        }
    }
}
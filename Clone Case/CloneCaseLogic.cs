using System;
using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Clone_Case
{
    public class CloneCaseLogic
    {
        private readonly Entity _Clone = new Entity( "cog_case" );
        private readonly Entity _Entity;
        private readonly IOrganizationService _OrgService;
        private int _CaseTypeValue;

        public CloneCaseLogic( IOrganizationService orgService,
                               Guid entityId )
        {
            _OrgService = orgService;
            _Entity = _OrgService.Retrieve( "cog_case", entityId, new ColumnSet( true ) );
        }

        public void Initiate( )
        {
            if ( VerifyRecordIsEligible( ) )
            {
                PrepareCloneEntity( );
                if ( _CaseTypeValue != 181310002 ) // If not ER Web set all values
                    SetCloneMiscValues( );
                SetCloneContactInformation( );
                var newCaseId = CreateClone( );
                var guidList = RetrieveAssociatedProviders( );
                if ( _CaseTypeValue != 181310002 ) // If not ER Web set NPI
                    AssociateProvidersToNewCase( guidList, newCaseId );
                SetCloneFlagToFalse( );
            }
        }

        private void PrepareCloneEntity( )
        {
            _Clone[ "cog_parentcaseid" ] = new EntityReference( "cog_case", _Entity.Id );
            _Clone[ "cog_casetype" ] = new OptionSetValue(_CaseTypeValue);
        }

        private void SetCloneMiscValues( )
        {
            if ( _Entity.Contains( "cog_applicationtype" ) )
                _Clone[ "cog_applicationtype" ] = _Entity[ "cog_applicationtype" ];

            if ( _Entity.Contains( "cog_tid" ) )
                _Clone[ "cog_tid" ] = _Entity[ "cog_tid" ];

            if ( _Entity.Contains( "cog_receiptdate" ) )
                _Clone[ "cog_receiptdate" ] = _Entity[ "cog_receiptdate" ];

            if ( _Entity.Contains( "cog_npilist" ) )
                _Clone[ "cog_npilist" ] = _Entity[ "cog_npilist" ];

            if ( _Entity.Contains( "cog_organization" ) )
                _Clone[ "cog_organization" ] = _Entity[ "cog_organization" ];
        }

        private void SetCloneContactInformation( )
        {
            // Contact info

            if ( _Entity.Contains( "cog_contactsameasprovider" ) )
                _Clone[ "cog_contactsameasprovider" ] = _Entity[ "cog_contactsameasprovider" ];

            if ( _Entity.Contains( "cog_contactid" ) )
                _Clone[ "cog_contactid" ] = _Entity[ "cog_contactid" ];

            if ( _Entity.Contains( "cog_contactfirstname" ) )
                _Clone[ "cog_contactfirstname" ] = _Entity[ "cog_contactfirstname" ];

            if ( _Entity.Contains( "cog_contactlastname" ) )
                _Clone[ "cog_contactlastname" ] = _Entity[ "cog_contactlastname" ];

            if ( _Entity.Contains( "cog_contactphonenumber" ) )
                _Clone[ "cog_contactphonenumber" ] = _Entity[ "cog_contactphonenumber" ];

            if ( _Entity.Contains( "cog_internationalnumber" ) )
                _Clone[ "cog_internationalnumber" ] = _Entity[ "cog_internationalnumber" ];

            if ( _Entity.Contains( "cog_extensionnumber" ) )
                _Clone[ "cog_extensionnumber" ] = _Entity[ "cog_extensionnumber" ];
        }

        private Guid CreateClone( )
        {
            return _OrgService.Create( _Clone );
        }

        private void SetCloneFlagToFalse( )
        {
            _Entity[ "cog_clonecase" ] = false;
            _OrgService.Update( _Entity );
        }

        private bool VerifyRecordIsEligible( )
        {
            _CaseTypeValue = ( ( OptionSetValue ) _Entity[ "cog_casetype" ] ).Value;

            if ( !( bool ) _Entity[ "cog_clonecase" ] )
                return false;

            if ( _CaseTypeValue == 181310002 || _CaseTypeValue == 181310010 ) // || _CaseTypeValue == 181310004 )
            {
                if ( _CaseTypeValue == 181310010 ) // Paper App
                    _CaseTypeValue = 181310004; // Set for Clone use
                return true;
            }

            SetCloneFlagToFalse( );
            return false;
        }

        private List < Guid > RetrieveAssociatedProviders( )
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
                           "<condition attribute='cog_caseid' operator='eq' uitype='cog_case' value='" + _Entity.Id + "' />" +
                           "</filter>" +
                           "</link-entity>" +
                           "</link-entity>" +
                           "</entity>" +
                           "</fetch>";

            var providers = _OrgService.RetrieveMultiple( new FetchExpression( fetchxml ) );
            var guids = new List < Guid >( );

            foreach ( var provider in providers.Entities )
                guids.Add( provider.Id );
            return guids;
        }

        private void AssociateProvidersToNewCase( List < Guid > providerIds,
                                                  Guid newCaseId )
        {
            var proivderEntities = new EntityReferenceCollection( );
            foreach ( var id in providerIds )
                proivderEntities.Add( new EntityReference( "cog_provider", id ) );
            var relationship = new Relationship( "cog_provider_cog_case" );
            _OrgService.Associate( "cog_case", newCaseId, relationship, proivderEntities );
        }
    }
}
using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Populate_Emails_Without_Cases
{
    public class PopulateEmailCasesLogic
    {
        private readonly IOrganizationService _OrgService;
        private Entity _Entity;
        private EntityCollection _QIEmails;

        public PopulateEmailCasesLogic( IOrganizationService orgService,
                                        Entity entity )
        {
            _OrgService = orgService;
            _Entity = entity;
        }

        public void Initialize( )
        {
            RetrieveEmailsWithoutCases( );
            IterateEmailsAndAssignCase( );
            UpdateSettingRecord( );
        }

        private void RetrieveEmailsWithoutCases( )
        {
            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                           "<entity name='queueitem'>" +
                           "<attribute name='objectid' />" +
                           "<attribute name='objectid' />" +
                           "<attribute name='objecttypecode' />" +
                           "<order attribute='objectid' descending='true' />" +
                           "<filter type='and'>" +
                           "<condition attribute='queueid' operator='eq' uiname='Inbound Email' uitype='queue' value='" + RetrieveQueueInfo( ) + "' />" +
                           "<condition attribute='statecode' operator='eq' value='0' />" +
                           "</filter>" +
                           "<link-entity name='email' from='activityid' to='objectid' alias='ac'>" +
                           "<filter type='and'>" +
                           "<condition attribute='cog_caseid' operator='null' />" +
                           "</filter>" +
                           "</link-entity>" +
                           "</entity>" +
                           "</fetch>";

            _QIEmails = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );
        }

        private Guid RetrieveQueueInfo( )
        {
            var qba = new QueryByAttribute( "queue" );
            qba.ColumnSet = new ColumnSet( "name" );
            qba.Attributes.AddRange( "name" );
            qba.Values.AddRange( "Inbound Email" );
            var ec = _OrgService.RetrieveMultiple( qba );
            return ec[ 0 ].Id;
        }

        private void IterateEmailsAndAssignCase( )
        {
            foreach ( var entity in _QIEmails.Entities )
            {
                var eCase = new Entity( "cog_case" );
                eCase[ "cog_applicationtype" ] = new OptionSetValue( 100000000);
                eCase[ "cog_casetype" ] = new OptionSetValue(181310005);

                var email = new Entity( "email" );
                email.Id = ( ( EntityReference ) entity[ "objectid" ] ).Id;
                email[ "cog_caseid" ] = new EntityReference( "cog_case", _OrgService.Create( eCase ) );
                _OrgService.Update(email);
            }
        }

        private void UpdateSettingRecord( )
        {
            _Entity[ "cog_flag" ] = false;
            _Entity[ "cog_integervalue" ] = _QIEmails.Entities.Count;
            _OrgService.Update(_Entity);
        }
    }
}
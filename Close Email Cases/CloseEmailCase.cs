using System;
using System.Activities.Statements;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Close_Email_Cases_Plugin
{
    public class CloseEmailCase
    {
        private readonly IOrganizationService _OrgService;
        private EntityCollection EmailCollection;

        public CloseEmailCase(IOrganizationService orgService)
        {
            _OrgService = orgService;
        }

        public void Execute( Guid caseId )
        {
            Entity cogcase = _OrgService.Retrieve( "cog_case", caseId, new ColumnSet( "cog_casetype", "cog_casestatus" ) );

            //if (((OptionSetValue)cogcase["cog_casetype"]).Value == 181310005 && ((OptionSetValue)cogcase["cog_casestatus"]).Value == 181310002)
                if (((OptionSetValue)cogcase["cog_casestatus"]).Value == 181310002)
            {

                //throw new Exception( "Case Status - " + ( ( OptionSetValue ) cogcase[ "cog_casestatus" ] ).Value.ToString( ) + " & Case Type = " + ( ( OptionSetValue ) cogcase[ "cog_casetype" ] ).Value );

                RetrieveAssociatedEmails( caseId );
                UpdateEmails( );
            }
        }

        private void RetrieveAssociatedEmails( Guid caseId )
        {
            var qba = new QueryByAttribute("email");
            qba.ColumnSet = new ColumnSet(true);
            qba.Attributes.AddRange("cog_caseid");
            qba.Values.Add(caseId);
            EmailCollection = _OrgService.RetrieveMultiple(qba);
        }

        private void UpdateEmails( )
        {
            foreach ( var email in EmailCollection.Entities )
            {
                email[ "cog_emailcaseclosed" ] = true;
                _OrgService.Update( email );
            }
        }
    }
}

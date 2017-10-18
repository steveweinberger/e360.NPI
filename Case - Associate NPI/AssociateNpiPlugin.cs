using System;
using System.ServiceModel;
using Case___Asspociate_NPI;
using Microsoft.Xrm.Sdk;

/// <summary>
///     Base class for all Plugins.
/// </summary>
public class AssociateNpiPlugin : IPlugin
{
    void IPlugin.Execute( IServiceProvider serviceProvider )
    {
        Execute( serviceProvider );
    }

    private static void Execute( IServiceProvider serviceProvider )
    {
        //START SET UP FOR CRM CONNECTION   
        var tracingService = ( ITracingService ) serviceProvider.GetService( typeof ( ITracingService ) );
        var context = ( IPluginExecutionContext ) serviceProvider.GetService( typeof ( IPluginExecutionContext ) );
        if ( context.Depth > 1  )
            return;

        var serviceFactory = ( IOrganizationServiceFactory ) serviceProvider.GetService( typeof ( IOrganizationServiceFactory ) );
        var crmService = serviceFactory.CreateOrganizationService( context.UserId );
        //END SETUP FOR CRM CONNECTION

        if ( context.InputParameters.Contains( "Target" ) )
        {
            try
            {
                var entity = ( Entity ) context.InputParameters[ "Target" ];
                var an = new AssociateNpi( crmService );

                if ( entity.Contains( "cog_npi" ) )
                    an.InitializeAssociation( entity.Id );
                else if (entity.Contains("cog_contactlastname") && !entity.Contains("cog_contactid") || entity.Contains("cog_contactfirstname") && !entity.Contains("cog_contactid") || entity.Contains("cog_contactphonenumber") && !entity.Contains("cog_contactid") || entity.Contains("cog_contactemail") && !entity.Contains("cog_contactid"))
                    an.ContactAssociationOnly( entity.Id );
            }
            catch ( FaultException < OrganizationServiceFault > ex )
            {
                throw new InvalidPluginExecutionException( "An error occurred: " + ex );
            }
            catch ( Exception ex )
            {
                tracingService.Trace( "Error Plugin: {0}", ex.ToString( ) );
                throw;
            }
        }
    }
}
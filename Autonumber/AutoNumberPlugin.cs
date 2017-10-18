using System;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using _LOCAL__NPI_DEV_Plugins;

/// <summary>
///     Base class for all Plugins.
/// </summary>
public class AutoNumberCasePlugin : IPlugin
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
        if (context.Depth > 4)
            return;
        var serviceFactory = ( IOrganizationServiceFactory ) serviceProvider.GetService( typeof ( IOrganizationServiceFactory ) );
        var crmService = serviceFactory.CreateOrganizationService( context.UserId );
        //END SETUP FOR CRM CONNECTION

        if ( context.InputParameters.Contains( "Target" ) )
        {
            try
            {
                var entity = (Entity)context.InputParameters["Target"];
                var anc = new AutoNumber(crmService, entity);

                if(entity.LogicalName == "cog_cogsetting")
                    anc.SetAutoNumber();
                else if ( entity.LogicalName == "cog_case" )
                {
                    var ent = crmService.Retrieve(entity.LogicalName, entity.Id, new ColumnSet("cog_number"));
                    if (ent.Contains("cog_number"))
                        if (ent["cog_number"].ToString() != "")
                            return;
                    anc.TriggerAutoNumber();

                    //bool createdFromWF = (bool)entity["cog_createdfromworkflow"];
                    //var stepName = context.OwningExtension.Name;

                    //if (stepName == "CogAutoNumber.Case" && !createdFromWF)
                    //    anc.TriggerAutoNumber();
                    //else if (stepName == null && createdFromWF)
                    //    anc.TriggerAutoNumber();
                    //else
                    //    return;
                }
                else
                    anc.TriggerAutoNumber();

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
using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.ServiceModel;
using Close_Email_Cases_Plugin;
using Microsoft.Xrm.Sdk;

/// <summary>
/// Base class for all Plugins.
/// </summary>    
public class CloseEmailCasePlugin : IPlugin
{
    void IPlugin.Execute(IServiceProvider serviceProvider)
    {
        Execute(serviceProvider);
    }

    private static void Execute(IServiceProvider serviceProvider)
    {
        //START SET UP FOR CRM CONNECTION   
        var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
        var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
        if (context.Depth > 1)
            return;

        var serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
        var crmService = serviceFactory.CreateOrganizationService(context.UserId);
        //END SETUP FOR CRM CONNECTION

        if (context.InputParameters.Contains("Target"))
        {
            try
            {
                var entity = (Entity)context.InputParameters["Target"];
                // TODO Enter Here

                CloseEmailCase cec = new CloseEmailCase(crmService);
                cec.Execute( entity.Id );

            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException("An error occurred: " + ex);
            }
            catch (Exception ex)
            {
                tracingService.Trace("Error Plugin: {0}", ex.ToString());
                throw;
            }
        }
    }
}
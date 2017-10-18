using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;

namespace Clone_Case
{
    public partial class CloneCase : CloneCaseBasePlugin
    {
        public CloneCase(string unsecureConfig, string secureConfig) : base(unsecureConfig, secureConfig)
        {
            // Register for any specific events by instantiating a new instance of the 'PluginEvent' class and registering it
            base.RegisteredEvents.Add(new PluginEvent()
            {
                Stage = eStage.PostOperation,
                MessageName = MessageNames.Update,
                EntityName = EntityNames.cog_case,
                PluginAction = ExecutePluginLogic
            });
        }
        public void ExecutePluginLogic(IServiceProvider serviceProvider)
        {
            // Use a 'using' statement to dispose of the service context properly
            // To use a specific early bound entity replace the 'Entity' below with the appropriate class type
            using (var localContext = new LocalPluginContext<Entity>(serviceProvider))
            {
                if ( localContext.Depth > 1 )
                    return;
                // Todo: Place your logic here for the plugin
                CloneCaseLogic ccl = new CloneCaseLogic(localContext.OrganizationService, localContext.TargetEntity.Id);
                ccl.Initiate();
            }
        }
    }
}

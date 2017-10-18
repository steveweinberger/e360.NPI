using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Populate_Emails_Without_Cases
{
    public partial class PopulateEmailCases : PopulateEmailCasesBasePlugin
    {
        public PopulateEmailCases(string unsecureConfig, string secureConfig) : base(unsecureConfig, secureConfig)
        {
            // Register for any specific events by instantiating a new instance of the 'PluginEvent' class and registering it
            base.RegisteredEvents.Add(new PluginEvent()
            {
                Stage = eStage.PostOperation,
                MessageName = MessageNames.Update,
                EntityName = EntityNames.cog_cogsetting,
                PluginAction = ExecutePluginLogic
            });
        }
        public void ExecutePluginLogic(IServiceProvider serviceProvider)
        {
            // Use a 'using' statement to dispose of the service context properly
            // To use a specific early bound entity replace the 'Entity' below with the appropriate class type
            using (var localContext = new LocalPluginContext<Entity>(serviceProvider))
            {
                // Todo: Place your logic here for the plugin
                var entity = (Entity) localContext.PluginExecutionContext.InputParameters[ "Target" ];
                var cogSettingRecord = localContext.OrganizationService.Retrieve( EntityNames.cog_cogsetting, entity.Id, new ColumnSet( true ) );

                if ( cogSettingRecord[ "cog_name" ].ToString( ) != "Populate Email Cases" )
                    return;
                if ( !( bool ) cogSettingRecord[ "cog_flag" ] )
                    return;

                PopulateEmailCasesLogic pecl = new PopulateEmailCasesLogic( localContext.OrganizationService, entity );
                pecl.Initialize();
            }
        }
    }
}

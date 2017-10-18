using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;

namespace Set_Email_Case_Id
{
    public partial class SetEmailCaseId : SetEmailCaseIdBasePlugin
    {
        public SetEmailCaseId(string unsecureConfig, string secureConfig) : base(unsecureConfig, secureConfig)
        {
            // Register for any specific events by instantiating a new instance of the 'PluginEvent' class and registering it
            base.RegisteredEvents.Add(new PluginEvent()
            {
                Stage = eStage.PostOperation,
                MessageName = MessageNames.Create,
                EntityName = EntityNames.email,
                PluginAction = ExecutePluginLogic
            });
            base.RegisteredEvents.Add(new PluginEvent()
            {
                Stage = eStage.PostOperation,
                MessageName = MessageNames.Update,
                EntityName = EntityNames.email,
                PluginAction = ExecutePluginLogic
            });
        }
        public void ExecutePluginLogic(IServiceProvider serviceProvider)
        {
            // Use a 'using' statement to dispose of the service context properly
            // To use a specific early bound entity replace the 'Entity' below with the appropriate class type
            using (var localContext = new LocalPluginContext<Entity>(serviceProvider))
            {
                localContext.TracingService.Trace("start of plugin");
                localContext.TracingService.Trace("DEPTH " + localContext.Depth.ToString());
                if ( localContext.Depth > 1 )
                    return;
                var entity = ( Entity ) localContext.PluginExecutionContext.InputParameters[ "Target" ];

                localContext.TracingService.Trace("PARENT ACTIVITY EXISTS IN SET " + entity.Contains("parentactivityid").ToString());
                if ( !entity.Contains("parentactivityid") )     // this indicates it is responding to an email
                    return;


                localContext.TracingService.Trace("CASE ID EXISTS IN SET " + entity.Contains("cog_caseid").ToString());
                if (entity.Contains("cog_caseid"))               // check to see if case already has a value
                    if ( ( ( EntityReference ) entity[ "cog_caseid" ] ).Id != Guid.Empty )
                        return;

                localContext.TracingService.Trace("REGARDING OBJECT EXISTS IN SET " + entity.Contains("regardingobjectid").ToString());
                if (!entity.Contains("regardingobjectid"))
                    return;
                var regardingRef = ( EntityReference ) entity[ "regardingobjectid" ];

                entity[ "cog_caseid" ] = regardingRef;
                localContext.OrganizationService.Update(entity);
            }
        }
    }
}

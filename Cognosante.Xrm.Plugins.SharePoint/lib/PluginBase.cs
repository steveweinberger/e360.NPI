using System;
using System.Reflection;
using System.Text;
using Microsoft.Xrm.Sdk;

namespace Cognosante.Xrm.Plugins.SharePoint
{
    public class PluginBase : IPlugin
    {
        public string Config = string.Empty;
        public string SecureConfig = string.Empty;
        public IPluginExecutionContext Context { get; private set; }
        public IOrganizationServiceFactory ServiceFactory { get; private set; }
        public IOrganizationService Service { get; set; }
        public ITracingService TracingService { get; set; }

        public PluginBase(string config, string secureConfig)
        {
            this.Config = config;
            this.SecureConfig = secureConfig;
        }

        void IPlugin.Execute(IServiceProvider serviceProvider)
        {
            //  instantiate context and services
            this.TracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            this.Context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            this.ServiceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            this.Service = this.ServiceFactory.CreateOrganizationService(Context.UserId);
            try
            {
                //  run the child class execute method
                this.Execute();
            }
            catch (Exception ex)
            {
                //  log the exception in the tracing services, then re-throw
                this.Log(MethodInfo.GetCurrentMethod().Name, ex.Message);
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }

        /// <summary>
        /// Log execution data
        /// </summary>
        /// <param name="currentMethod"></param>
        /// <param name="message"></param>
        void Log(string currentMethod, string message)
        {
            this.TracingService.Trace(string.Format("{0}: {1}", currentMethod, message));
        }

        /// <summary>
        /// Child classes should override the Execute() method.
        /// </summary>
        public virtual void Execute()
        { }

    }
}

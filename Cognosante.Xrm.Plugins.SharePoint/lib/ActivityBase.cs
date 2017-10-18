using System;
using System.Activities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;

namespace Cognosante.Xrm.Plugins.SharePoint
{
    public class ActivityBase : CodeActivity
    {
        public ITracingService TracingService { get; set; }
        public IWorkflowContext Context { get; set; }
        public IOrganizationServiceFactory ServiceFactory { get; set; }
        public IOrganizationService Service { get; set; }

        protected override void Execute(CodeActivityContext executionContext)
        {
            //  instantiate context and services
            this.TracingService = executionContext.GetExtension<ITracingService>();
            this.Context = executionContext.GetExtension<IWorkflowContext>();
            this.ServiceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            this.Service = this.ServiceFactory.CreateOrganizationService(this.Context.UserId);
            try
            {
                //  run child execute
                this.Execute();
            }
            catch (Exception ex)
            {
                //  log the exception in the tracing services, then re-throw
                this.TracingService.Trace(ex.Message);
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }

        /// <summary>
        /// Child classes should override the Execute() method.
        /// </summary>
        public virtual void Execute()
        { }
    }
}

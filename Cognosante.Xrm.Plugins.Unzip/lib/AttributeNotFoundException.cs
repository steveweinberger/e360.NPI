using System;
using Microsoft.Xrm.Sdk;

namespace Cognosante.Xrm.Plugins.Unzip
{
    /// <summary>
    /// Custom Exception for better reporting issues where entity does not contain an attribute
    /// </summary>
    public class AttributeNotFoundException : Exception
    {
        private string entityName = String.Empty;
        private string attributeName = string.Empty;

        public AttributeNotFoundException(Entity e, string attribute)
        {
            this.entityName = e.LogicalName;
            this.attributeName = attribute;
            this.Data.Add("EntityData", e);
        }

        public override string Message
        {
            get
            {
                return string.Format("Entity {0} does not contain attribute '{1}'", this.entityName, this.attributeName);
            }
        }

    }
}

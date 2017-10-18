using System;
using Microsoft.Xrm.Sdk;

namespace Cognosante.Xrm.Plugins.SharePoint
{
    public static class Extensions
    {

        #region SetOperations

        /// <summary>
        /// Set the value of a lookup field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <param name="id"></param>
        /// <param name="entityname"></param>
        public static void SetLookup(this Entity e, string attribute, Guid id, string entityname)
        {
            e.Attributes.Add(attribute, new EntityReference(entityname, id));
        }

        /// <summary>
        /// Set the value of an optionset field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <param name="val"></param>
        public static void SetOptionSetValue(this Entity e, string attribute, int val)
        {
            e.Attributes.Add(attribute, new OptionSetValue(val));
        }

        /// <summary>
        /// set the value of a money field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <param name="val"></param>
        public static void SetMoney(this Entity e, string attribute, decimal val)
        {
            e.Attributes.Add(attribute, new Money(val));
        }

        /// <summary>
        /// Set the value of a string field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <param name="val"></param>
        public static void SetString(this Entity e, string attribute, string val)
        {
            e.Attributes.Add(attribute, val);
        }

        #endregion

        #region GetOperations

        /// <summary>
        /// Get the integer value of an optionset field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static int GetOptionSetValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return ((OptionSetValue)e[attribute]).Value;
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        /// <summary>
        /// Get the decimal value of a Money field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static decimal GetMoneyValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return ((Money)e[attribute]).Value;
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        /// <summary>
        /// Get the Guid/ID value of a Lookup/EntityReference field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static Guid GetLookupGuidValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return ((EntityReference)e[attribute]).Id;
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        /// <summary>
        /// Get the Name value of the Lookup/EntityReference field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static string GetLookupNameValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return ((EntityReference)e[attribute]).Name;
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        /// <summary>
        /// Get the value of a string field
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static string GetStringValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return (string)e[attribute];
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        /// <summary>
        /// Get value of integer field (Whole Number)
        /// </summary>
        /// <param name="e"></param>
        /// <param name="attribute"></param>
        /// <returns></returns>
        public static int GetIntegerValue(this Entity e, string attribute)
        {
            if (e.Contains(attribute))
            {
                return (int)e[attribute];
            }
            else
            {
                throw new AttributeNotFoundException(e, attribute);
            }
        }

        #endregion

    }

}

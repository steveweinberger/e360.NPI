using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Cognosante.Xrm.Plugins.SharePoint
{
    static class Queries
    {

        /// <summary>
        /// Create basic Query
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="cols"></param>
        /// <param name="attribute"></param>
        /// <param name="condition"></param>
        /// <param name="val"></param>
        /// <returns></returns>
        public static QueryExpression CreateQuery(string entity, ColumnSet cols, string attribute, ConditionOperator condition, object val)
        {
            QueryExpression qry = new QueryExpression(entity)
            {
                ColumnSet = cols
            };
            qry.Criteria.AddCondition(attribute, condition, val);
            return qry;
        }
    }
}

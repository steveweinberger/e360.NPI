using System;
using System.Text;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Cognosante.Xrm.Plugins.Unzip
{

    static class Settings
    {

        public static string SettingsEntity = "cog_cogsetting";
        public static string SettingsNameField = "cog_name";
        public static string StringValueField = "cog_stringvalue";
        public static string IntValueField = "cog_integervalue";
        public static string TextValueField = "cog_textvalue";

        /// <summary>
        /// Get Setting record
        /// </summary>
        /// <param name="service"></param>
        /// <param name="settingName"></param>
        /// <returns></returns>
        public static Setting GetSettingRecord(IOrganizationService service, string settingName)
        {
            EntityCollection s = service.RetrieveMultiple(Queries.CreateQuery(SettingsEntity, new ColumnSet(true), SettingsNameField, ConditionOperator.Equal, settingName));
            if (s.Entities.Count == 0)
            {
                throw new Exception(String.Format("Setting {0} not found.", settingName));
            }
            return new Setting(s[0]);
        }

        /// <summary>
        /// Get setting record
        /// </summary>
        /// <param name="service"></param>
        /// <param name="settingId"></param>
        /// <returns></returns>
        public static Setting GetSettingRecord(IOrganizationService service, Guid settingId)
        {
            return new Setting(service.Retrieve(SettingsEntity, settingId, new ColumnSet(true)));
        }
    }

    /// <summary>
    /// Custom class based on Entity
    /// </summary>
    class Setting : Entity
    {
        Entity _entity = null;

        public Setting(Entity e)
        {
            this._entity = e;
        }
        /// <summary>
        /// Get value of a string setting.
        /// </summary>
        /// <param name="service"></param>
        /// <param name="settingName"></param>
        /// <returns></returns>
        public string GetStringSetting()
        {
            return this._entity.GetStringValue(Settings.StringValueField);
        }

        /// <summary>
        /// Get value of an integer setting
        /// </summary>
        /// <param name="service"></param>
        /// <param name="settingName"></param>
        /// <returns></returns>
        public int GetIntegerSetting()
        {
            return this._entity.GetIntegerValue(Settings.IntValueField);
        }

        /// <summary>
        /// Get value of a text setting
        /// </summary>
        /// <param name="service"></param>
        /// <param name="settingName"></param>
        /// <returns></returns>
        public string GetTextSetting()
        {
            return this._entity.GetStringValue(Settings.TextValueField);
        }

        /// <summary>
        /// set integer setting field value
        /// </summary>
        /// <param name="val"></param>
        public void SetIntegerSetting(int val)
        {
            this._entity[Settings.IntValueField] = val;
        }

        /// <summary>
        /// set string setting field value
        /// </summary>
        /// <param name="val"></param>
        public void SetStringSetting(string val)
        {
            this._entity[Settings.StringValueField] = val;
        }

        public void SetTextSetting(string val)
        {
            this._entity[Settings.TextValueField] = val;
        }

        /// <summary>
        /// Save setting record
        /// </summary>
        /// <param name="service"></param>
        public void SaveSetting(IOrganizationService service)
        {
            service.Update(this._entity);
        }

    }
}

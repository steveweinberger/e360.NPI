using System;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace _LOCAL__NPI_DEV_Plugins
{
    public class AutoNumber
    {
        private readonly Entity _Entity;
        private readonly IOrganizationService _OrgService;
        private Entity _CogAutoNumber;
        private int _Number;
        private int _Time;

        public AutoNumber( IOrganizationService orgService,
                           Entity entity )
        {
            _OrgService = orgService;
            _Entity = entity;
        }

        public void TriggerAutoNumber( )
        {
            //RetrieveCogSettingRecord( );
            //SetCogSettingRecordDetails( );

            var customerId = RetrieveAccountForCustomer( );
            var id = CreateOOBCase( customerId );
            var autoNumber = RetrieveOOBCaseNumber( id );
            if ( _Entity.LogicalName.ToLower( ) == "cog_case" )
                SetAutoNumberToEsanteCase( autoNumber );
            else
            {
                RetrieveCogSettingRecord();
                SetCogSettingRecordDetails();
            }
        }

        public Guid CreateOOBCase( Guid customerId )
        {
            var entity = new Entity( "incident" );
            entity[ "title" ] = "To Be Deleted";
            var entRef = new EntityReference( "account", customerId );
            entity[ "customerid" ] = entRef;
            return _OrgService.Create( entity );
        }

        public string RetrieveOOBCaseNumber( Guid id )
        {
            var entity = _OrgService.Retrieve( "incident", id, new ColumnSet( "ticketnumber" ) );
            return entity[ "ticketnumber" ].ToString( );
        }

        public void SetAutoNumberToEsanteCase( string autoNumber )
        {
            _Entity[ "cog_number" ] = autoNumber;
            _Entity[ "cog_name" ] = autoNumber;
            _OrgService.Update( _Entity );
        }

        public void SetAutoNumberToEFI( string autoNumber )
        {
            _Entity[ "subject" ] = _Number.ToString( );
            _OrgService.Update( _Entity );
        }

        public Guid RetrieveAccountForCustomer( )
        {
            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                           "<entity name='account'>" +
                           "<attribute name='name' />" +
                           "<attribute name='primarycontactid' />" +
                           "<attribute name='telephone1' />" +
                           "<attribute name='accountid' />" +
                           "<order attribute='name' descending='false' />" +
                           "<filter type='and'>" +
                           "<condition attribute='name' operator='eq' value='Dummy Account' />" +
                           "</filter>" +
                           "</entity>" +
                           "</fetch>";

            var entities = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );
            return entities[ 0 ].Id;
        }


        // --- OLD CODE

        public void SetAutoNumber( )
        {
            if ( _Entity[ "cog_name" ].ToString( ) != "Cog Auto Number" )
                return;
            IncrementCogSettingRecord( );
            SetNumberToEntity( ); // put number in seperate entity "number assignment" 
            WaitRandomTime( );
            while ( RetrieveEntitiesByCaseNumber( ) )
            {
                WaitRandomTime( );
                RetrieveCogSettingRecord( );
                IncrementCogSettingRecord( );
                SetNumberToEntity( );
            }

            //TODO
            // add wait script (randomize the miliseconds)
            // retrievemultiple entity (case) or whatever string value is where case # = number
            // if entity is more than 1 wait and retry
            // when good to go retrieve setting record again and set new case number and increment
        }

        private void WaitRandomTime( )
        {
            var randomNumber = new Random( );
            var randomInteger = randomNumber.Next( 0, 1500 );
            _Time = _Time + randomInteger;
            //Thread.Sleep( randomInteger );
            Task.Delay( randomInteger );
        }

        private void RetrieveCogSettingRecord( )
        {
            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                           "<entity name='cog_cogsetting'>" +
                           "<attribute name='cog_cogsettingid' />" +
                           "<attribute name='cog_name' />" +
                           "<attribute name='cog_integervalue' />" +
                           "<attribute name='cog_stringvalue' />" +
                           "<attribute name='cog_textvalue' />" +
                           "<order attribute='cog_name' descending='false' />" +
                           "<filter type='and'>" +
                           "<condition attribute='cog_name' operator='eq' value='Cog Auto Number' />" +
                           "</filter>" +
                           "</entity>" +
                           "</fetch>";

            var entCol = _OrgService.RetrieveMultiple( new FetchExpression( fetchXml ) );

            if ( entCol.Entities.Count == 0 )
                throw new Exception( "No record for Cog Auto Number exists in Settings" );

            _CogAutoNumber = entCol[ 0 ];
        }

        private void SetCogSettingRecordDetails( )
        {
            _CogAutoNumber[ "cog_stringvalue" ] = _Entity.LogicalName;
            _CogAutoNumber[ "cog_textvalue" ] = _Entity.Id.ToString( );

            _OrgService.Update( _CogAutoNumber );
        }

        private void IncrementCogSettingRecord( )
        {
            _Number = ( int ) _Entity[ "cog_integervalue" ];
            _Number = _Number + 1;
            _Entity[ "cog_integervalue" ] = _Number;
            _OrgService.Update( _Entity );
        }

        private void SetNumberToEntity( )
        {
            var entity = new Entity( _Entity[ "cog_stringvalue" ].ToString( ) );
            entity.Id = new Guid( _Entity[ "cog_textvalue" ].ToString( ) );

            switch ( _Entity[ "cog_stringvalue" ].ToString( ) )
            {
                case "cog_applicationticket":
                    entity[ "cog_number" ] = _Number.ToString( );
                    entity[ "subject" ] = _Number.ToString( );
                    break;
                case "cog_efi":
                    entity[ "subject" ] = _Number.ToString( );
                    break;
                default:
                    entity[ "cog_number" ] = _Number.ToString( );
                    entity[ "cog_name" ] = _Number.ToString( );
                    break;
            }
            _OrgService.Update( entity );
        }

        private bool RetrieveEntitiesByCaseNumber( )
        {
            //if ( _Time > 15000 )
            //    return false;
            var qba = new QueryByAttribute( _Entity[ "cog_stringvalue" ].ToString( ) );
            switch ( _Entity[ "cog_stringvalue" ].ToString( ) )
            {
                case "cog_applicationticket":
                    qba.ColumnSet = new ColumnSet( "cog_number" );
                    qba.Attributes.AddRange( "cog_number" );
                    break;
                case "cog_efi":
                    qba.ColumnSet = new ColumnSet( "subject" );
                    qba.Attributes.AddRange( "subject" );
                    break;
                default:
                    qba.ColumnSet = new ColumnSet( "cog_number" );
                    qba.Attributes.AddRange( "cog_number" );
                    break;
            }
            qba.Values.Add( _Number.ToString( ) );
            var ec = _OrgService.RetrieveMultiple( qba );

            if ( ec.Entities.Count > 1 )
                return true;
            return false;
        }
    }
}
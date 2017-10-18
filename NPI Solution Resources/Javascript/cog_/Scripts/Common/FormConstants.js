if (typeof(FormScripts) == "undefined") {
    FormScripts = {
        __namespace: true
    };
}

FormScripts.CommonConstants = {
    FORM_TYPE: {
        UNDEFINED: 0,

        CREATE: 1,
        EDIT: 2,
        READ_ONLY: 3,
        DISABLED: 4,
        QUICK_CREATE: 5,
        BULK_EDIT: 6
    },
    FORM_STATUS: {
        /* statuscode/status reason */
        Open: 1,
        Inactive: 2
        /* Add more status entries  from all the  forms on the solution */
    },
    SECTION_STATUS: {
        OPEN: '1',
        COMPLETED_DID_TRIGGERED: '2',
        COMPLETED_DID_NOT_TRIGGERED: '3',
        COMPLETED: '4',
        PARTIALLYCOMPLETED: '5',
        COMPLETED_DID_TRIGGERED_WITHOUTDDQ: '6'
    },
    OPTION_SET_VALUE: {
        OTHER: 100100999
        /* Add  more as needed */
    }
};
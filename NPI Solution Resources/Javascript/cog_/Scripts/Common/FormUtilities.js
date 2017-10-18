if (typeof(FormScripts) == "undefined") {
    FormScripts = {
        __namespace: true
    };
}

FormScripts.FormUtilities = {
    //************ Actions on Fields *********************************
    AreRequiredFieldsValid: function (requiredFields) {
        var fieldName = '';
        var errorMsg = '';
        var fieldsAreValid = true;
        for (var indx = 0; indx < requiredFields.AllFields.length; indx++) {
            fieldName = requiredFields.AllFields[indx].field;

            if (Xrm.Page.getAttribute(fieldName).getRequiredLevel() && Xrm.Page.getAttribute(fieldName).getRequiredLevel() == "required") {
                if (Xrm.Page.getAttribute(fieldName).getValue() == null) {
                    fieldsAreValid = false;
                    Xrm.Page.getControl(fieldName).setFocus();
                    errorMsg = 'You must provide a value for ' + requiredFields.AllFields[indx].errorMsg;
                    alert(errorMsg);
                    break;
                }
            }
        }
        return fieldsAreValid;
    },

    CleanFollowingFields: function () {
        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            Xrm.Page.getAttribute(field).setValue(null);
        }
    },

    DisableAllFormFields: function (onOff) {
        for (i = 0; i < Xrm.Page.ui.controls.getLength(); i++) {
            var o = Xrm.Page.getControl(i);
            if ((o.getControlType() == "standard" || o.getControlType() == "lookup" || o.getControlType() == "optionset") && o.getName() != "notescontrol") {
                if (typeof(o.getAttribute().getRequiredLevel()) != "undefined" && typeof(o.getDisabled()) != "undefined") {
                    o.setDisabled(onOff);
                }
            }
        }
    },

    DisableDirtyFields: function () {
        var dirtyFields;
        for (var i = 0; i < Xrm.Page.data.entity.attributes.getLength(); i++) {
            if (Xrm.Page.getAttribute(i).getIsDirty()) {
                Xrm.Page.getControl(i).setDisabled(true);
                Xrm.Page.getAttribute(i).setSubmitMode("never");
            }
        }
    },

    DisableFollowingFields: function () {
        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            Xrm.Page.getControl(field).setDisabled(true);
        }
    },

    EnableFollowingFields: function () {
        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            Xrm.Page.getControl(field).setDisabled(false);
        }
    },

    ForceFieldsToSubmit: function () {
        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            if (field || Xrm.Page.getControl(field)) {
                Xrm.Page.getAttribute(field).setSubmitMode("always");
            }
        }
    },

    HideNavLink: function (navLinkName) {
        var objNavItem = Xrm.Page.ui.navigation.items.get(navLinkName);
        objNavItem.setVisible(false);
    },

    HideRow: function (attributeName) {
        var labelNode = document.getElementById(attributeName + '_c');
        if (labelNode) {
            labelNode.parentNode.style.display = "none";
        }
    },

    IsLookupFieldValid: function (frmLookupObj, errorMsg) {
        var isValidSection = true;
        if (this.ReadLookupFieldId(frmLookupObj).length == 0) {
            alert(errorMsg);
            isValidSection = false;
        }
        return isValidSection;
    },

    MakeTheFollowingFieldsNotRequired: function (attributesList) {
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var field = Xrm.Page.getAttribute(attributesArray[i]);
            field.setRequiredLevel("none");
        }
    },

    MakeTheFollowingFieldsRecommended: function (attributesList) {
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var field = Xrm.Page.getAttribute(attributesArray[i]);
            field.setRequiredLevel("recommended");
        }
    },

    MakeTheFollowingFieldsRequired: function (attributesList) { // LL Fixed on 5/8/2012
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var field = Xrm.Page.getAttribute(attributesArray[i]);
            try {
                field.setRequiredLevel("required");
            }
            catch(e) {}
        }
    },
    MakeTheFollowingFieldsNull: function (attributesList) { // LL Addd on 4/3/2012
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var field = Xrm.Page.getAttribute(attributesArray[i]);
            field.setValue(null);
        }
    },

    PicklistContainsOption: function (picklistname, datavalue) {
        var pklist = document.getElementById(picklistname);
        var len = pklist.children.length;
        for (var i = 0; i < len; i++) {
            var option = pklist.children[i];
            if (option.value == datavalue.toString()) return true;
        }
        return false;
    },

    ReadAllFormFields: function () {
        var allFields = '';
        for (i = 0; i < Xrm.Page.data.entity.attributes.getLength(); i++) {
            var oAtt = Xrm.Page.getAttribute(i);
            var oCtl = Xrm.Page.getControl(oAtt.getName());
            if (typeof(oAtt.getRequiredLevel()) != "undefined" && typeof(oCtl.getDisabled()) != "undefined") {
                allFields += oAtt.getName() + ',';
            }
        }
        if (allFields.length > 0) allFields = allFields.substring(0, allFields.length - 1);
        return allFields;
    },

    ReorderPicklist: function (picklistname) {
        var field = Xrm.Page.getControl(picklistname);
        var selectedDv = Xrm.Page.getAttribute(picklistname).getValue();
        var optArr = document.getElementById(picklistname).children;

        var minValue, len = optArr.length;
        for (var j = 1; j < len - 1; j++) {
            minValue = parseInt(optArr[j].value);
            for (var i = j + 1; i < len; i++) {
                if (minValue > parseInt(optArr[i].value)) {
                    minValue = parseInt(optArr[i].value);
                }
            }
            field.removeOption(minValue);
            field.addOption(field.getAttribute().getOption(minValue), j);
        }
        Xrm.Page.getAttribute(picklistname).setValue(selectedDv);
    },

    //ShowHideAttribute
    //  Show or Hide attributeName based on isVisible
    //Parameter: attributeName
    //  The name fo the attribute to show/hide
    //Parameter: isVisible
    //  If isVisible is TRUE, show attribute
    //  Otherwise, hide attribute
    ShowHideAttributes: function (attributesList, isVisible) {
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var fieldName = attributesArray[i];
            var ctrl = Xrm.Page.ui.controls.get(fieldName);
            if (ctrl != null) //LL-060212 Filterout controls not  found
            ctrl.setVisible(isVisible);
            //}
        }

    },

    //************ Events *********************************
    CancelSaveOperation: function (executionContextObj) {
        executionContextObj.getEventArgs().preventDefault();
    },

    InitializeReadOnlyFieldBasedOnBit: function (objSource, objTarget, setRequiredLevel, useNegValue) {
        var setDisabledStatus = false;
        var setRequiredLevelStatus = "required";

        if (document.getElementById(objSource).className == "ms-crm-RadioButton") {
            if (!Xrm.Page.getAttribute(objSource).getValue()) {
                setDisabledStatus = true;
                setRequiredLevelStatus = "none";
            }
        }
        else { //Checkbox
            if (!document.getElementById(objSource).checked) {
                setDisabledStatus = true;
                setRequiredLevelStatus = "none";
            }
        }
        if (useNegValue) {
            setDisabledStatus = !setDisabledStatus;
        }
        var objTargetArray = objTarget.split(",");
        for (var indx = 0; indx < objTargetArray.length; indx++) {
            var field = objTargetArray[indx];
            if (field) {
                if (setDisabledStatus) Xrm.Page.getAttribute(field).setValue(null);
                Xrm.Page.getControl(field).setDisabled(setDisabledStatus);
                if (setRequiredLevel != null) Xrm.Page.getAttribute(field).setRequiredLevel(setRequiredLevelStatus);
            }
        }
    },

    InitializeReadOnlyFieldBasedOnBitSet: function (objSourceSet, objTarget, setRequiredLevel, useNegValue) {
        var setDisabledStatus = true;
        var setRequiredLevelStatus = "none";

        var objSourceArray = objSourceSet.split(",");
        for (var indx = 0; indx < objSourceArray.length; indx++) {
            var field = objSourceArray[indx];
            if (field) {
                if (document.getElementById(field).className == "ms-crm-RadioButton") {
                    if (Xrm.Page.getAttribute(field).getValue()) {
                        setDisabledStatus = false;
                        setRequiredLevelStatus = "required";
                    }
                }
                else { //Checkbox
                    if (document.getElementById(field).checked) {
                        setDisabledStatus = false;
                        setRequiredLevelStatus = "required";
                    }
                }
            }
        }
        if (useNegValue) {
            setDisabledStatus = !setDisabledStatus;
        }
        var objTargetArray = objTarget.split(",");
        for (var indx = 0; indx < objTargetArray.length; indx++) {
            var field = objTargetArray[indx];
            if (field) {
                if (setDisabledStatus) Xrm.Page.getAttribute(field).setValue(null);
                Xrm.Page.getControl(field).setDisabled(setDisabledStatus);
                if (setRequiredLevel != null) Xrm.Page.getAttribute(field).setRequiredLevel(setRequiredLevelStatus);
            }
        }
    },

    InitializeReadOnlyFieldBasedOnPickList: function (lookupValue, objSource, objTarget, setRequiredLevel) {
        var itemId = 0;
        var itemDesc = "";
        var setDisabledStatus = true;
        var setRequiredLevelStatus = "none";

        var objTargetArray = objTarget.split(",");
        if (Xrm.Page.getAttribute(objSource).getText().length > 0) {
            itemId = parseInt(Xrm.Page.getAttribute(objSource).getValue(), 10)
            itemDesc = Xrm.Page.getAttribute(objSource).getText();

            if (!this.isNullOrEmpty(lookupValue)) {
                if (parseInt(lookupValue, 10) == itemId) {
                    setDisabledStatus = false
                    setRequiredLevelStatus = "required";
                }
                else {
                    setDisabledStatus = true
                    setRequiredLevelStatus = "none";
                }
            }
            else {
                if (itemDesc.toLowerCase() == "other") {
                    setDisabledStatus = false
                    setRequiredLevelStatus = "required";
                }
                else {
                    setDisabledStatus = true
                    setRequiredLevelStatus = "none";
                }
            }
        }
        for (var indx = 0; indx < objTargetArray.length; indx++) {
            var field = objTargetArray[indx];
            if (field) {
                if (setDisabledStatus) Xrm.Page.getAttribute(field).setValue(null);
                Xrm.Page.getControl(field).setDisabled(setDisabledStatus);
                if (setRequiredLevel != null) Xrm.Page.getAttribute(field).setRequiredLevel(setRequiredLevelStatus);
            }
        }
    },

    //************ Read Fields *****************************
    FieldsAreDirty: function () {
        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            if (field && field.getIsDirty()) return true;

        }
        return false;
    },

    GetElementsByClass: function (node, searchClass, tag) {
        var classElements = [];
        if (node) {
            var els = node.getElementsByTagName(tag);
            var elsLen = els.length;
            for (i = 0, j = 0; i < elsLen; i++) {
                if (els[i].className.indexOf(searchClass) >= 0) {
                    classElements[j] = els[i];
                    j++;
                }
            }
        }
        return classElements;
    },

    ReadLookupFieldId: function (frmLookupObj) {
        var lookupField = Array;
        var lookupFieldValue = '';
        lookupField = frmLookupObj.getValue();
        if (lookupField == null) return lookupFieldValue;
        else {
            lookupFieldValue = lookupField[0].id;
            lookupFieldValue = lookupFieldValue.replace(/{/, '');
            lookupFieldValue = lookupFieldValue.replace(/}/, '');
        }

        return lookupFieldValue;
    },

    ReadLookupFieldTextVaue: function (frmLookupObj) {
        var lookupField = Array;
        var lookupFieldName = '';
        lookupField = frmLookupObj.getValue();
        if (lookupField == null) return lookupFieldName;
        else {
            lookupFieldName = lookupField[0].name;
            lookupFieldName = lookupFieldName.replace(/{/, '');
            lookupFieldName = lookupFieldName.replace(/}/, '');
        }
        return lookupFieldName;
    },

    ReadPickListDisplayValue: function (frmLookupObj) {
        var fieldValue = "";
        if (frmLookupObj.getText().length > 0) fieldValue = frmLookupObj.getText();
        return fieldValue;
    },
    //LL- -> Fixed default value,  since 0 could be a  valid  value, the default  will be  negative
    ReadPickListIdValue: function (frmLookupObj) {
        var fieldValue = -999;
        if (frmLookupObj.getText().length > 0) fieldValue = parseInt(frmLookupObj.getValue(), 10);
        return fieldValue;
    },

    ReadTextFieldValue: function (fieldName) {
        var fieldValue = "";
        if (Xrm.Page.getAttribute(fieldName).getValue() != null) fieldValue = Xrm.Page.getAttribute(fieldName).getValue().toString();

        return fieldValue;
    },

    //************ Set Fields *****************************
    SetDateField: function (attributeName, attributeValue) {
        var dateValue = null;
        var dateObj = Xrm.Page.data.entity.attributes.get(attributeName);
        if (attributeValue == null || attributeName == 'undefined' || attributeValue.length === 0) dateValue = new Date();
        else dateValue = new Date(attributeValue);
        dateObj.setValue(dateValue);
    },

    SetOptionSetField: function (attributeName, attributeValue) {
        var optionSetObj = Xrm.Page.data.entity.attributes.get(attributeName);
        optionSetObj.setValue(attributeValue);
    },

    // Set the value of a lookup field
    SetLookupValue: function (fieldName, id, name, entityType) {
        if (fieldName != null) {
            var lookupValue = new Array();
            lookupValue[0] = new Object();
            lookupValue[0].id = id;
            lookupValue[0].name = name;
            lookupValue[0].entityType = entityType;
            Xrm.Page.getAttribute(fieldName).setValue(lookupValue);
        }
    },

    //************ Validation *****************************
    IsNotNullEmptyOrUndefined: function (obj) {
        if (jQuery.isEmptyObject(obj) || obj === 'undefined' || obj.length === 0) {
            return false;
        }
        return true;
    },

    ValidateDateField: function (frmLookupObj, allowFuture, errMsg) {
        var isValidField = true;
        if (!eval(allowFuture)) {
            var dobDate = this.ReadTextFieldValue(frmLookupObj);
            if (dobDate.length > 0) {
                var oToday = new Date();
                var oDOB = Date.parse(dobDate);
                if (oDOB > oToday) {
                    alert(errMsg);
                    frmLookupObj.setValue(null);
                    Xrm.Page.getControl(frmLookupObj.getName()).setFocus();
                    isValidField = false;
                }
            }
        }
        return isValidField;
    },

    // VERIFY END DATE OCCURS AFTER BEGIN DATE
    ValidateEndDate: function (beginLookupObj, endLookupObj) {
        var isValidField = true;
        var beginDate = this.ReadTextFieldValue(beginLookupObj);
        var endDate = this.ReadTextFieldValue(endLookupObj);
        if (beginDate.length <= 0 && endDate.length > 0) {
            alert("Must specify begin date before specifying end date");
            endLookupObj.setValue(null);
            Xrm.Page.getControl(beginLookupObj.getName()).setFocus();
            isValidField = false;
        }
        else if (endDate.length > 0) {
            var oBegin = Date.parse(beginDate);
            var oEnd = Date.parse(endDate);
            if (oBegin > oEnd) {
                alert("End date cannot occur before begin date");
                endLookupObj.setValue(null);
                Xrm.Page.getControl(endLookupObj.getName()).setFocus();
                isValidField = false;
            }
        }
        return isValidField;
    },

    ValidateLookUpField: function (frmLookupObj, errMsg) {
        var isValidField = true;
        if (this.ReadLookupFieldId(frmLookupObj).length == 0) {
            alert(errMsg);
            frmLookupObj.setFocus();
            isValidField = false;
        }
        return isValidField;
    },

    ValidatePickListField: function (frmLookupObj, errMsg) {
        var isValidField = true;
        if (this.ReadPickListDisplayValue(frmLookupObj).length == 0) {
            alert(errMsg);
            frmLookupObj.setFocus();
            isValidField = false;
        }
        return isValidField;
    },

    ValidateTextField: function (frmTxtObj, errMsg) {
        var isValidField = true;
        if (this.ReadTextFieldValue(frmTxtObj).length == 0) {
            if (errMsg.length > 0) alert(errMsg);
            Xrm.Page.getControl(frmTxtObj.getName()).setFocus();
            isValidField = false;
        }
        else {
            if (frmTxtObj.getAttributeType() == "money" || frmTxtObj.getAttributeType() == "decimal" || frmTxtObj.getAttributeType() == "integer" || frmTxtObj.getAttributeType() == "double") {
                var fieldValue = this.ReadTextFieldValue(frmTxtObj);
                if (fieldValue.length > frmTxtObj.getMax()) {
                    isValidField = false;
                    alert('The length of the data entered exceeds the maximun length allowed for this field.');
                }
            }
        }
        return isValidField;
    },

    //************* Sections *************************
    DisableSection: function (firstAttributeInSection) {
        var nodeInSection = Xrm.Page.getControl(firstAttributeInSection);
        var section = nodeInSection.getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) {
                control.setDisabled(true);
            }
        });
    },

    DisplaySection: function (attributeName) {
        var labelNode = Xrm.Page.getControl(attributeName).getParent();
        if (labelNode) {
            labelNode.setVisible(true);
        }
    },

    EnableSection: function (firstAttributeInSection) {
        var nodeInSection = Xrm.Page.getControl(firstAttributeInSection);
        var section = nodeInSection.getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) {
                control.setDisabled(false);
            }
        });
    },

    HideSection: function (attributeName) {
        var labelNode = Xrm.Page.getControl(attributeName);
        if (labelNode) labelNode.getParent().setVisible(false);
    },
    MakeFieldsInSectionRequired: function (andAttributeInSection) {
        var nodeInSection = Xrm.Page.getControl(andAttributeInSection);
        var section = nodeInSection.getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) { //LL-052510 Added conditional to filterout webresources
                if (control.getControlType() !== "webresource") { // LL_060212 //Fixed bug
                    if (control.getAttribute().getRequiredLevel() != "required") control.getAttribute().setRequiredLevel("required");

                    control.getAttribute().setSubmitMode("always");
                }
            }
        });
    },

    MakeFieldsInSectionNotRequired: function (andAttributeInSection) {
        var nodeInSection = Xrm.Page.getControl(andAttributeInSection);
        var section = nodeInSection.getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) { //LL-052510 Added conditional to filterout webresources
                if (control.getControlType() !== "webresource") { // LL_060212 //Fixed bug
                    if (control.getAttribute().getRequiredLevel() != "none") control.getAttribute().setRequiredLevel("none");
                }
            }
        });
    },
    //LL Added 5_15_12
    MakeFieldsInSectionVisibleExceptList: function (anAttributeInSection, expectionList) {
        var nodeInSection = Xrm.Page.getControl(anAttributeInSection);
        var section = nodeInSection.getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) {
                control.setVisible(true);
            }
        });
        if (expectionList != null && expectionList.length > 0) this.ShowHideAttributes(expectionList, false);
    },
    NullAndDisableSection: function (firstAttributeInSection, restoreRadioBtnsToDefaults) {

        //If second parameter is null or false, resets radio buttons to null.  If true, sets to default value (usually false)
        var nodeInSection = Xrm.Page.getControl(firstAttributeInSection);
        var section = nodeInSection.getParent();

        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent() === section) {

                if (!document.FormSolution.formUtility.isNullOrEmpty(restoreRadioBtnsToDefaults) && restoreRadioBtnsToDefaults == true) {
                    if (control.getControlType() == "standard" && control.getAttribute().getAttributeType() == "boolean") {
                        control.getAttribute().setValue(control.getAttribute().getInitialValue());
                    }
                    else control.getAttribute().setValue(null);
                }
                else {
                    control.getAttribute().setValue(null);
                }

                control.setDisabled(true);
                control.getAttribute().setRequiredLevel("none");
                control.getAttribute().setSubmitMode("always");
            }
        });
    },

    //************* TABS **************
    //Returns the zero-based index of the tab the user is currently on.
    FindActiveTab: function () {
        var foundTabIndex = null;
        var tabBar = document.getElementById("crmTabBar");
        if (tabBar) {
            var tabs = tabBar.childNodes;
            for (var i = 0, len = tabs.length; i < len; i++) {
                var currentTab = tabs[i];
                if (currentTab.className == "ms-crm-Tab ms-crm-Tab-Selected") {
                    foundTabIndex = i;
                    break;;
                }
            }
        }
        return foundTabIndex;
    },

    HideTab: function (tabName) {
        Xrm.Page.ui.tabs.get(tabName).setVisible(false);
    },
    ShowTab: function (tabName) {
        Xrm.Page.ui.tabs.get(tabName).setVisible(true);
    },
    //LL- Added
    ExpanTab: function (tabName) {
        var objTab = Xrm.Page.ui.tabs.get(tabName);
        objTab.setDisplayState("expanded");
    },
    //LL- Added
    CollapseTab: function (tabName) {
        var objTab = Xrm.Page.ui.tabs.get(tabName);
        objTab.setDisplayState("collapsed");
    },
    //LL- Added		
    ToggleTabSections: function (tabName, sectionIsVisible) {
        var objTab = Xrm.Page.ui.tabs.get(tabName);
        tab.sections.forEach(function (section, index) {

            if (section.getName() == sectionName) {
                section.setVisible(sectionIsVisible);
            }
        });
    },
    //ADDED LL-090512
    EnableDisableFieldsInTab: function (firstAttributeInSection, disable) { //LL-090512
        var nodeInSection = Xrm.Page.getControl(firstAttributeInSection);
        var tab = nodeInSection.getParent().getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent().getParent() === tab) {
                control.setDisabled(disable);
            }
        });
    },
    //ADDED LL-090512
    MakeFieldsInTabRequiredOrNotRequired: function (andAttributeInSection, required) {
        var nodeInSection = Xrm.Page.getControl(andAttributeInSection);
        var tab = nodeInSection.getParent().getParent();
        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (control.getParent().getParent() === tab) {
                if (control.getControlType() !== "webresource") {
                    if (required == true) {
                        if (control.getAttribute().getRequiredLevel() != "required") control.getAttribute().setRequiredLevel("required");
                    }
                    else {
                        if (control.getAttribute().getRequiredLevel() != "none") control.getAttribute().setRequiredLevel("none");
                    }
                    control.getAttribute().setSubmitMode("always");
                }
            }
        });
    },
    //ADDED LL-090512
    SetFocusOnTab: function (tabName) {
        var control = Xrm.Page.ui.tabs.get(tabName);
        control.setFocus();
    },

    //************  Windows *************
    OpenRegWin: function (title, width, height, filename) { // Normal popup window
        //LL070710: width and height have  been  resized to standar screen size instead of specific size
        window.open(filename, title, 'directories=no,status=no,scrollbars=yes,resizable=yes,menubar=no,width=' + screen.width + ',height=' + screen.height);
    },

    OpenWin: function (title, width, height, filename) { //Modal Window
        var signatureWindow = window.showModalDialog(filename, Xrm.Page, 'dialogWidth=' + width + ',dialogHeight=' + height);
    },

    //************  Formatting **********
    // Colin Baker (6/5/2012)
    // Function to simplify changing the min max digits
    FormatPhoneWrapper: function (fieldName) {
        this.FormatPhone(Xrm.Page.getAttribute(fieldName), 10, 10);
    },

    FormatPhone: function (phoneObj, minDigits, maxDigits) {
        var PHONE_FORMAT = '###-###-####';
        var EXT_FORMAT = ' x';
        var formattedPhone = '';
        var phone = phoneObj.getValue();
        var origPhone = phoneObj.getValue();
        var proceedToFormat = true;
        phone = phone.replace(/^s+/, '').replace(/s+$/, '');

        if (phone.substring(0, 1) == '+') {
            proceedToFormat = false; // foreign numbers are not formatted
        }
        else {

            phone = phone.replace(/[^\d]/g, ""); // get rid of everything but the numbers

            if (phone.substr(0, 1) == '1') {
                phone = phone.substr(1); // get rid of leading 1's
            }

            if (minDigits && phone.length < minDigits) {
                alert("The provided phone number contains less than " + minDigits + " digits.  Please review the number and ensure that it is correct.");
                proceedToFormat = false;
            }

            if (maxDigits && phone.length > maxDigits) {
                alert("The provided phone number contains more than " + maxDigits + " digits.  Please review the number and ensure that it is correct.");
                proceedToFormat = false;
            }
            if (proceedToFormat) {
                formattedPhone = PHONE_FORMAT;
                if (phone.length >= PHONE_FORMAT.split('#').length) {
                    formattedPhone += EXT_FORMAT;
                }

                for (var i = 0; i < phone.length; i++) {
                    if (formattedPhone.indexOf("#") >= 0) {
                        formattedPhone = formattedPhone.replace(/\#/, phone.charAt(i));
                    }
                    else {
                        formattedPhone += phone.charAt(i);
                    }
                }
            }
            else {
                Xrm.Page.getControl(phoneObj.getName()).setFocus();
                return;
                //event.returnValue = false;
            }
            phoneObj.setValue(formattedPhone);
        }
    },

    FormatSSN: function (ssnObj) {
        var ssn = ssnObj.getValue();
        var ssnFormated = '';
        ssn = ssn.replace(/[^\d]/g, ""); // get rid of everything but the numbers
        if (ssn.length != 9) {
            alert('Social Security Number must contain 9 digits only.');
            //ssnObj.setValue(ssnFormated);
            //Xrm.Page.getControl(ssnObj.getName()).setFocus();
            //event.returnValue = false;
        }
        else {
            ssnFormated = ssn.substr(0, 3) + '-' + ssn.substr(3, 2) + '-' + ssn.substr(5);
            ssnObj.setValue(ssnFormated);
        }
    },

    FormatTime: function (h, m, s) {
        var a_p = "PM";

        if (h < 12) {
            a_p = "AM";
        }
        if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        return h + ":" + m + ":" + s + " " + a_p;
    },

    // Edited by Colin Baker (6/4/2012)
    // Function will only allow zip codes in either the xxxxx or xxxxx-xxxx formats.
    FormatZIP: function (zipObj) {
        // old pattern was /^\d+$/
        var pattern1 = /\d{5}/;
        var pattern2 = /\d{5}-\d{4}/;
        var zip = zipObj.getValue();
        if (zip != null) {
            if (zip.length === 10 ? !pattern2.test(zip) : zip.length === 5 ? !pattern1.test(zip) : true) {
                alert('Zip code format must be either xxxxx or xxxxx-xxxx');
                Xrm.Page.getControl(zipObj.getName()).setFocus();
                zipObj.setValue(null);
                //event.returnValue = false;
            }
        }
    },

    FormatCanadaZip: function (name) {
        var zip = Xrm.Page.getAttribute(name).getValue();
        zip = zip.replace(/\s/g, "");
        var reg = new RegExp("[^a-zA-Z0-9]");
        if (reg.test(zip)) {
            alert('Postal Code format must be either XXX XXX or XXXXXX');
            Xrm.Page.getControl(name).setFocus();
            Xrm.Page.getAttribute(name).setValue(null);
            return;
        }
        if (zip.length == 7 && zip.substring(3, 4) == " ") {
            // we're good
        }
        else if (zip.length == 6) {
            var firstthree = zip.substring(0, 3);
            var lastthree = zip.substring(3, 6);
            Xrm.Page.getAttribute(name).setValue(firstthree + " " + lastthree);
        }
        else {
            alert('Postal Code format must be either XXX XXX or XXXXXX');
            Xrm.Page.getControl(name).setFocus();
            Xrm.Page.getAttribute(name).setValue(null);
        }
    },

    // **********  FORMS  ******************
    CloseForm: function (saveForm) {
        if (!saveForm) {
            this.DisableDirtyFields();
            auto(Xrm.Page.context.getQueryStringParameters().etc);
            parent.window.close();
        }
        else {
            Xrm.Page.data.entity.save("saveandclose");
        }
    },

    RefreshForm: function (saveForm) {
        if (!saveForm) {
            this.DisableDirtyFields();
            auto(Xrm.Page.context.getQueryStringParameters().etc);
            // Remove the # sign in the URL so the form will reload
            var url = window.location.href.replace("#", "");
            window.location.href = url;
        }
        else {
            Xrm.Page.data.entity.save();
        }
    },

    // **********  Buttons  ******************
    HideAllAddExistingButtons: function () {
        var navBar = document.getElementById('crmNavBar');
        var navBarItems = getElementsByClass(navBar, 'ms-crm-Nav-Subarea-Link', 'a');
        for (index in navBarItems) {
            if (navBarItems[index].id.indexOf('nav_') == 0) {
                var area = navBarItems[index].id.substr(4);
                this.HideAreaAddExistingButtons(area);
            }
        }
    },

    HideAreaAddButtons: function (area, name) {
        var navItem = document.getElementById('nav_' + area);
        if (navItem != null) {
            //AJA (2012-04-10) bad function: changed ':' to '='
            navItem.onclick = function () {
                loadArea(area);
                var areaFrame = document.getElementById(area + 'Frame');
                //AJA (2012-04-10) bad function: changed ':' to '='
                areaFrame.onreadystatechange = function () {
                    if (areaFrame.readyState == 'complete') {
                        var menuBar = areaFrame.contentWindow.document.getElementById('mnuBar1');
                        var buttons = getElementsByClass(menuBar, 'ms-crm-Menu', 'li');
                        for (buttonIndex in buttons) {
                            if (buttons[buttonIndex].title.indexOf(name) == 0) {
                                buttons[buttonIndex].style.display = "none"
                            }
                        }
                    }
                }
            }
        }
    },

    HideAreaAddExistingButtons: function (area) {
        var navItem = document.getElementById('nav_' + area);
        if (navItem != null) {
            navItem.onclick = function () {
                loadArea(area);
                var areaFrame = document.getElementById(area + 'Frame');
                areaFrame.onreadystatechange = function () {
                    if (areaFrame.readyState == 'complete') {
                        var menuBar = areaFrame.contentWindow.document.getElementById('mnuBar1');
                        var buttons = getElementsByClass(menuBar, 'ms-crm-Menu', 'li');
                        for (buttonIndex in buttons) {
                            if (buttons[buttonIndex].title.indexOf('Add existing') == 0) {
                                buttons[buttonIndex].style.display = "none"
                            }
                        }
                    }
                }
            }
        }
    },

    // **********  Generic Functions  ******************
    CalculateAge: function (attributeName, death) {
        var calculatedAge = -1;
        if (Xrm.Page.getAttribute(attributeName).getValue() != null) {
            var now = new Date(); //get today's date
            if (typeof death !== "undefined") { // if death parameter passed
                if (Xrm.Page.getAttribute(death).getValue() != null) { // and there is a date of death
                    now = Xrm.Page.getAttribute(death).getValue(); // get the date of death value
                }
            }
            var birthday = Xrm.Page.getAttribute(attributeName).getValue(); //get the dob value
            var diff = now.getMonth() - birthday.getMonth(); //have they had their birthday already this year?
            if (diff > -1) //if they've had a birthday this year
            {
                calculatedAge = now.getFullYear() - birthday.getFullYear();
            }
            else //if they have not had a birthday yet this year
            {
                calculatedAge = now.getFullYear() - birthday.getFullYear() - 1;
            }
        }
        return calculatedAge;
    },
    RemoveValueFromOptionSet: function (attributeName, listOfValues) {
        var control = Xrm.Page.getControl(attributeName);
        var valuesArray = listOfValues.split(",");
        for (var i = 0; i < valuesArray.length; i++) {
            control.removeOption(valuesArray[i]);
        }
    },

    CheckDependentFields: function (fieldsToCheck, fieldsToShow, fieldsToMakeRequired) {
        var checkSize = fieldsToCheck.split(",");
        var isOp = false;
        if (checkSize.length == 1) {
            var attr = Xrm.Page.getAttribute(fieldsToCheck);
            if (attr.getAttributeType() == "optionset") {
                isOp = true;
            }
        }
        if (isOp) {
            if (this.IsOptionSetOther(fieldsToCheck)) {
                if (fieldsToShow != "") this.ShowHideAttributes(fieldsToShow, true);
                if (fieldsToMakeRequired != "") this.MakeTheFollowingFieldsRequired(fieldsToMakeRequired);
            }
            else {
                if (fieldsToShow != "") this.ShowHideAttributes(fieldsToShow, false);
                if (fieldsToMakeRequired != "") this.MakeTheFollowingFieldsNotRequired(fieldsToMakeRequired);
            }
        }
        else {
            if (!this.AreAttributesNullOrFalse(fieldsToCheck)) {
                if (fieldsToShow != "") this.ShowHideAttributes(fieldsToShow, true);
                if (fieldsToMakeRequired != "") this.MakeTheFollowingFieldsRequired(fieldsToMakeRequired);
            }
            else {
                if (fieldsToShow != "") this.ShowHideAttributes(fieldsToShow, false);
                if (fieldsToMakeRequired != "") this.MakeTheFollowingFieldsNotRequired(fieldsToMakeRequired);
            }
        }
    },

    AreAttributesNullOrFalse: function (attributesList) {
        var attributesArray = attributesList.split(",");
        for (var i = 0; i < attributesArray.length; i++) {
            var attr = Xrm.Page.data.entity.attributes.get(attributesArray[i]);
            if (attr.getAttributeType() == "boolean") {
                if (attr.getValue() == true) return false;
            }
            else {
                if (this.IsNotNullEmptyOrUndefined(attr.getValue())) return false;
            }
        }
        return true;
    },

    IsOptionSetOther: function (attributeName) {
        var attr = Xrm.Page.data.entity.attributes.get(attributeName);
        var fieldValue = this.ReadPickListIdValue(attr);
        return fieldValue == ULLScripts.ComonConstants.OPTION_SET_VALUE.OTHER;
    },

    Set_Notification: function (level, message, name) {
        //WARNING THIS IS UNSUPPORTED CODE
        //level - severity : critical = 1, warning = 2, info = 3
        //message - Actual message to be displayed
        //name - unique name for the alert
        //EX: Set_Notification( 2, "Hello World", "alert1" );
        var notificationsList = Sys.Application.findComponent('crmNotifications');
        if (notificationsList == null) {
            alert('div not found');
            return;
        }
        //critical = 1, warning = 2, info = 3
        notificationsList.AddNotification(name, level, 'namespace', message);
        if (message == "") {
            notificationsArea.SetNotifications(null, null);
        }
    },

    HideNotifications: function () {
        //WARNING THIS IS UNSUPPORTED CODE
        var notificationsList = Sys.Application.findComponent('crmNotifications');
        notificationsList.SetVisible(false);
    },

    ClearNotfications: function () {
        //WARNING THIS IS UNSUPPORTED CODE
        var notificationsList = Sys.Application.findComponent('crmNotifications');
        notificationsList.SetNotifications();
    }
};
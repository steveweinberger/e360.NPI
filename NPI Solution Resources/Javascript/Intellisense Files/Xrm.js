var _cntrlDictionary = {};
var _attDictionary = {};
var _formsDictionary = null;
var _navItemDictionary = {};

function _xrm(pageData) {
    this.Page = new _page(pageData);
    this.Utility = new _utility();
    this.__namespace = true;
}
_xrm.prototype.toString = function () {
    return "[object Xrm namespace]";
}

function _utility() {
    this.openEntityForm = function (name, id, parameters) {
        /// <summary>
        /// Opens an entity form.
        /// </summary>
        /// <param name="name" type="String" mayBeNull="false" optional="false" >
        /// <para>The logical name of an entity</para>
        /// </param>
        /// <param name="id" type="String" mayBeNull="false" optional="true" >
        /// <para>The string representation of a unique identifier or the record to open in the form. If not set, a form to create a new record is opened.</para>
        /// </param>
        /// <param name="parameters" type="Object" mayBeNull="false" optional="true" >
        /// <para>A dictionary object that passes extra query string parameters to the form. Invalid query string parameters will cause an error.</para>
        /// <para>Valid extra query string parameters are:</para>
        /// <para>     Form id : To set the id value of the form to use when more than one form is available.</para>
        /// <para>     Default field ids : Use to set default values for a new record form</para>
        /// <para>     Custom query string parameters : A form can be configured to accept custom query string parameters.</para>
        /// </param>
    };
    this.openWebResource = function (webResourceName, webResourceData, width, height) {
        /// <summary>
        /// Opens an HTML web resource.
        /// <para>Returns a window object.</para>
        /// </summary>
        /// <param name="webResourceName" type="String" mayBeNull="false" optional="false" >
        /// <para>The name of the HTML web resource to open.</para>
        /// </param>
        /// <param name="webResourceData" type="String" mayBeNull="false" optional="true" >
        /// <para>Data to be passed into the data parameter.</para>
        /// </param>
        /// <param name="width" type="Number" mayBeNull="false" optional="true" >
        /// <para>The width of the window to open in pixels.</para>
        /// </param>
        /// <param name="height" type="Number" mayBeNull="false" optional="true" >
        /// <para>The height of the window to open in pixels.</para>
        /// </param>
        /// <returns type="Object">
        /// <para>Window object</para>
        /// </returns>
    };
    this.alertDialog = function (message, onCloseCallback) {
        /// <summary>
        /// Displays a dialog box containing an application-defined message.
        /// <para>This method is only available for Updated Entities.</para>
        /// </summary>
        /// <param name="message" type="String" mayBeNull="false" optional="false" >
        /// <para>The text of the message to display in the dialog.</para>
        /// </param>
        /// <param name="onCloseCallback" type="Function" mayBeNull="false" optional="true" >
        /// <para>A function to execute when the OK button is clicked.</para>
        /// </param>
    };
    this.confirmDialog = function (message, yesCloseCallback, noCloseCallback) {
        /// <summary>
        /// Displays a dialog box containing an application-defined message.
        /// <para>This method is only available for Updated Entities.</para>
        /// </summary>
        /// <param name="message" type="String" mayBeNull="false" optional="false" >
        /// <para>The text of the message to display in the dialog.</para>
        /// </param>
        /// <param name="yesCloseCallback" type="Function" mayBeNull="false" optional="false" >
        /// <para>A function to execute when the OK button is clicked.</para>
        /// </param>
        /// <param name="noCloseCallback" type="Function" mayBeNull="false" optional="true" >
        /// <para>A function to execute when the Cancel button is clicked.</para>
        /// </param>
    };
    this.isActivityType = function () {
        /// <summary>
        /// Returns whether the entity is an activity entity.
        /// </summary>
        /// <returns type="Boolean" />
        return true;
    };
}
_utility.prototype.toString = function () {
    return "[object Xrm.Utility]";
}

function _page(pageData) {
    this.context = new _context(pageData);
    this.data = new _data(pageData);
    this.ui = new _ui(pageData);
    this.getAttribute = function (argument) {
        /// <summary>
        /// Returns one or more attributes depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the attributes.</para>
        /// <para>2: String: Returns the attribute where the argument matches the name.</para>
        /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
        /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
        /// </param>
        return Xrm.Page.data.entity.attributes.get(argument);
    };
    this.getControl = function (argument) {
        /// <summary>
        /// Returns one or more controls depending on the arguments passed.
        /// </summary>
        /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the controls.</para>
        /// <para>2: String: Returns the control where the argument matches the name.</para>
        /// <para>3: Number: Returns the control where the argument matches the index.</para>
        /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
        /// </param>
        return Xrm.Page.ui.controls.get(argument);
    };
}
_page.prototype.toString = function () {
    return "[object Xrm.Page]";
}

function _context(pageData) {
    this.client = new _client();
    this.getClientUrl = function () {
        /// <summary>
        /// Returns the encoded SOAP header necessary to use Microsoft Dynamics CRM 4.0 web service calls using Jscript.
        /// </summary>
        /// <returns type="String" />
        return pageData.getClientUrl();
    };
    this.getCurrentTheme = function () {
        /// <summary>
        ///  Returns the current theme used in the application.
        ///  </summary>
        ///  <returns type="String" />
        return pageData.CurrentTheme
    };
    this.getOrgLcid = function () {
        /// <summary>
        /// Returns the LCID value that represents the Microsoft Dynamics CRM Language Pack that is the base language for the organization.
        /// </summary>
        /// <returns type="Number" />
        return pageData.OrgLcid;
    };
    this.getOrgUniqueName = function () {
        /// <summary>
        /// Returns the unique text value of the organization’s name.
        /// </summary>
        /// <returns type="String" />
        return pageData.OrgUniqueName;
    };
    this.getQueryStringParameters = function () {
        /// <summary>
        /// Returns a dictionary object of key value pairs representing the query string arguments that were passed to the page.
        /// </summary>
        /// <returns type="Object" />
        return pageData.QueryStringParameters;
    };
    this.getUserId = function () {
        /// <summary>
        /// Returns GUID value of the SystemUser.id value for the current user.
        /// </summary>
        /// <returns type="String" />
        return pageData.UserId;
    };
    this.getUserLcid = function () {
        /// <summary>
        /// Returns the LCID value that represents the Microsoft Dynamics CRM Language Pack that is the user selected as their preferred language.
        /// </summary>
        /// <returns type="Number" />
        return pageData.UserLcid
    };
    this.getUserName = function () {
        /// <summary>
        /// Returns the LCID value that represents the Microsoft Dynamics CRM Language Pack that is the user selected as their preferred language.
        /// </summary>
        /// <returns type="Number" />
        return pageData.UserName;
    };
    this.getUserRoles = function () {
        /// <summary>
        /// Returns an array of strings representing the GUID values of each of the security roles that the user is associated with.
        /// </summary>
        /// <returns type="Array" />
        return pageData.UserRoles
    };
    this.isOutlookClient = function () {
        /// <summary>
        /// Returns Whether the client is the Outlook client
        /// </summary>
        /// <returns type="Boolean" />
        return pageData.isOutlookClient
    };
    this.isOutlookOnline = function () {
        /// <summary>
        /// Returns whether the use of the  Outlook client is connected to the server. Returns false when they are working offline.
        /// </summary>
        /// <returns type="Boolean" />
        return pageData.isOutlookOnline
    };
    this.prependOrgName = function (url) {
        /// <summary>
        /// Accepts a string and prepends the organization name to it with a leading forward slash: "/"+OrgUniqueName + url
        /// </summary>
        /// <returns type="String" />
        return "/" + this.getOrgUniqueName() + url;
    };
}

function _client() {
    this.getClient = function () {
        /// <summary>
        /// Returns one of the following: "Outlook", "Web", "Mobile"
        /// </summary>
        /// <returns type="String" />
    };
    this.getClientState = function () {
        /// <summary>
        /// Returns one of the following: "Online", "Offline"
        /// </summary>
        /// <returns type="String" />
    };
    this.getFormFactor = function () {
        /// <summary>
        /// Returns one of the following: "Unknown" = 0, "Desktop" = 1, "Tablet" = 2, "Phone" = 3
        /// </summary>
        /// <returns type="Number" />
    };
}
_context.prototype.toString = function () {
    return "[object Xrm.Page.context]";
}

function _data(pageData) {
    this.entity = new _entity(pageData);
    this.process = new _processData();
    this.refresh = function () {
        /// <summary>
        /// Asynchronously refresh data on form without reloading the page
        /// </summary>
    };
    this.save = function () {
        /// <summary>
        /// Asynchronously save the data on the form
        /// </summary>
    };
    this.getIsValid = function () {
        /// <summary>
        /// Returns a boolean telling whether the form can be saved or not
        /// </summary>
        /// <returns type="Boolean" />
    };
    this.setFormDirty = function () {
        /// <summary>
        /// Sets the form as dirty
        /// </summary>
    };
}
_data.prototype.toString = function () {
    return "[object Xrm.Page.data]";
}

function _processData() {
    this.getActiveProcess = function () {
        /// <summary>
        /// Returns a Process object representing the active process.
        /// </summary>
        return new _processObject();
    };
    this.setActiveProcess = function (processId, callbackFunction) {
        /// <summary>
        /// Set a Process as the active process
        /// <para>The enabled processes are filtered according to the user’s privileges. The list of enabled processes is the same ones a user can see in the UI if they want to change the process manually.</para>
        /// </summary>
        /// <param name="processId" type="String" mayBeNull="false" optional="false">
        /// The Id of the process to make the active process.
        /// </param>
        /// <param name="callbackFunction" type="Function" mayBeNull="false" optional="false">
        /// A function to call when the operation is complete. This callback function is passed one of the following string values to indicate whether the operation succeeded.
        /// <para>success</para>
        /// <para>invalid</para>
        /// </param>
    };
    this.getActiveStage = function () {
        /// <summary>
        /// Returns a Stage object representing the active stage.
        /// </summary>
        return new _stageObject();
    };
    this.setActiveStage = function (stageId, callbackFunction) {
        /// <summary>
        /// Set a completed stage for the current entity as the active stage.
        /// <para>Only a completed stage for the current entity can be set using this method.</para>
        /// </summary>
        /// <param name="stageId" type="String" mayBeNull="false" optional="false">
        /// The ID of the completed stage for the current entity to make the active stage.
        /// </param>
        /// <param name="callbackFunction" type="Function" mayBeNull="false" optional="false">
        /// An optional function to call when the operation is complete.
        /// <para>The callback function will be passed a string value of "success" if the operation completes successfully</para>
        /// </param>
    }
    this.getActivePath = function () {
        /// <summary>
        /// Use this method to get a collection of stages currently in the active path with methods to interact with the stages displayed in the business process flow control.
        /// </summary>
        var stages = [];
        stages.push(new _stageObject())
        return stages;
    };
    this.getEnabledProcesses = function (callbackFunction) {
        /// <summary>
        /// Use this method to asynchronously retrieve the enabled business process flows that the user can switch to for an entity.
        /// <para>The enabled processes are filtered according to the user’s privileges. The list of enabled processes is the same ones a user can see in the UI if they want to change the process manually.</para>
        /// </summary>
        /// <param name="callbackFunction" type="Function" mayBeNull="false" optional="false">
        /// The callback function must accept a parameter that contains an object with dictionary properties where the name of the property is the Id of the business process flow and the value of the property is the name of the business process flow.
        /// </param>
        var processes = [];
        processes.push(new _processObject())
        return processes;
    };
    this.addOnStageChange = function (handler) {
        /// <summary>
        /// Use this to add a function as an event handler for the OnStageChange event so that it will be called when the business process flow stage changes.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false">
        /// The function will be added to the bottom of the event handler pipeline. The execution context is automatically set to be the first parameter passed to the event handler.
        /// </param>
    };
    this.removeOnStageChange = function (handler) {
        /// <summary>
        /// Use this to remove a function as an event handler for the OnStageChange event.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false">
        /// The function to be removed.
        /// </param>
    };
    this.addOnStageSelected = function (handler) {
        /// <summary>
        /// Use this to add a function as an event handler for the OnStageSelected event so that it will be called when a business process flow stage is selected.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false">
        /// The function will be added to the bottom of the event handler pipeline. The execution context is automatically set to be the first parameter passed to the event handler.
        /// </param>
    };
    this.removeOnStageSelected = function (handler) {
        /// <summary>
        /// Use this to remove a function as an event handler for the OnStageSelected event.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false">
        /// The function to be removed.
        /// </param>
    };
    this.moveNext = function (callbackFunction) {
        /// <summary>
        /// Progresses to the next stage.
        /// <para>This will cause the OnStageChange event to occur.</para>
        /// </summary>
        /// <param name="callbackFunction" type="Function" mayBeNull="false" optional="false">
        /// An optional function to call when the operation is complete.
        /// <para>This callback function is passed one of the following string values to indicate whether the operation succeeded:</para>
        /// <para>success - The operation succeeded.</para>
        /// <para>crossEntity - The next stage is for a different entity.</para>
        /// <para>end - The active stage is the last stage of the active path.</para>
        /// <para>invalid - The operation failed because the selected stage isn’t the same as the active stage.</para>
        /// </param>
    };
    this.movePrevious = function (callbackFunction) {
        /// <summary>
        /// Progresses to the previous stage.
        /// <para>This will cause the OnStageChange event to occur.</para>
        /// </summary>
        /// <param name="callbackFunction" type="Function" mayBeNull="false" optional="false">
        /// An optional function to call when the operation is complete.
        /// <para>This callback function is passed one of the following string values to indicate whether the operation succeeded:</para>
        /// <para>success - The operation succeeded.</para>
        /// <para>crossEntity - The next stage is for a different entity.</para>
        /// <para>end - The active stage is the last stage of the active path.</para>
        /// <para>invalid - The operation failed because the selected stage isn’t the same as the active stage.</para>
        /// </param>
    };
}

function _processObject() {
    this.getId = function () {
        /// <summary>
        /// Returns the unique identifier of the process.
        /// </summary>
        return "";
    };
    this.getName = function () {
        /// <summary>
        /// Returns the name of the process.
        /// </summary>
        return "";
    };
    this.getStages = function () {
        /// <summary>
        /// Returns an collection of stages in the process.
        /// </summary>
        var stages = [];
        stages.push(new _stageObject())
        return stages;
    };
    this.isRendered = function () {
        /// <summary>
        /// Returns true if the process is rendered, false if not
        /// </summary>
        return true;
    };
}

function _stageObject() {
    this.getCategory = function () {
        /// <summary>
        /// Returns a category object
        /// </summary>
        return new _categoryObject();
    };
    this.getEntityName = function () {
        /// <summary>
        /// Returns the logical name of the entity associated with the stage.
        /// </summary>
        return "";
    };
    this.getId = function () {
        /// <summary>
        /// Returns the unique identifier of the stage.
        /// </summary>
        return "";
    };
    this.getName = function () {
        /// <summary>
        /// Returns the name of the stage.
        /// </summary>
        return "";
    };
    this.getStatus = function () {
        /// <summary>
        /// Returns the status of the stage.
        /// </summary>
        return "";
    };
    this.getSteps = function () {
        /// <summary>
        /// Returns a collection of steps in the stage.
        /// </summary>
        var steps = [];
        steps.push(new _stepObject())
        return steps;
    };
}

function _categoryObject() {
    this.getValue = function () {
        /// <summary>
        /// Returns the integer value of the business process flow category.
        /// </summary>
        return 1;
    };
}

function _stepObject() {
    this.getAttribute = function () {
        /// <summary>
        /// Returns the logical name of the attribute associated to the step.
        /// </summary>
        return "";
    };
    this.getName = function () {
        /// <summary>
        /// Returns the name of the step.
        /// </summary>
        return "";
    };
    this.isRequired = function () {
        /// <summary>
        /// Returns whether the step is required in the business process flow.
        /// </summary>
        return true;
    };
}

function _ui(pageData) {
    this.controls = new _controlsCollection(pageData);
    this.formSelector = new _formSelector(pageData);
    this.navigation = new _navigationItems(pageData);
    this.tabs = new _tabCollection(pageData);
    this.process = new _processUI();
    this.close = function () {
        /// <summary>
        /// Closes the form.
        /// </summary>
    };
    this.getCurrentControl = function () {
        /// <summary>
        /// Returns the control object that currently has focus on the form.
        /// </summary>
        /// <returns type="Object" />
        return _cntrlDictionary[pageData.CurrentControl];
    };
    this.getFormType = function () {
        /// <summary>
        /// Indicates the form context for the record.
        /// <para>	0 : Undefined</para>
        /// <para>	1 : Create</para>
        /// <para>	2 : Update</para>
        /// <para>	3 : Read Only</para>
        /// <para>	4 : Disabled</para>
        /// <para>	5 : Quick Create (Deprecated)</para>
        /// <para>	6 : Bulk Edit</para>
        /// <para>	11: Read Optimized</para>
        /// </summary>
        /// <returns type="Number" />
        return pageData.FormType;
    };
    this.getViewPortHeight = function () {
        /// <summary>
        /// Returns the height of the viewport in pixels.
        /// </summary>
        /// <returns type="Number" />
        return pageData.ViewPortHeight;
    };
    this.getViewPortWidth = function () {
        /// <summary>
        /// Returns the width of the viewport in pixels.
        /// </summary>
        /// <returns type="Number" />
        return pageData.ViewPortWidth;
    };
    this.refreshRibbon = function () {
        /// <summary>
        /// Causes the ribbon to re-evaluate data that controls what is displayed in it.
        /// </summary>
    };
    this.setFormNotification = function (message, level, uniqueId) {
        /// <summary>
        /// Allows you to set a notification on the form.
        /// </summary>
        /// <param name="message" type="String" mayBeNull="false" optional="false">The message to display to the user.</param>
        /// <param name="level" type="String" mayBeNull="false" optional="false">
        /// <para>Must be one of the following:</para>
        /// <para>ERROR</para>
        /// <para>WARNING</para>
        /// <para>INFO</para>
        /// </param>
        /// <param name="uniqueId" type="String" mayBeNull="false" optional="false">UniqueId for the notification. You will use this ID to clear the notification if necessary.</param>
    };
    this.clearFormNotification = function (uniqueId) {
        /// <summary>
        /// Allows you to set a notification on the form.
        /// </summary>
        /// <param name="uniqueId" type="String" mayBeNull="false" optional="false">UniqueId of the notification to be cleared. </param>
    };
}
_ui.prototype.toString = function () {
    return "[object Xrm.Page.ui]";
}

function _processUI() {
    this.setDisplayState = function (expanded) {
        /// <summary>
        /// Use this method to expand or collapse the business process flow control.
        /// </summary>
        /// <param name="expanded" type="String" mayBeNull="false" optional="false">"expanded" to expand the control, "collapsed" to collapse it.</param>
    };
    this.setVisible = function (visible) {
        /// <summary>
        /// Use this method to show or hide the business process flow control.
        /// </summary>
        /// <param name="visible" type="Boolean" mayBeNull="false" optional="false">true to show the control; otherwise, false.</param>
    };
}

function _navigationItems(pageData) {
    this.items = new _navItemCollection(pageData);
}
_navigationItems.prototype.toString = function () {
    return "[object Xrm.Page.ui.navigation]";
}

function _entity(pageData) {
    saveEventHandlers = [];
    this.addOnSave = function (functionPointer) {
        /// <summary>
        /// Adds the event handler function to be called when the entity is saved.
        /// It will be added to the bottom of the event pipeline and called after the other event handlers.
        /// </summary>
        if (typeof functionPointer == "function") {
            saveEventHandlers.push(functionPointer);
        }
        else {
            throw new Error("Xrm.Page.data.entity.addOnSave method requires a function to be passed as a parameter.")
        }

    };
    this.removeOnSave = function (functionPointer) {
        /// <summary>
        /// Removes the the event handler function from the event pipeline.
        /// </summary>
        var newSaveHandlers = [];
        for (var i = 0; i < saveEventHandlers.length; i++) {
            if (saveEventHandlers[i] != functionPointer) {
                newSaveHandlers.push(saveEventHandlers[i]);
            }
        }
        saveEventHandlers = newSaveHandlers;

    };
    this.getDataXml = function () {
        /// <summary>
        /// Returns a string representing the xml that will be sent to the server when the record is saved. Only data in fields that have changed are set to the server.
        /// </summary>
        /// <returns type="String" />
        var dataXml = [];
        var entityName = pageData.EntityName;

        dataXml.push("<" + entityName + ">");
        for (var attribute in _attDictionary) {
            var att = _attDictionary[attribute];
            var value = att.getValue();
            if (att.getIsDirty()) {
                if (value == null) {
                    dataXml.push("<" + att.getName() + "/>")
                }
                else {
                    switch (att.getAttributeType()) {
                        case "lookup":
                            //ActivityParty are formatted different from regular lookups
                            var attributeName = att.getName()
                            if ((attributeName == "allparties") || (attributeName == "bcc") || (attributeName == "cc") || (attributeName == "customers") || (attributeName == "from") || (attributeName == "optionalattendees") || (attributeName == "organizer") || (attributeName == "partners") || (attributeName == "requiredattendees") || (attributeName == "resources") || (attributeName == "to")) {
                                dataXml.push("<" + attributeName + ">");
                                for (var i = 0; i < value.length; i++) {
                                    dataXml.push("<activityparty>");
                                    dataXml.push("<partyid name=\"" + value[i].name + "\" type=\"" + value[i].entityType + "\">" + value[i].id + "</partyid>");
                                    dataXml.push("</activityparty>");
                                }
                                dataXml.push("</" + attributeName + ">");
                            }
                            else {
                                var value = att.getValue();
                                dataXml.push("<" + attributeName + " type=\"" + value[0].entityType + "\" name=\"" + value[0].name + "\">" + value[0].id + "</" + attributeName + ">")
                            }
                            break;
                        default:
                            dataXml.push("<" + att.getName() + ">" + value + "</" + att.getName() + ">")
                            break;
                    }
                }
            }
        }

        dataXml.push("</" + entityName + ">");
        return dataXml.join("");

    };
    this.getEntityName = function () {
        /// <summary>
        /// Returns a string representing the logical name of the entity for the record.
        /// </summary>
        /// <returns type="String" />
        return pageData.EntityName;
    };
    this.getId = function () {
        /// <summary>
        /// Returns a string representing the GUID id value for the record.
        /// </summary>
        /// <returns type="String" />
        return pageData.Id;
    };
    this.getIsDirty = function () {
        /// <summary>
        /// Returns a Boolean value that indicates if any fields in the form have been modified.
        /// </summary>
        /// <returns type="Boolean" />
        return pageData.IsDirty;
    };
    this.save = function (argument) {
        /// <summary>
        /// Saves the record.
        /// </summary>
        /// <param name="argument" type="String" mayBeNull="true" optional="true" >
        /// <para>1: None: If no parameter is included the record will simply be saved. </para>
        /// <para>2: "saveandclose" : Saves record and closes the form.</para>
        /// <para>3: "saveandnew" : Saves the record and opens a blank form for a new record.</para>
        /// </param>
        for (var i = 0; i < saveEventHandlers.length; i++) {
            saveEventHandlers[i]();
        }
        for (var attribute in _attDictionary) {
            _attDictionary[attribute]._setClean();
        }
        pageData.IsDirty = false;
    };
    this.getPrimaryAttributeValue = function () {
        /// <summary>
        /// Returns the name of the primary attribute for the entity.
        /// </summary>
        /// <returns type="String" />
    };
    this.attributes = new _attributesCollection(pageData);
}
_entity.prototype.toString = function () {
    var stringvalue = "[object entity : \'" + this.getEntityName() + "\' Id: '" + this.getId() + "\' isDirty: " + this.getIsDirty().toString() + "]";
    return stringvalue;
}

function _attributesCollection(pageData) {
    for (var i = 0; i < pageData.Attributes.length; i++) {
        var att = pageData.Attributes[i];
        switch (att.Type) {
            case "datetime":
                _attDictionary[att.Name] = new _datetimeAttribute(att);
                break;
            case "lookup":
                _attDictionary[att.Name] = new _lookupAttribute(att);
                break;
            case "memo":
                _attDictionary[att.Name] = new _memoAttribute(att);
                break;
            case "string":
                _attDictionary[att.Name] = new _stringAttribute(att);
                break;
            case "decimal":
                _attDictionary[att.Name] = new _decimalAttribute(att);
                break;
            case "double":
                _attDictionary[att.Name] = new _doubleAttribute(att);
                break;
            case "integer":
                _attDictionary[att.Name] = new _integerAttribute(att);
                break;
            case "money":
                _attDictionary[att.Name] = new _moneyAttribute(att);
                break;
            case "boolean":
                _attDictionary[att.Name] = new _booleanAttribute(att);
                break;
            case "optionset":
                _attDictionary[att.Name] = new _optionsetAttribute(att);
                break;
            default:
                throw new Error("Unrecognized attribute type:" + att.Type);
                break;
        }

    }
    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
        /// The delegate_function must include parameters for attribute and index. i.e : MyFunction(attribute,index).
        /// </param>
        //		for (var i = 0; i < attributes.length; i++)
        //		{
        //			delegate_function(attributes[i], i);
        //		}
        var i = 0;
        for (var attribute in _attDictionary) {
            delegate_function(_attDictionary[attribute], i);
            i++;
        }
    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more attributes depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the attributes.</para>
        /// <para>2: String: Returns the attribute where the argument matches the name.</para>
        /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
        /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
        /// </param>
        var argType = typeof argument;

        if (argument == null) {
            var allAttributes = [];
            for (var i in _attDictionary) {
                allAttributes.push(_attDictionary[i]);
            }
            return allAttributes;
        }

        switch (argType) {
            case "number":
                var i = 0;
                for (var attribute in _attDictionary) {
                    if (argument == i) {
                        return _attDictionary[attribute];
                    }
                    i++;
                }
                return null;
                break;
            case "string":
                return _attDictionary[argument];
                return null;
                break;
            case "function":
                var returnAtts = [];
                var i = 0;
                for (var attribute in _attDictionary) {
                    if (argument(_attDictionary[attribute], i)) {
                        returnAtts.push(_attDictionary[attribute]);
                    }
                    i++;
                }
                return returnAtts
                break;
        }

    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return pageData.Attributes.length;;
    };
}
_attributesCollection.prototype.toString = function () {
    var stringvalue = "[object Xrm.Page.data.entity.attributes: " + this.getLength() + " attributes ]";
    return stringvalue;
}

function _controlsCollection(pageData) {

    for (var i = 0; i < pageData.Controls.length; i++) {
        var ctrl = pageData.Controls[i];
        ctrl.parent = getControlParent(ctrl.Name);
        switch (ctrl.Type) {
            case "standard":
                _cntrlDictionary[ctrl.Name] = new _standardControl(ctrl);
                break;
            case "iframe":
                _cntrlDictionary[ctrl.Name] = new _iframeControl(ctrl);
                break;
            case "lookup":
                _cntrlDictionary[ctrl.Name] = new _lookupControl(ctrl);
                break;
            case "optionset":
                _cntrlDictionary[ctrl.Name] = new _optionsetControl(ctrl);
                break;
            case "subgrid":
                _cntrlDictionary[ctrl.Name] = new _subgridControl(ctrl);
                break;
            case "webresource":
                _cntrlDictionary[ctrl.Name] = new _webresourceControl(ctrl);
                break;
            case "notes":
                _cntrlDictionary[ctrl.Name] = new _notesControl(ctrl);
                break;
            default:
                throw new Error("Unrecognized control type:" + ctrl.Type);
                break;
        }
    }
    function getControlParent(controlName) {
        var parentSectionNotFound = true;
        for (var tab in pageData.Tabs) {
            for (var section in pageData.Tabs[tab].Sections) {
                for (var control in pageData.Tabs[tab].Sections[section].Controls) {
                    if (pageData.Tabs[tab].Sections[section].Controls[control].Name == controlName) {
                        parentSectionNotFound = false;
                        return pageData.Tabs[tab].Sections[section].Name;
                    }
                }
            }
        }
        if (parentSectionNotFound) {
            throw new Error("Parent section for control " + controlName + " was not found.");
        }
    }
    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Object" mayBeNull="false" optional="false" >
        /// The function must include parameters for control and index. i.e Myfunction(control, index).
        /// </param>
        var i = 0;
        for (var control in _cntrlDictionary) {
            delegate_function(_cntrlDictionary[control], i);
            i++;
        }
    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more controls depending on the arguments passed.
        /// </summary>
        /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the controls.</para>
        /// <para>2: String: Returns the control where the argument matches the name.</para>
        /// <para>3: Number: Returns the control where the argument matches the index.</para>
        /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
        /// </param>
        var argType = typeof argument;

        if (argument == null) {
            var allControls = [];
            for (var i in _cntrlDictionary) {
                allControls.push(_cntrlDictionary[i]);
            }
            return allControls;
        }

        switch (argType) {
            case "number":
                var i = 0;
                for (var control in _cntrlDictionary) {
                    if (argument == i) {
                        return _cntrlDictionary[control];
                    }
                    i++;
                }
                return null;
                break;
            case "string":
                return _cntrlDictionary[argument];
                break;
            case "function":
                var returnControls = [];
                var i = 0;
                for (var control in _cntrlDictionary) {
                    if (argument(_cntrlDictionary[control], i)) {
                        returnControls.push(_cntrlDictionary[control]);
                    }
                    i++;
                }
                return returnControls
                break;
        }
    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return pageData.ControlsLength;
    };

}
_controlsCollection.prototype.toString = function () {
    var stringvalue = "[object Xrm.Page.ui.controls: " + this.getLength() + " controls ]";
    return stringvalue;
}

function _childControlsCollection(ControlNames) {
    var controlNames = ControlNames;

    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Object" mayBeNull="false" optional="false" >
        /// The function must include parameters for control and index. i.e Myfunction(control, index).
        /// </param>

        var parentControls = {}
        for (var i = 0; i < controlNames.length; i++) {
            parentControls[controlNames[i].Name] = _cntrlDictionary[controlNames[i].Name];
        }

        var i = 0;
        for (var control in parentControls) {
            delegate_function(parentControls[control], i);
            i++;
        }
    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more controls depending on the arguments passed.
        /// </summary>
        /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the controls.</para>
        /// <para>2: String: Returns the control where the argument matches the name.</para>
        /// <para>3: Number: Returns the control where the argument matches the index.</para>
        /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
        /// </param>
        if (controlNames.length == 0) {
            return null;
        }
        else {
            var parentControls = {}
            for (var i = 0; i < controlNames.length; i++) {
                parentControls[controlNames[i].Name] = _cntrlDictionary[controlNames[i].Name];
            }

            var matchingControls = [];

            var argType = typeof argument;

            if (argument == null) {
                for (var control in parentControls) {
                    matchingControls.push(parentControls[control]);
                }
            }

            switch (argType) {
                case "number":
                    return parentControls[controlNames[argument].Name]
                    break;
                case "string":
                    return parentControls[argument];
                    break;
                case "function":
                    var i = 0;
                    for (var control in parentControls) {
                        if (argument(parentControls[control], i)) {
                            matchingControls.push(parentControls[control]);
                        }
                        i++;
                    }
                    break;
            }
            return matchingControls;
        }

    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return ControlNames.length;
    };
}
_childControlsCollection.prototype.toString = function () {
    var stringvalue = "[object controls collection: " + this.getLength() + " controls]";
    return stringvalue;
}

function _formSelector(pageData) {
    if (pageData.Forms.length > 0) {
        _formsDictionary = {};
        for (var i = 0; i < pageData.Forms.length; i++) {
            _formsDictionary[pageData.Forms[i].Id] = new _formItem(pageData.Forms[i]);
        }
    }

    this.items = new _formItemsCollection(pageData);
    this.getCurrentItem = function () {
        if (_formsDictionary != null) {
            return _formsDictionary[pageData.CurrentForm.Id];
        }
        else {
            return null;
        }
    };
}
_formSelector.prototype.toString = function () {
    var stringvalue = "[object Xrm.Page.ui.formSelector: current item:" + ((this.getCurrentItem() == null) ? "null" : this.getCurrentItem().getLabel()) + "]";
    return stringvalue;
}

function _formItemsCollection(pageData) {
    this.forEach = function (delegateFunction) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
        /// The function must include parameters for form item and index. i.e Myfunction(item, index).
        /// </param>
        if (_formsDictionary != null) {
            var i = 0;
            for (var form in _formsDictionary) {
                delegateFunction(_formsDictionary[form], i);
                i++;
            }
        }
    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more form items depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the form items.</para>
        /// <para>2: String: Returns the form item where the argument matches the id.</para>
        /// <para>3: Number: Returns the form item where the argument matches the index.</para>
        /// <para>4: Function: Returns any form items that cause the delegate function to return true.</para>
        /// </param>
        var matchedForms = [];

        if (argument == null) {
            if (_formsDictionary != null) {
                for (var form in _formsDictionary) {
                    matchedForms.push(_formsDictionary[form]);
                }
            }
        }
        var argType = typeof argument;
        switch (argType) {
            case "number":
                var i = 0;
                for (var form in _formsDictionary) {
                    if (i == argument) {
                        return _formsDictionary[form];
                        i++;
                    }
                }
                break;
            case "string":
                return _formsDictionary[argument];
                break;
            case "function":
                var i = 0;
                for (var form in _formsDictionary) {
                    if (argument(_formsDictionary[form], i)) {
                        matchedForms.push(_formsDictionary[form]);
                    }
                    i++;
                }
                break;
        }
        return matchedForms;
    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return pageData.Forms.length;
    };

}
_formItemsCollection.prototype.toString = function () {
    var stringvalue = "[object Xrm.Page.ui.formSelector.items collection: " + this.getLength() + " items]";
    return stringvalue;
}

function _formItem(item) {
    var id = item.Id;
    var label = item.Label;
    this.getId = function () {
        /// <summary>
        /// Returns the id of the form item
        /// </summary>
        /// <returns type="String" />
        return id;
    };
    this.getLabel = function () {
        /// <summary>
        /// Returns the label for the form item
        /// </summary>
        /// <returns type="String" />
        return label;
    };
    this.navigate = function () {
        /// <summary>
        /// Closes the current form and opens the specified form.
        /// </summary>
    };
}
_formItem.prototype.toString = function () {
    var stringvalue = "[object form item: " + this.getLabel() + " id: " + this.getId() + "]";
    return stringvalue;
}

function _navItemCollection(pageData) {
    for (var i = 0; i < pageData.Navigation.length; i++) {
        var item = pageData.Navigation[i];
        _navItemDictionary[item.Id] = new _navItem(item);
    }
    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
        /// The function must include parameters for navigation item and index. i.e Myfunction(item, index).
        /// </param>
        var i = 0;
        for (var item in _navItemDictionary) {
            delegate_function(_navItemDictionary[item], i);
            i++;
        }

    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more items depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the items.</para>
        /// <para>2: String: Returns the item where the argument matches the id.</para>
        /// <para>3: Number: Returns the item where the argument matches the index.</para>
        /// <para>4: Function: Returns any items that cause the delegate function to return true.</para>
        /// </param>

        var matchingItems = [];
        if (argument == null) {
            var matchingItems = [];
            for (var item in _navItemDictionary) {
                matchingItems.push(_navItemDictionary[item]);
            }
            return matchingItems;

        }
        var argType = typeof argument;
        switch (argType) {
            case "number":
                var index = 0;
                for (var item in _navItemDictionary) {
                    if (index == argument) {
                        return _navItemDictionary[item];
                    }
                    index++;
                }
                break;
            case "string":
                return _navItemDictionary[argument];
                break;
            case "function":
                var index = 0;
                for (var item in _navItemDictionary) {
                    if (argument(_navItemDictionary[item], index)) {
                        matchingItems.push(_navItemDictionary[item]);
                    }
                    index++;
                }
                break;
        }
        return matchingItems;
    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return pageData.Navigation.length;
    };
}
_navItemCollection.prototype.toString = function () {
    var stringvalue = "[object Xrm.Page.ui.navigation.items: " + this.getLength() + " items]";
    return stringvalue;
}

function _navItem(item) {
    var id, label, isVisible;

    id = item.Id;
    label = item.Label;
    isVisible = item.Visible;
    this.getId = function () {
        /// <summary>
        /// Returns the id of the item
        /// </summary>
        /// <returns type="String" />
        return id;
    };
    this.getLabel = function () {
        /// <summary>
        /// Returns the label for the item
        /// </summary>
        /// <returns type="String" />
        return label;
    };
    this.getVisible = function () {
        /// <summary>
        /// Returns whether the item is currently visible.
        /// </summary>
        /// <returns type="Boolean" />
        return isVisible;
    };
    this.setFocus = function () {
        /// <summary>
        /// Sets focus on the item
        /// </summary>
    };
    this.setLabel = function (labelText) {
        /// <summary>
        /// Sets the label text of the item.
        /// </summary>
        /// <param name="labelText" type="String" mayBeNull="false" optional="false" >
        /// The new text for the label.
        /// </param>
        if (typeof labelText == "string") {
            label = labelText;
        }
        else {
            throw new Error("Invalid argument. Expected string value.");
        }
    };
    this.setVisible = function (visible) {
        /// <summary>
        /// Sets whether the item is visible
        /// </summary>
        /// <param name="visible" type="Boolean" mayBeNull="false" optional="false" >
        /// The boolean value indicating whether the item is visible
        /// </param>
        if (typeof isVisible == "boolean") {
            isVisible = visible;
        }
        else {
            throw new Error("Invalid argument. Expected boolean value.")
        }
    };

}
_navItem.prototype.toString = function () {
    var stringvalue = "[object navigation item : \'" + this.getId() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// =====================================================
// ATTRIBUTES ==========================================
// =====================================================

//Start Attribute definitions  -------------------------------------------------------------------

// ATTRIBUTE Base ===================================================================
function _attributeBase(att) {
    var name, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, changeEventHandlers, errorMessage;
    name = att.Name;

    format = att.Format;
    isDirty = att.IsDirty;
    requiredLevel = att.RequiredLevel;
    submitMode = att.SubmitMode;
    userPrivilege = att.UserPrivilege;
    controlNames = att.Controls;
    changeEventHandlers = [];

    this.addOnChange = function (functionPointer) {
        /// <summary>
        /// Adds an event handler function to the OnChange event for the attribute. It will be called after the other event handler functions in the event pipeline.
        /// </summary>
        if (typeof functionPointer == "function") {
            changeEventHandlers.push(functionPointer);
        }
        else {
            errorMessage = "Error using addOnChange with the " + name + " attribute. The parameter passed is not a function.";
            throw new Error(errorMessage);
        }

    };
    this.removeOnChange = function (functionPointer) {
        /// <summary>
        /// Removes and event handler function from the OnChange event for the attribute.
        /// </summary>
        if (typeof functionPointer != "function") {
            errorMessage = "Error using removeOnChange with the " + name + " attribute. The parameter passed is not a function.";
            throw new Error(errorMessage);
        }

        var newHandlers = [];
        for (var i = 0; i < changeEventHandlers.length; i++) {
            if (changeEventHandlers[i] != functionPointer) {
                newHandlers.push(changeEventHandlers[i]);
            }
        }
        changeEventHandlers = newHandlers;
    };
    this.fireOnChange = function () {
        /// <summary>
        /// Causes the OnChange event to occur on the attribute so that any script associated to that event can execute.
        /// </summary>
        isDirty = true;
        for (var i = 0; i < changeEventHandlers.length; i++) {
            changeEventHandlers[i]();
        }
    };
    this.getFormat = function () {
        /// <summary>
        /// Returns a string value that represents formatting options for the attribute. The value may be null.
        /// </summary>
        /// <returns type="String" />
        return format;
    };
    this.getIsDirty = function () {
        /// <summary>
        /// Returns a Boolean value indicating if there are unsaved changes to the attribute value.
        /// </summary>
        /// <returns type="Boolean" />
        return isDirty;
    };
    this.getIsPartyList = function () {
        /// <summary>
        /// Returns a Boolean value indicating if the attribute is a Party List
        /// </summary>
        /// <returns type="Boolean" />
        return true;
    };
    this.getName = function () {
        /// <summary>
        /// Returns a string representing the logical name of the attribute.
        /// </summary>
        /// <returns type="String" />
        return name;
    };
    this.getParent = function () {
        /// <summary>
        /// Returns the entity object that is the parent to the attribute. In the case of an attribute this is Xrm.Page.data.entity.
        /// </summary>
        return function () {
            return Xrm.Page.data.entity;
        }();
    };
    this.getRequiredLevel = function () {
        /// <summary>
        /// Returns a string value indicating whether a value for the attribute is required or recommended.  Will return either "none", "required", or "recommended".
        /// </summary>
        /// <returns type="String" />
        return requiredLevel;
    };
    this.getSubmitMode = function () {
        /// <summary>
        /// Returns a string indicating when data from the attribute will be submitted when the record is saved. Will return either "always", "never", or "dirty".
        /// </summary>
        /// <returns type="String" />
        return submitMode;
    };
    this.getUserPrivilege = function () {
        /// <summary>
        /// Returns an array of privileges that contain Boolean values indicating if the user can create, read or update data values for an attribute.
        /// </summary>
        /// <returns type="Array" />
        return userPrivilege;
    };
    this.setRequiredLevel = function (level) {
        /// <summary>
        /// Sets the required level for the attribute
        /// </summary>
        /// <param name="level" type="String" mayBeNull="false" optional="false" >
        /// Valid values include "none", "required", and "recommended".
        /// </param>
        if (level == "none" || level == "required" || level == "recommended") {
            requiredLevel = level;
        }
        else {
            errorMessage = "Error using setRequiredLevel on the " + name + " attribute. Invalid argument. Valid arguments for setRequiredLevel include \"none\", \"required\", and \"recommended\".";
            throw new Error(errorMessage);
        }
    };
    this.setSubmitMode = function (mode) {
        /// <summary>
        /// Sets whether data from the attribute will be submitted when the record is saved.
        /// </summary>
        /// <param name="mode" type="String" mayBeNull="false" optional="false" >
        /// Valid values include "always", "never", and "dirty".
        /// </param>
        if (mode == "always" || mode == "never" || mode == "dirty") {
            submitMode = mode;
        }
        else {
            errorMessage = "Error using setSubmitMode on the " + name + " attribute. Invalid argument. Valid arguments for setSubmitMode include \"always\", \"never\", and \"dirty\".";
            throw new Error(errorMessage);
        }
    };
    this._setClean = function () {
        /// <summary>
        /// Private function for design time to be called when entity saved. Not an actual Microsoft CRM attribute method.
        /// </summary>
        isDirty = false;
    }

    this.controls = new _childControlsCollection(controlNames);

}

// NUMBER Base ===================================================================
function _numberBaseAttribute(att) {
    _attributeBase.call(this, att);
    var value, max, min, precision, errorMessage;
    value = att.Value;
    max = att.Max;
    min = att.Min;
    precision = att.Precision;
    this.getMax = function () {
        /// <summary>
        /// Returns a number indicating the maximum allowed value for an attribute.
        /// </summary>
        /// <returns type="Number" />
        return max;
    };
    this.getMin = function () {
        /// <summary>
        /// Returns a number indicating the minimum allowed value for an attribute.
        /// </summary>
        /// <returns type="Number" />
        return min;
    };
    this.getPrecision = function () {
        /// <summary>
        /// Returns the number of digits allowed to the right of the decimal point.
        /// </summary>
        /// <returns type="Number" />
        return precision;
    };
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the decimal attribute
        /// </summary>
        /// <returns type="Number" />
        return value;
    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a decimal attribute.
        /// </summary>
        /// <param name="newValue" type="Number" mayBeNull="false" optional="false" >
        /// The new value for the decimal attribute
        /// </param>
        if (newValue == null && value != null) {
            value = newValue;
            this.fireOnChange();
            return;
        }
        if (typeof newValue == "number") {
            if (value != newValue) {
                if (newValue <= max && newValue >= min) {
                    value = newValue;
                    this.fireOnChange();
                }
                else {
                    errorMessage = "Out of Range. The value of the " + this.getName() + " attribute must be between " + min + " and " + max + "."
                    throw new Error(errorMessage);
                }
            }
        }
        else {
            errorMessage = "Invalid argument setting " + this.getName() + ". Use a Number parameter value when using setValue on a " + this.getAttributeType() + " attribute."
            throw new Error(message);
        }
    };
}

// BOOLEAN ===================================================================
function _booleanAttribute(att) {
    _attributeBase.call(this, att);
    var initialValue, value, errorMessage;
    initialValue = att.InitialValue;
    value = att.Value;
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'boolean'.
        /// </summary>
        /// <returns type="String" />
        return "boolean";
    };
    this.getInitialValue = function () {
        /// <summary>
        /// Returns the value of the attribute when the record was last saved or the default value before the record is saved.
        /// </summary>
        /// <returns type="Number" />
        return initialValue;
    }
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the boolean attribute
        /// </summary>
        /// <returns type="Boolean" />
        return value;
    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a Boolean attribute.
        /// </summary>
        /// <param name="newValue" type="Boolean" mayBeNull="false" optional="false" >
        /// The new value for the boolean attribute
        /// </param>
        if (newValue != null && (typeof newValue == "boolean")) {
            if (value != newValue) {
                value = newValue;
                this.fireOnChange();
            }

        }
        else {
            errorMessage = "Error using setValue on the " + this.getName() + " attribute. Invalid argument. Use a boolean parameter value when using setValue on a boolean attribute.";
            throw new Error(errorMessage);
        }
    };
}
_booleanAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// DATETIME ===================================================================
function _datetimeAttribute(att) {
    var value;
    _attributeBase.call(this, att);
    if (att.Value != null) {
        value = new Date(att.Value);
    }
    else {
        value = null;
    }
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'datetime'.
        /// </summary>
        /// <returns type="String" />
        return "datetime";
    };
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the datetime attribute
        /// </summary>
        /// <returns type="Date" />
        return value;

    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a datetime attribute.
        /// </summary>
        /// <param name="newValue" type="Date" mayBeNull="false" optional="false" >
        /// The new value for the datetime attribute
        /// </param>
        if (value != newValue) {
            if (newValue == null) {
                value = newValue;
                this.fireOnChange();
            }
            else {
                var test;
                try {
                    test = newValue.getYear();
                    value = newValue;
                    this.fireOnChange();
                }
                catch (e) {
                    throw new Error("Invalid argument. Use a Date parameter value when using setValue on a datetime attribute.");
                }
            }
        }

    };
    this.setShowTime = function (value) {
        /// <summary>
        /// Controls whether to show the time for a date field
        /// </summary>
        /// <param name="value" type="Boolean" mayBeNull="false" optional="false" >
        /// Set to 'true' to show the time portion, 'false' to hide the time portion
        /// </param>
    };
}
_datetimeAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : "\'" + this.getValue().toString() + "\'") + "]";
    return stringvalue;
}

// DECIMAL ===================================================================
function _decimalAttribute(att) {
    var value = att.Value;
    _numberBaseAttribute.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'decimal'.
        /// </summary>
        /// <returns type="String" />
        return "decimal";
    };

}
_decimalAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// DOUBLE ===================================================================
function _doubleAttribute(att) {
    var value = att.Value;
    _numberBaseAttribute.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'double'.
        /// </summary>
        /// <returns type="String" />
        return "double";
    };

}
_doubleAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// INTEGER ===================================================================
function _integerAttribute(att) {
    var value = att.Value;
    _numberBaseAttribute.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'integer'.
        /// </summary>
        /// <returns type="String" />
        return "integer";
    };

}
_integerAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// LOOKUP ===================================================================
function _lookupAttribute(att) {
    var value = att.Value;
    _attributeBase.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'lookup'.
        /// </summary>
        /// <returns type="String" />
        return "lookup";
    };
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the lookup attribute
        /// </summary>
        if (typeof value == "undefined") {
            return null;
        }
        else {
            return value;
        }

    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a lookup attribute.
        /// </summary>
        /// <param name="newValue" type="Array" mayBeNull="true" optional="true" >
        /// The new value for the lookup attribute. This value must be an array of lookup objects
        /// </param>
        if (newValue == null && value != null) {
            value = newValue;
            this.fireOnChange();
            return;
        }
        //(newValue == null && value == null) --> Do nothing
        if (value != newValue) {
            var isValidArray = true;
            for (var i = 0; i < newValue.length; i++) {
                if (!(typeof newValue[i].entityType == "string" && typeof newValue[i].id == "string" && typeof newValue[i].name == "string")) {
                    isValidArray = false;
                }
            }
            if (isValidArray) {
                value = newValue;
                this.fireOnChange();
            }
            else {
                throw new Error("Invalid argument. Use a array of lookup objects parameter value when using setValue on a lookup attribute.");
            }
        }
    };

}
_lookupAttribute.prototype.toString = function () {
    var displayString = "";
    if (this.getValue() == null) {
        displayString = "null";
    }
    else {
        var luov = this.getValue();
        displayString = JSON.stringify(luov)

    }

    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + displayString + "]";
    return stringvalue;
}

// MEMO ===================================================================
function _memoAttribute(att) {
    var value, maxlength;
    value = att.Value;
    maxlength = att.MaxLength;
    _attributeBase.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'memo'.
        /// </summary>
        /// <returns type="String" />
        return "memo";
    };
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the memo attribute
        /// </summary>
        /// <returns type="String" />
        return value;
    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a memo attribute.
        /// </summary>
        /// <param name="newValue" type="String" mayBeNull="true" optional="false" >
        /// The new value for the memo attribute
        /// </param>
        if (newValue == null && value != null) {
            value = newValue;
            this.fireOnChange();
            return;
        }
        //(newValue == null && value == null) --> Do nothing.
        if (typeof newValue == "string") {
            if (value != newValue) {
                if (newValue.length <= maxlength) {
                    value = newValue;
                    this.fireOnChange();
                }
                else {
                    throw new Error("Value too long. The value of the " + this.getName() + " attribute must not exceed " + maxlength + " characters");
                }
            }
        }
        else {
            throw new Error("Invalid argument. Use a null or string parameter value when using setValue on a memo attribute.");
        }
    };
    //email.description is a memo field without a getMaxLength method.
    this.getMaxLength = function () { /// <summary>
        /// Returns a number indicating the maximum length of a string or memo attribute.
        /// </summary>
        /// <returns type="Number" />
        return maxlength;
    };

}
_memoAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : "\'" + this.getValue().toString() + "\'") + "]";
    return stringvalue;
}

// MONEY ===================================================================
function _moneyAttribute(att) {
    var value = att.Value;
    _numberBaseAttribute.call(this, att);
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case 'money'.
        /// </summary>
        /// <returns type="String" />
        return "money";
    };

}
_moneyAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// OPTIONSET ===================================================================
function _optionsetAttribute(att) {
    var initialValue, options, value;
    _attributeBase.call(this, att);
    initialValue = att.InitialValue;
    options = att.Options;
    //Fix for the fact that options with null values are actually "null" but the form snapshot captures them as null.
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == null) {
            options[i].value = "null"
        }
    }

    value = att.Value;
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case "optionset".
        /// </summary>
        /// <returns type="String" />
        return "optionset";
    };
    this.getInitialValue = function () {
        /// <summary>
        /// Returns the value of the optionset when the record was last saved or the default value before the record is saved.
        /// </summary>
        /// <returns type="Number" />
        return initialValue;
    }
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the optionset attribute
        /// </summary>
        /// <returns type="Number" />
        return value;
    };
    this.getOption = function (value) {

        /// <summary>
        /// Returns an option object with the value matching the argument passed to the method.
        /// </summary>
        /// <returns type="Object" />		
        /// <param name="value" mayBeNull="false" optional="false" >
        /// The value to use to select the option
        /// </param>
        if (value == null) {
            throw new Error("Invalid argument. Use a Number or String parameter value when using getOption on a optionset attribute.");
        }
        var searchValue;
        if (typeof value == "string") {
            searchValue = parseInt(value, 10);
            if (isNan(searchValue)) {
                throw new Error("Invalid argument. String argument only valid if it can be converted to a number when using getOption on a optionset attribute.");
            }
        }
        else {
            if (typeof value == "number") {
                searchValue = value;
            }
            else {

                throw new Error("Invalid argument. Use a Number or String parameter value when using getOption on a optionset attribute.");
            }
        }
        for (var i = 0; i < options.length; i++) {
            if (searchValue == options[i].value) {
                return options[i];
            }
        }
    };

    this.getSelectedOption = function () {
        /// <summary>
        /// Returns the currently selected option
        /// </summary>
        /// <returns type="Object" />
        for (var i = 0; i < options.length; i++) {
            if (value == options[i].value) {
                return options[i];
            }
        }
    };
    this.getText = function () {
        /// <summary>
        /// Returns the text of the currently selected option;
        /// </summary>
        /// <returns type="String" />}
        return this.getSelectedOption().text;
    };

    this.getOptions = function () {
        /// <summary>
        /// Retrieves the available options
        /// </summary>
        /// <returns type="Array" />
        return options;
    }
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a optionset attribute.
        /// </summary>
        /// <param name="newValue" type="Number" mayBeNull="true" optional="false" >
        /// The new value for the optionset attribute
        /// </param>
        if (newValue == null && value != null) {
            value = newValue;
            this.fireOnChange();
            return;
        }
        //(newValue == null && value == null) --> Do nothing
        if (typeof newValue == "number") {
            if (value != newValue) {
                var isValidValue = false;
                for (var i = 0; i < options.length; i++) {
                    if (newValue = options[i].value) {
                        isValidValue = true;
                        break;
                    }
                }
                if (isValidValue) {
                    value = newValue;
                    this.fireOnChange();
                }
                else {
                    throw new Error("Invalid argument. " + newValue + " is not a valid parameter value when using setValue on the " + this.getName() + " optionset attribute.");
                }

            }
        }
        else {
            throw new Error("Invalid argument. Use a null or Number parameter value when using setValue on a optionset attribute.");
        }
    };

}
_optionsetAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : this.getValue().toString()) + "]";
    return stringvalue;
}

// STRING ===================================================================
function _stringAttribute(att) {
    var maxLength, value;
    _attributeBase.call(this, att);
    maxLength = att.MaxLength;
    value = att.Value;
    this.getAttributeType = function () {
        /// <summary>
        /// Returns a string value that represents the type of attribute. In this case, 'string'.
        /// </summary>
        /// <returns type="String" />
        return "string";
    };
    this.getMaxLength = function () { /// <summary>
        /// Returns a number indicating the maximum length of a string or memo attribute.
        /// </summary>
        /// <returns type="Number" />
        return maxLength;
    };
    this.getValue = function () {
        /// <summary>
        /// Retrieves the data value for the string attribute
        /// </summary>
        /// <returns type="String" />
        return value;
    };
    this.setValue = function (newValue) {
        /// <summary>
        /// Sets the data value for a string attribute.
        /// </summary>
        /// <param name="newValue" type="String" mayBeNull="true" optional="false" >
        /// The new value for the String attribute
        /// </param>
        if (newValue == null && value != null) {
            value = newValue;
            this.fireOnChange();
            return;
        }
        //(newValue == null && value == null) - > Do nothing.
        if (typeof newValue == "string") {
            if (value != newValue) {
                if (newValue.length <= maxLength) {
                    value = newValue;
                    this.fireOnChange();
                }
                else {
                    throw new Error("Value too long. The maximum length for the " + this.getName() + " attribute is " + maxLength);
                }
            }
        }
        else {
            throw new Error("Invalid argument. Use a null or String parameter value when using setValue on a string attribute.");
        }
    };

}
_stringAttribute.prototype.toString = function () {
    var stringvalue = "[object " + this.getAttributeType() + " attribute : \'" + this.getName() + "\' : " + ((this.getValue() == null) ? "null" : "\'" + this.getValue().toString() + "\'") + "]";
    return stringvalue;
}
//End Attribute definitions  -------------------------------------------------------------------

// =====================================================
// TABS ==========================================
// =====================================================
//Start tabs definitions  -------------------------------------------------------------------

function _tabCollection(pageData) {
    var tabs = {};
    for (var i = 0; i < pageData.Tabs.length; i++) {
        var tab = pageData.Tabs[i];
        tabs[tab.Name] = new _tab(tab);
    }
    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
        /// The delegate_function must include parameters for tab and index. i.e : MyFunction(tab,index).
        /// </param>
        if (typeof delegate_function == "function") {
            var i = 0;
            for (var tab in tabs) {
                delegate_function(tabs[tab], i);
                i++;
            }
        }
        else {
            throw new Error("The tab collection forEach method requires a function as a parameter.");
        }

    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more tabs depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the attributes.</para>
        /// <para>2: String: Returns the attribute where the argument matches the Id.</para>
        /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
        /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
        /// </param>
        var argType = typeof argument;

        if (argument == null) {
            var allTabs = [];
            for (var tab in tabs) {
                allTabs.push(tabs[tab]);
            }
            return allTabs;
        }

        switch (argType) {
            case "number":
                var i = 0;
                for (var tab in tabs) {
                    if (argument == i) {
                        return tabs[tab];
                    }
                    i++;
                }
                return null;
                break;
            case "string":
                return tabs[argument];
                break;
            case "function":
                var returnTabs = [];
                var i = 0;
                for (var tab in tabs) {
                    if (argument(tabs[tab], i)) {
                        returnTabs.push(tabs[tab]);
                    }
                    i++;
                }
                return returnTabs
                break;
        }

    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return pageData.Tabs.length;;
    };

}
_tabCollection.prototype.toString = function () {
    var stringvalue = "[object tab collection " + this.getLength() + " tabs]";
    return stringvalue;
}

function _tab(tab) {
    var label, name, displayState, visible, sections;
    label = tab.Label;
    name = tab.Name;
    displayState = tab.DisplayState;
    visible = tab.Visible;
    this.sections = new _sectionCollection(tab.Sections, this);
    this.getDisplayState = function () {
        /// <summary>
        /// Returns the display state for the tab
        /// </summary>
        /// <returns type="String" />
        return displayState;

    };
    this.getLabel = function () {
        /// <summary>
        /// Returns the label for the tab
        /// </summary>
        /// <returns type="String" />
        return label;

    };
    this.getName = function () {
        /// <summary>
        /// Returns the name for the tab
        /// </summary>
        /// <returns type="String" />
        return name;

    };
    this.getParent = function () {
        /// <summary>
        /// Returns a reference to Xrm.Page.ui
        /// </summary>
        return function () {
            return Xrm.Page.ui;
        }()
    };
    this.getVisible = function () {
        /// <summary>
        /// Returns a value that indicates whether the tab is currently visible.
        /// </summary>
        /// <returns type="Boolean" />
        return visible;
    };
    this.setDisplayState = function (state) {
        /// <summary>
        /// Sets the display state for the tab.
        /// </summary>
        /// <param name="state" type="String" mayBeNull="false" optional="false" >
        /// The state of the tab either expanded or collapsed
        /// </param>
        if (state == "expanded" || state == "collapsed") {
            displayState = state;
        }
        else {
            throw new Error("Invalid argument. Valid values are \"expanded\" and \"collapsed\".")
        }
    };
    this.setFocus = function () {
        /// <summary>
        /// Sets the focus on the tab.
        /// </summary>
    };
    this.setLabel = function (newLabel) {
        /// <summary>
        /// Sets the label for the tab.
        /// </summary>
        /// <param name="newLabel" type="String" mayBeNull="false" optional="false" >
        /// The text of the label.
        /// </param>
        if (typeof newLabel == "string") {
            label = newLabel;
        }
        else {
            throw new Error("Invalid argument. String type expected.")
        }
    };
    this.setVisible = function (isVisible) {
        /// <summary>
        /// Sets a value that indicates whether the tab is visible.
        /// </summary>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is visible
        /// </param>
        if (typeof isVisible == "boolean") {
            visible = isVisible;
        }
        else {
            throw new Error("Invalid argument. Boolean type expected.")
        }
    };
}
_tab.prototype.toString = function () {
    var stringvalue = "[object tab:  '" + this.getName() + "' label: '" + this.getLabel() + "' visible: " + this.getVisible() + " displayState: " + this.getDisplayState() + "]";
    return stringvalue;
}
//End tabs definitions  -------------------------------------------------------------------

// =====================================================
// SECTIONS ==========================================
// =====================================================
//Start sections definitions  -------------------------------------------------------------------

function _sectionCollection(sc, parentTab) {
    var sections = {};
    var length = sc.length;
    for (var i = 0; i < sc.length; i++) {
        sections[sc[i].Name] = new _section(sc[i], parentTab);
    }
    this.forEach = function (delegate_function) {
        /// <summary>
        /// Applies the action contained within a delegate function.
        /// </summary>
        /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
        /// The delegate_function must include parameters for section and index. i.e : MyFunction(section,index).
        /// </param>
        var i = 0;
        for (var sec in sections) {
            delegate_function(sections[sec], i);
            i++;
        }
    };
    this.get = function (argument) {
        /// <summary>
        /// Returns one or more tabs depending on the arguments passed.
        /// </summary>
        /// <param name="argument" mayBeNull="true" optional="true" >
        /// <para>1: None: Returns an array of all the attributes.</para>
        /// <para>2: String: Returns the attribute where the argument matches the name.</para>
        /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
        /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
        /// </param>
        var argType = typeof argument;

        if (argument == null) {
            var allSections = [];
            for (var sec in sections) {
                allSections.push(sections[sec]);
            }
            return allSections;
        }

        switch (argType) {
            case "number":
                var i = 0;
                for (var sec in sections) {
                    if (i == argument) {
                        return sections[sec];
                    }
                    i++
                }
                return null;
                break;
            case "string":
                return sections[argument];
                break;
            case "function":
                var returnSections = [];
                var i = 0;
                for (var sec in sections) {
                    if (argument(sections[sec], i)) {
                        returnSections.push(sections[sec]);
                    }
                    i++;
                }
                return returnSections;
                break;
        }

    };
    this.getLength = function () {
        /// <summary>
        /// Returns the number of items in the collection.
        /// </summary>
        /// <returns type="Number" />
        return length;
    };

}
_sectionCollection.prototype.toString = function () {
    var stringvalue = "[object section collection " + this.getLength() + " sections]";
    return stringvalue;
}

function _section(s, parentTab) {
    var label, name, visible, parent, controlNames;
    label = s.Label;
    name = s.Name;
    visible = s.Visible;
    parent = parentTab;
    controlNames = [];
    for (var i = 0; i < s.Controls.length; i++) {
        controlNames.push(s.Controls[i]);
    }
    this.getLabel = function () {
        /// <summary>
        /// Returns the label for the section
        /// </summary>
        /// <returns type="String" />
        return label;

    };
    this.getName = function () {
        /// <summary>
        /// Returns the name for the section
        /// </summary>
        /// <returns type="String" />
        return name;

    };
    this.getParent = function () {
        /// <summary>
        /// Returns a reference to the tab object that contains the section.
        /// </summary>
        return parent;
    };
    this.getVisible = function () {
        /// <summary>
        /// Returns a value that indicates whether the section is currently visible.
        /// </summary>
        /// <returns type="Boolean" />

        return visible;
    };
    this.setLabel = function (newLabel) {
        /// <summary>
        /// Sets the label for the section.
        /// </summary>
        /// <param name="label" type="String" mayBeNull="false" optional="false" >
        /// The text of the label.
        /// </param>
        if (typeof newLabel == "string") {
            label = newLabel;
        }
        else {
            throw new Error("Section setLabel method requires a string parameter value.")
        }

    };
    this.setVisible = function (isVisible) {
        /// <summary>
        /// Sets a value that indicates whether the section is visible.
        /// </summary>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is visible
        /// </param>
        if (typeof isVisible == "boolean") {
            visible = isVisible;
        }
        else {
            throw new Error("Section setVisible method requires a boolean parameter value.")
        }
    };
    this.controls = new _childControlsCollection(controlNames);

}
_section.prototype.toString = function () {
    var stringvalue = "[object section:  '" + this.getName() + "' label: '" + this.getLabel() + "' visible: " + this.getVisible() + "]";
    return stringvalue;
}
//End sections definitions  -------------------------------------------------------------------

// =====================================================
// CONTROLS ==========================================
// =====================================================

//Start Control definitions  -------------------------------------------------------------------

// BASE Control ===================================================================
function _baseControl(ctrl) {
    var name, label, visible, parent;
    name = ctrl.Name;
    //disabled = ctrl.Disabled;
    label = ctrl.Label;
    visible = ctrl.Visible;
    parent = ctrl.parent;
    this.getName = function () {
        /// <summary>
        /// Returns a name for the control that is set at runtime.
        /// </summary>
        /// <returns type="String" />
        return name;
    };
    this.getLabel = function () {
        /// <summary>
        /// Returns the label for the control
        /// </summary>
        /// <returns type="String" />
        return label;

    };
    this.getParent = function () {
        /// <summary>
        /// Returns a reference to the section object that contains the control.
        /// </summary>
        var foundSection = null;
        Xrm.Page.ui.tabs.forEach(function (tab, i) {
            tab.sections.forEach(function (section, i) {
                if (section.getName() == parent) {
                    foundSection = section;
                }
            });
        });
        if (foundSection == null) {
            throw new Error("Control " + parent + " parent section not found.");
        }
        return foundSection;
    };
    this.getVisible = function () {
        /// <summary>
        /// Returns a value that indicates whether the control is currently visible.
        /// </summary>
        /// <returns type="Boolean" />

        return visible;
    };
    this.setFocus = function () {
        /// <summary>
        /// Sets the focus on the control.
        /// </summary>
    };
    this.setLabel = function (newLabel) {
        /// <summary>
        /// Sets the label for the control.
        /// </summary>
        /// <param name="newLabel" type="String" mayBeNull="false" optional="false" >
        /// The text of the label.
        /// </param>
        if (typeof newLabel == "string") {
            label = newLabel;
        }
        else {
            throw new Error("Control setLabel method requires a string parameter value.")
        }
    };
    this.setVisible = function (isVisible) {
        /// <summary>
        /// Sets a value that indicates whether the control is visible.
        /// </summary>
        /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is visible
        /// </param>
        if (typeof isVisible == "boolean") {
            visible = isVisible;
        }
        else {
            throw new Error("Control setVisible method requires a boolean parameter value.");
        }

    };
    this.setNotification = function (notification) {
        /// <summary>
        /// Set a field specific notification
        /// </summary>
        /// <param name="notification" type="String" mayBeNull="false" optional="false" >
        /// The notification to be displayed next to the field
        /// </param>
    };
}

// STANDARD Control ===================================================================
function _standardControl(ctrl) {
    _baseControl.call(this, ctrl);
    var attribute = ctrl.Attribute;
    var disabled = ctrl.Disabled;

    this.getAttribute = function () {
        /// <summary>
        /// Returns the attribute that the control is bound to.
        /// </summary>
        if (attribute == null) {
            return null;
        }
        else {
            return _attDictionary[attribute];
        }

    };
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "standard".
        /// </summary>
        /// <returns type="String" />
        return "standard";
    };
    this.getDisabled = function () {
        /// <summary>
        /// Returns whether the control is disabled.
        /// </summary>
        /// <returns type="Boolean" />
        return disabled;
    };
    this.setDisabled = function (isDisabled) {
        /// <summary>
        /// Sets whether the control is disabled.
        /// </summary>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is disabled.
        /// </param>
        if (typeof isDisabled == "boolean") {
            disabled = isDisabled;
        }
        else {
            throw new Error("Control setDisabled method requires a Boolean parameter value.")
        }
    };
}
_standardControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// iframe Control ===================================================================
function _iframeControl(ctrl) {
    _baseControl.call(this, ctrl);
    var src, initialUrl;
    src = ctrl.Src;
    initialUrl = ctrl.InitialUrl;
    var disabled = ctrl.Disabled;
    this.getDisabled = function () {
        /// <summary>
        /// Returns whether the control is disabled.
        /// </summary>
        /// <returns type="Boolean" />
        return disabled;
    };
    this.setDisabled = function (isDisabled) {
        /// <summary>
        /// Sets whether the control is disabled.
        /// </summary>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is disabled.
        /// </param>
        if (typeof isDisabled == "boolean") {
            disabled = isDisabled;
        }
        else {
            throw new Error("Control setDisabled method requires a Boolean parameter value.")
        }
    };
    this.getData() = function () {
        /// <summary>
        /// Returns the value of the data query string parameter passed to a Silverlight web resource.
        /// </summary>
        /// <returns type="String" />
    };
    this.setData(data) = function () {
        /// <summary>
        /// Sets the value of the data query string parameter passed to a Silverlight web resource.
        /// </summary>
        /// <param name="data" type="String" mayBeNull="true" optional="true" >
    };
    this.getObject() = function () {
        /// <summary>
        /// Returns the object in the form that represents an I-frame or web resource.
        /// </summary>
        /// <returns type="Object" />
    };
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "iframe".
        /// </summary>
        /// <returns type="String" />
        return "iframe";
    };
    this.getSrc = function () {
        /// <summary>
        /// Returns a value for the URL to be displayed in an IFrame.
        /// </summary>
        /// <returns type="String" />
        return src;
    };
    this.setSrc = function (uri) {
        /// <summary>
        /// Sets the URL to be displayed in an IFrame.
        /// </summary>
        /// <param name="uri" type="Boolean" mayBeNull="false" optional="false" >
        /// The URL to be displayed in an IFrame.
        /// </param>
        if (typeof uri == "string") {
            src = uri;
        }
        else {
            throw new Error("IFRAME Control setSrc method requires a string parameter value.")
        }

    }
    this.getInitialUrl = function () {
        /// <summary>
        /// Returns the default URL that an IFrame control is configured to display.
        /// </summary>
        /// <returns type="String" />
        return initialUrl;
    };
}
_iframeControl.prototype.toString = function () {
    var stringvalue = "[object" + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// Lookup Control ===================================================================
function _lookupControl(ctrl) {
    _baseControl.call(this, ctrl);
    var attribute, defaultView;
    defaultView = ctrl.DefaultView
    attribute = ctrl.Attribute;
    var disabled = ctrl.Disabled;
    this.getDisabled = function () {
        /// <summary>
        /// Returns whether the control is disabled.
        /// </summary>
        /// <returns type="Boolean" />
        return disabled;
    };
    this.setDisabled = function (isDisabled) {
        /// <summary>
        /// Sets whether the control is disabled.
        /// </summary>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is disabled.
        /// </param>
        if (typeof isDisabled == "boolean") {
            disabled = isDisabled;
        }
        else {
            throw new Error("Control setDisabled method requires a Boolean parameter value.")
        }
    };
    this.addCustomView = function (viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
        /// <summary>
        /// Adds a new view for the lookup dialog.
        /// </summary>
        /// <param name="viewId" type="String" mayBeNull="false" optional="false" >
        /// The string representation of a GUID Id for a view.
        /// </param>
        /// <param name="entityName" type="String" mayBeNull="false" optional="false" >
        /// The name of the entity.
        /// </param>
        /// <param name="viewDisplayName" type="String" mayBeNull="false" optional="false" >
        /// The name of the view.
        /// </param>
        /// <param name="fetchXml" type="String" mayBeNull="false" optional="false" >
        /// The fetchXml query for the view.
        /// </param>
        /// <param name="layoutXml" type="String" mayBeNull="false" optional="false" >
        /// The XML defining the layout of the view.
        /// </param>
        /// <param name="isDefault" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the view should be the default view.
        /// </param>
        if (typeof viewId != "string" || typeof entityName != "string" || typeof viewDisplayName != "string" || typeof fetchXml != "string" || typeof layoutXml != "string" || typeof isDefault != "boolean") {
            throw new Error("One or more of the parameters passed to the Lookup Control addCustomView method are not the correct type.");
        }
        if (isDefault) {
            defaultView = viewId;
        }
    };
    this.getAttribute = function () {
        /// <summary>
        /// Returns the attribute that the control is bound to.
        /// </summary>
        return _attDictionary[attribute];
    };
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "lookup".
        /// </summary>
        /// <returns type="String" />
        return "lookup";
    };
    this.getDefaultView = function () {
        /// <summary>
        /// Returns the Id value of the default lookup dialog view.
        /// </summary>
        /// <returns type="String" />
        return defaultView;
    };
    this.setDefaultView = function (viewGuid) {
        /// <summary>
        /// Sets the Id value of the default lookup dialog view.
        /// </summary>
        /// <returns type="String" />
        /// <param name="viewGuid" type="String" mayBeNull="false" optional="false" >
        /// String specifies the GUID for the default view
        /// </param>

        if (typeof viewGuid == "string") {
            if (/\{[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\}/.test(viewGuid)) {
                defaultView = viewGuid;
            }
            else {
                throw new Error("Lookup control setDefaultView string parameter is not properly formatted to represent a GUID value. Example: {C7034F4F-6F92-4DD7-BD9D-9B9C1E996380}")
            }

        }
        else {
            throw new Error("Lookup control setDefaultView requires a string parameter value.")
        }
    };
    this.addCustomFilter = function (fetchFilter, entityType) {
        /// <summary>
        /// Used to add additional filters to the results displayed in the lookup. Each filter will be combined with any previously added filters as an ‘AND’ condition.
        /// </summary>
        /// <param name="fetchFilter" type="String" mayBeNull="false" optional="false" >
        /// The fetchXml filter element to apply.
        /// </param>
        /// <param name="entityType" type="String" mayBeNull="false" optional="true" >
        /// If this is set the filter will only apply to that entity type. Otherwise it will apply to all types of entities returned.
        /// </param>
    };
    this.addPreSearch = function (handler) {
        /// <summary>
        /// Use this method to apply changes to lookups based on values current just as the user is about to view results for the lookup. This method is only available for Updated Entities.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false" >
        /// Function to add.
        /// </param>
    };
    this.removePreSearch = function (handler) {
        /// <summary>
        /// Use this method to remove event handler functions that have previously been set for the PreSearch event.
        /// </summary>
        /// <param name="handler" type="Function" mayBeNull="false" optional="false" >
        /// Function to remove.
        /// </param>
    };
}
_lookupControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// optionset Control ===================================================================
function _optionsetControl(ctrl) {
    _baseControl.call(this, ctrl);
    var attribute, options;

    attribute = ctrl.Attribute;
    options = [];
    var disabled = ctrl.Disabled;

    try {
        options = _attDictionary[attribute].getOptions();
    }
    catch (e) {
        //If a Boolean Attribute is formatted as a list, it has a optionset control but the attribute
        // doesn't support the getOptions methods resulting in the following error.
        if (e.number == -2146827850) {
            //Setting a pair of Boolean value options to simulate a boolean attribute.
            options.push({
                "text": "True",
                "value": 1
            });
            options.push({
                "text": "False",
                "value": 0
            });
        }
        else {
            throw (e);
        }

    }
    this.getDisabled = function () {
        /// <summary>
        /// Returns whether the control is disabled.
        /// </summary>
        /// <returns type="Boolean" />
        return disabled;
    };
    this.setDisabled = function (isDisabled) {
        /// <summary>
        /// Sets whether the control is disabled.
        /// </summary>
        /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
        /// Whether the control is disabled.
        /// </param>
        if (typeof isDisabled == "boolean") {
            disabled = isDisabled;
        }
        else {
            throw new Error("Control setDisabled method requires a Boolean parameter value.")
        }
    };

    this.addOption = function (option, index) {
        /// <summary>
        /// Adds an option to an Option set control.
        /// </summary>
        /// <param name="option" type="Object" mayBeNull="false" optional="false" >
        /// An option object to add to the OptionSet. For example: { "text": "Item A", "value": "100000000" }
        /// </param>
        /// <param name="index" type="Number" mayBeNull="true" optional="true" >
        ///  (Optional) The index position to place the new option. If not provided the option will be added to the end.
        /// </param>
        if ((option != null) && (typeof option.text == "string") && (typeof option.value == "number" || option.value == null)) {
            if (index != null) {
                var newOptions = [];
                for (var i = 0; i < options; i++) {
                    if (i == index) {
                        newOptions.push(option);
                        i--;
                    }
                    else {
                        newOptions.push(options[i]);
                    }
                }
                options = newOptions;
            }
            else {
                options.push(option);
            }
        }
        else {
            throw new Error("Optionset control addOption method requires an option object with a string 'text' property and an number 'value' property.");
        }

    };
    this.getAttribute = function () {
        /// <summary>
        /// Returns the attribute that the control is bound to.
        /// </summary>
        return _attDictionary[attribute];
    };
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "optionset".
        /// </summary>
        /// <returns type="String" />
        return "optionset";
    };
    this.clearOptions = function () {
        /// <summary>
        /// Clears all options from an Option Set control.
        /// </summary>
        options = [];
    };
    this.removeOption = function (value) {
        /// <summary>
        /// Removes an option from an Option Set control.
        /// </summary>
        /// <param name="value" type="Number" mayBeNull="false" optional="false" >
        /// The value of the option you want to remove.
        /// </param>
        if (value != null && typeof value == "number") {
            var newOptions = [];
            for (var i = 0; i < options.length; i++) {
                if (options[i].value == value) {
                    i++;
                }
                else {
                    newOptions.push(options[i]);
                }
            }
            options = newOptions;
        }
        else {
            throw new Error("Optionset control removeOption method requires a number parameter value.");
        }
    }
}
_optionsetControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// subGrid Control ===================================================================
function _subgridControl(ctrl) {
    _baseControl.call(this, ctrl);

    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "subgrid".
        /// </summary>
        /// <returns type="String" />
        return "subgrid";
    };
    this.refresh = function () {
        /// <summary>
        /// Refreshes the data displayed in a Sub-Grid
        /// </summary>
    };

}
_subgridControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}

// webResource Control ===================================================================
function _webresourceControl(ctrl) {
    _baseControl.call(this, ctrl);
    var src = ctrl.Src;
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "webresource".
        /// </summary>
        /// <returns type="String" />
        return "webresource";
    };
    this.getSrc = function () {
        /// <summary>
        /// Returns a value for the URL to be displayed in an Web Resource.
        /// </summary>
        /// <returns type="String" />
        return src;
    };
    this.setSrc = function (uri) {
        /// <summary>
        /// Sets the URL to be displayed in an Web Resource.
        /// </summary>
        /// <param name="uri" type="Boolean" mayBeNull="false" optional="false" >
        /// The URL to be displayed in an IFrame.
        /// </param>
        if (typeof uri == "string") {
            src = uri;
        }
        else {
            throw new Error("Web resource control setSrc method requires a string parameter value.");
        }
    }
}
_webresourceControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}
// Notes Control ===================================================================
function _notesControl(ctrl) {
    _baseControl.call(this, ctrl);
    var disabled = ctrl.Disabled;
    this.getControlType = function () {
        /// <summary>
        /// Returns a String describing the type of control. In this case "notes".
        /// </summary>
        /// <returns type="String" />
        return "notes";
    };

}
_notesControl.prototype.toString = function () {
    var stringvalue = "[object " + this.getControlType() + " control : \'" + this.getName() + "\' label: '" + this.getLabel() + "\' visible: " + this.getVisible() + "]";
    return stringvalue;
}
//End Control definitions  -------------------------------------------------------------------

//Placeholders for the supported MS AJAX date functions found in the XrmPage.
//NOTE: These do not necessarily match the actual return values

// format method: See http://msdn.microsoft.com/en-us/library/bb384009.aspx
Date.prototype.format = function () {
    /// <summary>
    /// <para>Formats a date as a string using the user's Microsoft CRM locale preferences.</para>
    /// <para>NOTE: This function is simulated in the XrmPageTemplate. It uses the operating system locale.</para>
    /// </summary>
    return this.toString();
};
// localeFormat method: See http://msdn.microsoft.com/en-us/library/bb383816.aspx
Date.prototype.localeFormat = function () {
    /// <summary>
    /// <para>Formats a date Formats a date as a string using the user's Microsoft CRM locale preferences.</para>
    /// <para>NOTE: This function is simulated in the XrmPageTemplate. It uses the operating system locale.</para>
    /// </summary>
    return this.toLocaleString();
};
// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.InteleViewerLaunch = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.InteleViewerLaunch", this);
    },

    componentType :"UntzUntz.InteleViewerLaunch",
    
    doAction: function() {
    
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
		Core.Debug.consoleWrite("CHECKING REMOTE OR LOCAL");
        
        var updateEvent = {type: "action", source: this, actionCommand: "launchAction"};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.InteleViewerLaunch) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.InteleViewerLaunch)");
			this.fireEvent(updateEvent);
		}		
		
    }
    
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.InteleViewerLaunch.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.InteleViewerLaunch", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    _baseUrl: null,
    _userName: null,
    _sessionId: null,
    _accNum: null,
    _patId: null,
    
	_updateProperty: function(propertyName, oldValue, newValue) {
        
        // Create an update event
         var updateEvent = {type: "componentUpdate", 
                            parent: this.component, 
                            propertyName: propertyName, 
                            oldValue: oldValue, 
                            newValue: newValue};
                            
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class

        var client = this.component.application.client;
        
        // For RemoteClient, process the property update explicitly; for
        //   FreeClient, simply set the property
        if(client._processClientUpdate)
            Core.Web.Scheduler.run( function() {client._processClientUpdate(updateEvent)});
        else
            this.component.set(propertyName, newValue);
    },
    
    launchStatus: function(launchResult) {
    
		this._updateProperty('launchResult', '', launchResult);
		Core.Debug.consoleWrite("launchResult => " + launchResult);
		this.component.doAction();
    
    },
    
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
    	this._baseUrl = this.component.render("baseUrl");
    	this._userName = this.component.render("userName");
    	this._sessionId = this.component.render("sessionId");
    	this._accNum = this.component.render("accessionNumber");
    	this._patId = this.component.render("patientId");
    	
    	
    	var oViewer = null;
  	
		try {
			oViewer = new ActiveXObject("InteleviewerServer.InteleViewerContro.1");
		} catch(e) {
        	this.launchStatus("failed/activex");
			Core.Debug.consoleWrite("Failed to load ActiveX for viewer: " + e);
        	return;
		}

		try {	
			oViewer.baseUrl = this._baseUrl;
			oViewer.username = this._userName;
			oViewer.sessionId = this._sessionId;
		} catch(e) {
        	this.launchStatus("failed/activex-open1");
			Core.Debug.consoleWrite("Failed to set values on viewer object: " + e);
			return;
		}
		
		try {	
			iRet = oViewer.loadOrder(this._accNum, this._patId);
		} catch(e) {
        	this.launchStatus("failed/activex-open2");
			Core.Debug.consoleWrite("Failed to call loadOrder method [" + this._baseUrl + "|" + this._userName + "|" + this._sessionId + "|" + this._accNum + "|" + this._patId + "]: " + e);
			return;
        }

		Core.Debug.consoleWrite("Successfully Launched PACS Viewer");
        this.launchStatus("success/activex");
		    	
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        this.renderAdd(update, this._containerElement);
        return false; // Child elements not supported: safe to return false.
    }
    
});

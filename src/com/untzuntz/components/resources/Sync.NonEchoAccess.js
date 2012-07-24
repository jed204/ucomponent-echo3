// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.NonEchoAccess = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.NonEchoAccess", this);
        Echo.ComponentFactory.registerType("UNE", this);
    },
    
    doAction: function(action) {
		
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
        var updateEvent = {type: "action", source: this, actionCommand: action};
        var client = this.application.client;
        if(client != null && client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.NonEchoAccess) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.NonEchoAccess)");
			this.fireEvent(updateEvent);
		}		
    },

    componentType :"UntzUntz.NonEchoAccess"
    
});

/**
	
	NonEchoAccess Wrapper
	

*/
UntzUntz.NonEchoAccess.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.NonEchoAccess", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    
    runAction: function(action) {
		this._updateProperty('actionMessage', '', action);
		this.component.doAction(action);
    },
    
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
        if(client != null && client._processClientUpdate)
            Core.Web.Scheduler.run( function() {client._processClientUpdate(updateEvent)});
        else
            this.component.set(propertyName, newValue);
    },
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
        this._containerElement = parentElement;
    	this._node = document.createElement("span");
    	this._node.id = this.component.renderId;

        if (this._node) {
            parentElement.appendChild(this._node);
        }

		window.nonEchoAccess = this;
    },

    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    
    	if (this._containerElement)
	 	   	this._containerElement.removeChild(this._node);
        this._containerElement = null;
        this._node = null;
		window.nonEchoAccess = null;
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        return false; // Child elements not supported: safe to return false.
    }
    
});

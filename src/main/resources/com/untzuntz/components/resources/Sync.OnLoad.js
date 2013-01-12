// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.OnLoad = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.OnLoad", this);
        Echo.ComponentFactory.registerType("UOL", this);
    },

    doAction: function(action) {
		
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
		Core.Debug.consoleWrite("CHECKING REMOTE OR LOCAL");
        
        var updateEvent = {type: "action", source: this, actionCommand: action};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.OnLoad) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.OnLoad)");
			this.fireEvent(updateEvent);
		}		
    },
    
    componentType :"UntzUntz.OnLoad"
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.OnLoad.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.OnLoad", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
        this._containerElement = parentElement;

		var chk = document.getElementById('onloadUntz');
        if (chk == null)
		{
			Core.Debug.consoleWrite("Calling 'PageLoaded' => Parent: " + parentElement.id + " > Node = " + this._node);
			if (this._node != null)
				Core.Debug.consoleWrite("Calling 'PageLoaded' => Parent: " + parentElement.id + " > Node = " + this._node.id);
			this.component.doAction('pageLoaded');
		}
		else
			Core.Debug.consoleWrite("Existing Node -> Skipping 'PageLoaded' call");
		
        this._node = document.createElement("div");
        this._node.id = "onloadUntz";
        var parent = document.getElementById('body');
        if (parent != null)
	        parent.appendChild(this._node);
        
		Core.Debug.consoleWrite(" > Node = " + this._node.id);
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    
        var parent = document.getElementById('body');
        parent.removeChild(this._node);
        this._containerElement = null;
        this._node = null;
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        if (this._node) {
            this._node.parentNode.removeChild(this._node);
        }
        // Note: this.renderDispose() is not invoked (it does nothing).
        this.renderAdd(update, this._containerElement);
        return false; // Child elements not supported: safe to return false.
    }
    
});

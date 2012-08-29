// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.ActiveXControl = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.ActiveXControl", this);
        Echo.ComponentFactory.registerType("UAX", this);
    },
    
    doAction: function(action) {
		
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
        var updateEvent = {type: "action", source: this, actionCommand: action};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.ActiveXControl) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.ActiveXControl)");
			this.fireEvent(updateEvent);
		}		
    },

    componentType :"UntzUntz.ActiveXControl"
    
});

/**
	
	ActiveXControl Wrapper
	
	Provides:
		- Check if control is installed and will launch
		- Load control into a div w/ parameters
		- Receive and push events (and resulting data) back to caller

	Notes:
		- To avoid duplicate events or activex controls this code will only render the control one 
		  time (remove control and re-add to reprocess)
		- uActiveXCtrl is currently a global variable. While not ideal it was the only way events 
		  could be tied back to the control. Impact is that there can only be one of these controls 
		  in view at a time.

*/
UntzUntz.ActiveXControl.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.ActiveXControl", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    fullRender: true,
    
    runAction: function(action, message) {
		this._updateProperty('actionMessage', '', message);
		this._updateProperty('actionName', '', action);
		Core.Debug.consoleWrite("Action From Client Component : " + action + " / " + message);
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
        if(client._processClientUpdate)
            Core.Web.Scheduler.run( function() {client._processClientUpdate(updateEvent)});
        else
            this.component.set(propertyName, newValue);
    },
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
        this._containerElement = parentElement;
        var foreground = this.component.render("foreground"),
        background = this.component.render("background");

    	this._node = document.createElement("span");
    	this._node.id = this.component.renderId;

        if (this._node) {
            parentElement.appendChild(this._node);
        }

		var activeXControlId = this.component.render("activeXControlId");
		var objectClassId = this.component.render("objectClassId");
		var codeBase = this.component.render("codeBase");
		var controlWidth = this.component.render("controlWidth");
		var controlHeight = this.component.render("controlHeight");

		// setup the object for use in the callback
		uActiveXCtrl = this;
			
		if (activeXControlId)
		{
			try {
		
				var v = new ActiveXObject(activeXControlId);
				this.runAction("activeXLoadPass", "Success");
		
			} catch(e) {
				this.runAction("activeXLoadFailure", e.message);
				return;
			}
		}
		if (objectClassId) // Create the ActiveX OBJECT HTML
		{
			var object = document.createElement('OBJECT');
			this._node.appendChild(object);
			object.id = this.component.renderId + "ActXObj";
			object.classid = objectClassId;
			// a few optionals
			if (codeBase)
				object.codebase = codeBase;
			if (controlWidth)
				object.width = controlWidth; 
			if (controlHeight)
				object.height = controlHeight; 

			// setup the object's properties
			var idx = 0;
			var property = null;
			while ((property = this.component.render("activeX.Property." + idx)))
			{
				var propSplit = property.split("=>");
				propName = propSplit[0];
				object[propName] = propSplit[1];
				idx++;
			}
			
			idx = 0;
			var eventName = null;
			// for each event attribute set, create a script to handle the callback
			while ((eventName = this.component.render("activeX.Event." + idx)))
			{
				var script = document.createElement('script');
				this._node.appendChild(script);

				// Works in IE 8 & IE 9 --- NOT in IE 6 & 7?
				script.setAttribute("for", this.component.renderId + "ActXObj");
				script.event = eventName;
				script.text = "uActiveXCtrl.processActiveXEvent('" + eventName + "', arguments);";

				idx++;
			}
		}
    	
    	Echo.Sync.renderComponentDefaults(this.component, this._node);
        Echo.Sync.Insets.render(this.component.render("insets"), this._node, "padding");
		this.fullRender = false;
    },

    /** Handle the event callback */
    processActiveXEvent: function(eventName, args){ 

		Core.Debug.consoleWrite("processActiveXEvent() => Args.length = " + args.length);
		
		// set the base value to the number of sub values
		this._updateProperty("activeX.EventResult." + eventName, '', args.length);
		for (var i = 0; i < args.length; i++)
		{
			// set each value
	        this._updateProperty("activeX.EventResult." + eventName + "." + i, '', args[i]);
			Core.Debug.consoleWrite("processActiveXEvent() => activeX.EventResult." + eventName + " = '" + args[i] + "' (" + i + ")");
		}
	
		Core.Debug.consoleWrite("Firing EventReceived Action...");
		this.runAction(eventName, 'EventReceived');

    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._containerElement = null;
        this._node = null;
		uActiveXCtrl = null;
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {

		if (this.fullRender)
		{
	        if (this._node) {
	            this._node.parentNode.removeChild(this._node);
	        }
	        this.renderAdd(update, this._containerElement);
			this.fullRender = false;
		}
        
        return false; // Child elements not supported: safe to return false.
    }
    
});

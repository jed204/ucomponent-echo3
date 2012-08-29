// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.JavaAppletControl = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.JavaAppletControl", this);
        Echo.ComponentFactory.registerType("UJAC", this);
    },
    
    doAction: function(action) {
		
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
		Core.Debug.consoleWrite("CHECKING REMOTE OR LOCAL");
        
        var updateEvent = {type: "action", source: this, actionCommand: action};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.JavaAppletControl) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
			Core.Debug.consoleWrite("Back from REMOTE fired event");
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.JavaAppletControl)");
			this.fireEvent(updateEvent);
			Core.Debug.consoleWrite("Back from LOCAL fired event");
		}		
    },

    componentType :"UntzUntz.JavaAppletControl"
    
});

/**
	
	JavaAppletControl Wrapper
	
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
UntzUntz.JavaAppletControl.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.JavaAppletControl", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    fullRender: true,
    _timerId: null,
    
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
    
		// setup the object for use in the callback
		uCtrl = this;
    
	    this._timerId = setTimeout(function(){uCtrl.timerHit(parent, parentElement);}, 15000);
        PluginDetect.onDetectionDone('Java', 0, '/EvenFlow/ctrl/getJavaInfo.jar', [2, 2, 2]);
    	PluginDetect.onDetectionDone('Java', function() { uCtrl.hasJavaCheckComplete(update, parentElement); }); 
    },
    
    timerHit: function(parent, parentElement) {

	    clearTimeout(this._timerId);
		Core.Debug.consoleWrite("Unable to load java...(timer)");
		this.javaFail("javadidnotload");
    
    },
    
    javaFail: function(reason) {
		this._updateProperty("ctrl.EventResult.launchFailed", '', 1);
	    this._updateProperty("ctrl.EventResult.launchFailed.0", '', reason);
		this.runAction("launchFailed", 'EventReceived');
    },

	hasJavaCheckComplete: function(update, parentElement) {
	
	    clearTimeout(this._timerId);
	    var STATUS = PluginDetect.isMinVersion('Java', '0');

        if (STATUS == 0)
		{
			Core.Debug.consoleWrite("Unable to load java...(direct)");
			javaFail("javanotfound");
			return;		
		}
		
        if (this.component == null)
            return;
        
        this._containerElement = parentElement;
        var foreground = this.component.render("foreground"),
        background = this.component.render("background");

    	this._node = document.createElement("span");
    	this._node.id = this.component.renderId;

        if (this._node) {
            parentElement.appendChild(this._node);
        }
        
	
		var name = this.component.render("name");
		var code = this.component.render("code");
		var archive = this.component.render("archive");
		var codebase = this.component.render("codebase");
		var controlWidth = this.component.render("controlWidth");
		var controlHeight = this.component.render("controlHeight");
			
		if (code) // Create the APPLET HTML
		{
			var object = document.createElement('APPLET');
			this._node.appendChild(object);
			object.id = this.component.renderId + "CtrlObj";
			// a few optionals
			if (codebase)
				object.setAttribute('codeBase', codebase);
			if (archive)
				object.archive = archive;
			if (code)
				object.code = code;
			if (name)
				object.name = name;
			if (controlWidth)
				object.width = controlWidth; 
			if (controlHeight)
				object.height = controlHeight;

			// setup the object's properties
			var idx = 0;
			var property = null;
			while ((property = this.component.render("ctrl.Property." + idx)))
			{
				var propSplit = property.split("=>");
				propName = propSplit[0];
				
				var param = document.createElement('param');
				param.setAttribute('name', propName);
				param.setAttribute('value', propSplit[1]);
				object.appendChild(param);
				
				idx++;
			}
			
			idx = 0;
			var eventName = null;
			// for each event attribute set, create a script to handle the callback
			while ((eventName = this.component.render("ctrl.Event." + idx)))
			{
				object.setAttribute('mayscript', "true");
				
				var script = document.createElement('script');
				this._node.appendChild(script);
				
				script.setAttribute("type", "text/javascript");
				script.text = "function " + eventName + "() { uCtrl.processCtrlEvent('" + eventName + "', arguments); }";
				idx++;
			}
		}
    	
    	Echo.Sync.renderComponentDefaults(this.component, this._node);
        Echo.Sync.Insets.render(this.component.render("insets"), this._node, "padding");
		this.fullRender = false;
    },

    /** Handle the event callback */
    processCtrlEvent: function(eventName, args){ 

		Core.Debug.consoleWrite("processCtrlEvent() => Args.length = " + args.length);
		
		// set the base value to the number of sub values
		this._updateProperty("ctrl.EventResult." + eventName, '', args.length);
		for (var i = 0; i < args.length; i++)
		{
			// set each value
	        this._updateProperty("ctrl.EventResult." + eventName + "." + i, '', args[i]);
			Core.Debug.consoleWrite("processCtrlEvent() => ctrl.EventResult." + eventName + " = '" + args[i] + "' (" + i + ")");
		}
	
		Core.Debug.consoleWrite("Firing EventReceived Action...");
		this.runAction(eventName, 'EventReceived');

    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    	if (this._timerId)
	    	clearTimeout(this._timerId);
	    	
	    this._timerId = null;
        this._containerElement = null;
        this._node = null;
		uCtrl = null;
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
// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.JSTimer = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.JSTimer", this);
    },

    componentType :"UntzUntz.JSTimer",
    
    doAction: function() {
        this.fireEvent({type: "action", source: this, actionCommand: this.get("actionCommand")});
    }
    
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.JSTimer.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
       _defaultTime: 60000
    },

    getSupportedPartialProperties: function() {
       return ["time"];
    },
    
    $load: function() {
        Echo.Render.registerPeer("UntzUntz.JSTimer", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    _timerId: null,
    _time: null,
    timer_is_on: null,
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
    	this._time = this.component.render("time", UntzUntz.JSTimer._defaultTime);
		this.setupTimer(this);
    
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    	if (this._timerId)
	    	clearTimeout(this._timerId);
    },
    
    timerHit: function(parent) {
    
    	this.component.doAction();
		this._timerId = setTimeout(function(){parent.timerHit(parent);}, this._time)
		Core.Debug.consoleWrite("Timer Fired : " + this._time);
    	
    },
    
    setupTimer: function(parent) {
    
		if (!this.timer_is_on)
		{
			this.timer_is_on = 1;
			this._timerId = setTimeout(function(){parent.timerHit(parent);}, this._time)
    	}
    	else
    	   	alert('already timing');	
    	
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
    	
        var fullRender = !Core.Arrays.containsAll(this.getSupportedPartialProperties(), update.getUpdatedPropertyNames(), true);
    
		Core.Debug.consoleWrite("fullRender : " + fullRender + " // " + update.getUpdatedPropertyNames());
		Core.Debug.consoleWrite("time : " + this.component.get("time"));
    
    
    	if (this._timerId)
    		clearTimeout(this._timerId);
    
        if (fullRender) {
        	_time = this.component.get("time");
			this.setupTimer(this);
        } else {
            if (update.hasUpdatedProperties()) {
                var time = update.getUpdatedProperty("time");
				Core.Debug.consoleWrite("time : " + time);
                if (time) {
                    var newValue = time.newValue == null ? "" : time.newValue;
					Core.Debug.consoleWrite("time : " + newValue + " v. " + this._lastProcessedValue);
                    if (newValue != this._lastProcessedValue) {
                    	_time = newValue;
						this.setupTimer(this);                    	
             		}
             	}
             }
		}		
	    
        return false; // Child elements not supported: safe to return false.
    }
    
});

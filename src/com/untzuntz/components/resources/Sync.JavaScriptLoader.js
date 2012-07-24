// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.JavaScriptLoader = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.JavaScriptLoader", this);
    },

    doAction: function(action) {
        var updateEvent = {type: "action", source: this, actionCommand: action};
		this.fireEvent(updateEvent);
    },
    	
    componentType :"UntzUntz.JavaScriptLoader"
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.JavaScriptLoader.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.JavaScriptLoader", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {

    	uJSL = this.component;
    	
        this._containerElement = parentElement;
        this._node = document.createElement("div");
        this._node.id = this.component.renderId;
        
        var mode = 1;
        var url = this.component.render("url");
        
        if (mode == 1)
        {
			// mode 1
			var script = document.createElement('script');
			script.setAttribute("src", url);
			this._node.appendChild(script);
        }
        else if (mode == 2)
        {
			// mode 2 - doesn't seem to work...
	 	 	var requiredLibraries = new Array();
	   		requiredLibraries[0] = url;
	        Core.Web.Library.exec(requiredLibraries, Core.method(this, function(e) {
	            if (e && !e.success) {
	                this.fail("Cannot install library: " + e.url + " Exception: " + e.ex);
	                return;
	            }
	        }));
        }
        
        this._containerElement.appendChild(this._node);
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    
        this._containerElement.removeChild(this._node);
        this._containerElement = null;
        this._node = null;
        uJSL = null;
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

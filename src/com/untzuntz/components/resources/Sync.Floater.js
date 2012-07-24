// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.Floater = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.Floater", this);
    },

    componentType :"UntzUntz.Floater",
    
    doAction: function() {
        this.fireEvent({type: "action", source: this, actionCommand: this.get("actionCommand")});
    }
    
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.Floater.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.Floater", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    _containerElement: null,
    _me: null,
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {

		_me = this;
        Core.Web.Scheduler.run( function() { _me._processAdd() } );
    
    },
    
    _processAdd: function() {
    
        var parentRenderId = this.component.render("parentRenderId");
        var text = this.component.render("text");
        var leftSpacing = this.component.render("leftSpacing");
        var topSpacing = this.component.render("topSpacing");
        var foreground = this.component.render("foreground");
        var background = this.component.render("background");
        
        Core.Debug.consoleWrite("parentRenderId: " + parentRenderId);
        Core.Debug.consoleWrite("text: " + text);
        
        
        if (!leftSpacing)
        	leftSpacing = "0";
        if (!topSpacing)
	        topSpacing = "0";

        this._containerElement = document.getElementById('body');
		var q = document.getElementById(parentRenderId);
		if (q == null)
		{
			Core.Debug.consoleWrite("Could not find parent object, id: " + parentRenderId);
			return;
		}
			
		if (this._containerElement)
		{
	        Core.Debug.consoleWrite("found parent by id: " + parentRenderId);
            this._node = document.createElement("span");
            this._node.style.cssText = "z-index: 99999; font-family: Helvetica, Arial, sans-serif; font-size:1em; border-radius: 2px; padding: 5px; box-shadow: 0 0 5px #222";
            this._node.id = this.component.renderId;
            Echo.Sync.renderComponentDefaults(this.component, this._node);
            Echo.Sync.Color.render(this.component.render("background"), this._node, "backgroundColor");
            Echo.Sync.Color.render(this.component.render("foreground"), this._node, "foregroundColor");

			var xoffset = 0;
			var yoffset = 0;
			while (q != null && q.id != 'body')
			{
			        yoffset += q.offsetTop;
			        xoffset += q.offsetLeft;
			        q = q.offsetParent;
			}
			
			this._node.style.position = "absolute";
			this._node.style.top = (yoffset + topSpacing) + "px";
			this._node.style.left = (xoffset + leftSpacing) + "px";
			this._node.appendChild(document.createTextNode(text));
            
            this._containerElement.appendChild(this._node);
		}
		    
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
     	if (this._node)
	        this._node.parentNode.removeChild(this._node);
        this._containerElement = null;
        this._node = null;
        this._me = null;
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

// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.PageMask = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.PageMask", this);
    },

    componentType :"UntzUntz.PageMask"
});

/**
	
	Component will create a transparent layer

*/
UntzUntz.PageMask.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    
       _defaultZIndex: 32766,
       _defaultOpacity: 75,
       _defaultMaskColor: 000000
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.PageMask", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
        this._containerElement = parentElement;

        this._node = document.createElement("div");
        this._node.id = this.component.renderId;            
        this._node.style.cssText = "position:absolute;z-index:1;width:100%;height:100%;background-color:#000000;opacity:0.75";
        if (Core.Web.Env.PROPRIETARY_IE_OPACITY_FILTER_REQUIRED) {
            this._node.style.filter = "alpha(opacity=75)";
        }
        
        var parent = document.getElementById('C.1');
        if (parent != null)
            parent.appendChild(this._node);
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    
        var parent = document.getElementById('C.1');
        if (parent != null)
            parent.removeChild(this._node);
        this._containerElement = null;
        this._node = null;
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        if (this._node) {
            this.renderDispose(update);
        }
        
        // Note: this.renderDispose() is not invoked (it does nothing).
        this.renderAdd(update, this._containerElement);
        return false; // Child elements not supported: safe to return false.
    }
    
});

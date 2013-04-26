if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.FancyTextArea = Core.extend(Echo.TextField, {

    $load : function() {
        Echo.ComponentFactory.registerType("FancyTextArea", this);
        Echo.ComponentFactory.registerType("FTA", this);
    },
    
    componentType :"UntzUntz.FancyTextArea"

});

UntzUntz.FancyTextArea.Peer = Core.extend(Echo.Sync.TextField, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.FancyTextArea", this);
    },

    _keyDownSet: false,

	processFocus: function(e) {
            this._focused = true;
            if (this.client) {
                if (this.component.isActive()) {
                    this.client.application.setFocusedComponent(this.component);
                } else {
                    this._resetFocus();
                }
            }
            
            if (this.input.value == this.component.get("hintText"))
				this.input.setSelectionRange(0,0);
				
            return false;
    },

    processKeyDownClear: function(e) {
    
    	if (this._keyDownSet)
    		return true;
    
    	if (this.input.value == this.component.get("hintText"))
    	{	
    		this.input.type = this._type;
    		this.input.value = "";
    		if (this.component.render("foreground"))
	    		this.input.style.setProperty("color", this.component.render("foreground"));
	    	else
	    		this.input.style.setProperty("color", "#000");
	    		
	    	this._keyDownSet = true;
		}
    	return true;
    },
    
	/**
     * Processes a focus blur event.
	 * Overriding implementations must invoke.
	 */
	processBlur: function(e) {
            this._focused = false;
            this._storeSelection();
            
            if (this.input.value == this.component.get("hintText"))
            {
				this.input.value = "";
	            this._storeValue();
	            this.input.value = this.component.get("hintText");
	        }
	        else
	            this._storeValue();
	        
            return true;
    },
    
    processBlurSet: function(e) {
    	if (this.input.value.length == 0)
		{
			this.setHintText();
			this._keyDownSet = false;
		}
    },
    
    setHintText: function() {
		this.input.value = this.component.get("hintText");
		this.input.style.setProperty("color", "#bbbbbb");
    },

	/** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.input = document.createElement("textarea");
        this.input.id = this.component.renderId;
        if (!this.component.render("editable", true)) {
            this.input.readOnly = true;
        }
        this._renderStyle(this.input);
        this.input.style.overflow = "auto";
        this._addEventHandlers(this.input);
        if (this.component.get("text")) {
            this.input.value = this.component.get("text");
        }
        
		if (this.component.get("hintText"))
		{
			if (this.input.value.length == 0)
				this.setHintText();
			Core.Web.Event.add(this.input, "keydown", Core.method(this, this.processKeyDownClear), false);			
        	Core.Web.Event.add(this.input, "blur", Core.method(this, this.processBlurSet), false);
		}
	
		if (this.component.render("borderRadius"))
		{
			this.input.style.setProperty("border-radius", Echo.Sync.Extent.toPixels(this.component.render("borderRadius"), false) + "px");
			this.input.style.setProperty("background-clip", "padding-box");
		}				
        
        this.renderAddToParent(parentElement);
    }
});
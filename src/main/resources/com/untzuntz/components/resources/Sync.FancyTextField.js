if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.FancyTextField = Core.extend(Echo.TextField, {

    $load : function() {
        Echo.ComponentFactory.registerType("FancyTextField", this);
        Echo.ComponentFactory.registerType("FTF", this);
    },
    
    componentType :"UntzUntz.FancyTextField"

});

UntzUntz.FancyTextField.Peer = Core.extend(Echo.Sync.TextField, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.FancyTextField", this);
    },
    
    /** @see Echo.Sync.TextField#_type */
    _type: "text",
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
        this.input.type = "text";
		this.input.value = this.component.get("hintText");
		this.input.style.setProperty("color", "#bbbbbb");
    },
    
	/** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.input = document.createElement("input");
        this.input.id = this.component.renderId;
        if (!this.component.render("editable", true)) {
            this.input.readOnly = true;
        }
        this.input.type = this._type;
        var maximumLength = this.component.render("maximumLength", -1);
        if (maximumLength >= 0) {
            this.input.maxLength = maximumLength;
        }
        this._renderStyle(this.input);
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

UntzUntz.FancyPasswordField = Core.extend(UntzUntz.FancyTextField, {

    $load : function() {
        Echo.ComponentFactory.registerType("FancyPasswordField", this);
        Echo.ComponentFactory.registerType("FPF", this);
    },
    
    componentType :"UntzUntz.FancyPasswordField"

});

UntzUntz.FancyPasswordField.Peer = Core.extend(UntzUntz.FancyTextField.Peer, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.FancyPasswordField", this);
    },

	/** @see Echo.Sync.TextField#_type */
    _type: "password",

});





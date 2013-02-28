// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.ClientTextField = Core.extend(Echo.TextComponent, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.ClientTextField", this);
    },

    componentType : "UntzUntz.ClientTextField"
    
});


UntzUntz.ClientTextField.Peer = Core.extend(Echo.Sync.TextField, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.ClientTextField", this);
    },
   
    $virtual: {

        /**
         * Input element type, either "text" or "password"
         * @type String
         */
        _type: "text",
        
        /**
         * Processes a focus blur event.
         * Overriding implementations must invoke.
         */
        processNewBlur: function(e) {
            this._focused = false;
            this._storeLengthSelection();
            this._storeLength();
            return true;
        },
        
        /**
         * Processes a focus event. Notifies application of focus.
         * Overriding implementations must invoke.
         */
        processNewFocus: function(e) {
            this._focused = true;
            if (this.client) {
                if (this.component.isActive()) {
                    this.client.application.setFocusedComponent(this.component);
                } else {
                    this._resetFocus();
                }
            }
            return false;
        }

    },

    /** @see Echo.Render.ComponentSync#getFocusFlags */
    getFocusFlags: function() {
        return Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP | Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN;
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
        this._addNewEventHandlers(this.input);
        if (this.component.get("text")) {
            this.input.value = this.component.get("text");
            this.component.set("textLength", this.input.value.length);
        }

        this.renderAddToParent(parentElement);
    },

    /**
     * Allows all input.
     * @see Echo.Sync.TextComponent#sanitizeInput
     */
    sanitizeInput: function() {
        // allow all input
    },

    /** @see Echo.Render.ComponentSync#clientKeyDown */
    clientKeyDown: function(e) {
        this._storeLength(e);
        if (this.client && this.component.isActive()) {
            if (!this.component.doKeyDown(e.keyCode)) {
                Core.Web.DOM.preventEventDefault(e.domEvent);
            }
        }
        return true;
    },
   
    /** @see Echo.Render.ComponentSync#clientKeyPress */
    clientKeyPress: function(e) {
        this._storeLength(e);
        if (this.client && this.component.isActive()) {
            if (!this.component.doKeyPress(e.keyCode, e.charCode)) {
                Core.Web.DOM.preventEventDefault(e.domEvent);
            }
        }
        return true;
    },
   
    /** @see Echo.Render.ComponentSync#clientKeyUp */
    clientKeyUp: function(e) {
        this._storeLengthSelection();
        this._storeLength(e);
        return true;
    },
   
     /**
     * Registers event handlers on the text component.
     */
    _addNewEventHandlers: function() {
        Core.Web.Event.add(this.input, "keydown", Core.method(this, this._processNewKeyDown), false);
        Core.Web.Event.add(this.input, "click", Core.method(this, this._processNewClick), false);
        Core.Web.Event.add(this.input, "focus", Core.method(this, this.processNewFocus), false);
        Core.Web.Event.add(this.input, "blur", Core.method(this, this.processNewBlur), false);
    },
    
    /**
     * Processes a mouse click event. Notifies application of focus.
     */
    _processNewClick: function(e) {
        if (!this.client || !this.component.isActive()) {
            Core.Web.DOM.preventEventDefault(e);
            return true;
        }
        this.client.application.setFocusedComponent(this.component);
        this._storeLengthSelection();
        return false;
    },

    /**
     * Keydown event handler to suppress input when component is inactive
     * (clientKeyXXX() methods will not be invoked, even though component can potentially be focused).
     *
     * @param e the event
     */
    _processNewKeyDown: function(e) {
        this._storeLength(e);
        if (!this.component.isActive()) {
            Core.Web.DOM.preventEventDefault(e);
        }
        return true;
    },
       	
    /**
     * Event listener to process input after client input restrictions have been cleared.
     */
    _processLengthRestrictionsClear: function() {
        if (!this.client) {
            // Component has been disposed, do nothing.
            return;
        }

        if (!this.client.verifyInput(this.component) || this.input.readOnly) {
            // Client is unwilling to accept input or component has been made read-only:
            // Reset value of text field to text property of component.
            this.input.value = this.component.get("text");
            return;
        }

	    this.component.set("textLength", this.input.value.length, true);
    },
    
    /**
     * Stores the selection/cursor position within the input field.
     */
    _storeLengthSelection: function() {
        var range, measureRange;
        if (!this.component) {
            return;
        }

        if (!Core.Web.Env.NOT_SUPPORTED_INPUT_SELECTION) {
            this._selectionStart = this.input.selectionStart;
            this._selectionEnd = this.input.selectionEnd;
        } else if (Core.Web.Env.PROPRIETARY_IE_RANGE) {
            range = document.selection.createRange();
            if (range.parentElement() != this.input) {
                return;
            }
            measureRange = range.duplicate();
            if (this.input.nodeName.toLowerCase() == "textarea") {
                measureRange.moveToElementText(this.input);
            } else {
                measureRange.expand("textedit");
            }
            measureRange.setEndPoint("EndToEnd", range);
            this._selectionStart = measureRange.text.length - range.text.length;
            this._selectionEnd = this._selectionStart + range.text.length;
        } else {
            return;
        }
        this.component.set("selectionStart", this._selectionStart, true);
        this.component.set("selectionEnd", this._selectionEnd, true);
	    this.component.set("textLength", this.input.value.length, true);
    },
    
	_storeLength: function(keyEvent) {
	    if (!this.client || !this.component.isActive()) {
	        if (keyEvent) {
	            // Prevent input.
	            Core.Web.DOM.preventEventDefault(keyEvent);
	        }
	        return;
	    }
	
	    this.sanitizeInput();
	
	    if (!this.client.verifyInput(this.component)) {
	        // Component is willing to receive input, but client is not ready:
	        // Register listener to be notified when client input restrictions have been removed,
	        // but allow the change to be reflected in the text field temporarily.
	        this.client.registerRestrictionListener(this.component, Core.method(this, this._processLengthRestrictionsClear));
	        return;
	    }
	
	    // Component and client are ready to receive input, set the component property and/or fire action event.
	    this.component.set("textLength", this.input.value.length, true);
	    this._lastProcessedValue = this.input.value;
	
	    if (keyEvent && keyEvent.keyCode == 13 && keyEvent.type == "keydown") {
	        this.component.doAction();
	    }
	}
	

     
});
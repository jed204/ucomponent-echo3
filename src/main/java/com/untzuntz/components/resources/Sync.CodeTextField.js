// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.CodeTextField = Core.extend(Echo.TextComponent, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.CodeTextField", this);
    },

    componentType : "UntzUntz.CodeTextField"
});


UntzUntz.CodeTextField.Peer = Core.extend(Echo.Sync.TextComponent, {

    _filterRegExp: new RegExp("[a-fA-F0-9]"),
    _patternRegExp: new RegExp("[a-fA-F0-9]{3}[0-9]-[a-fA-F0-9]{3}[0-9]-[a-fA-F0-9]{3}[0-9]"),
    _preLength: 0,
    _processInput: false,

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.CodeTextField", this);
    },

    $construct : function() {
        Echo.Sync.TextField.call(this);
        
        this.super_addEventHandlers = this._addEventHandlers;
        this._addEventHandlers = this.addEventHandlers;
    },
 
    addEventHandlers: function() {
         this.super_addEventHandlers();
         Core.Web.Event.add(this.input, "paste", Core.method(this, this._processPasteEvent), false);
    },

    /** @see Echo.Render.ComponentSync#getFocusFlags */
    getFocusFlags: function() {
        return Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP | Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN;
    },

    /** 
     * Override virtual method from 'Echo.Sync.TextComponent' (introduced 3.0.b8)
     * Used here to ignore characters which do not pass the 'filter' regex test
     */
    clientKeyPress: function(keyEvent) {
        
        // Get the raw keyboard event
        var domEvent = keyEvent.domEvent;
        this._processInput = false;
    
        // Skip copy/cut/paste/select-all etc. commands
        if(!domEvent.metaKey && !domEvent.ctrlKey && !domEvent.altKey && (keyEvent.charCode >= 32)) {
        
        	this._processInput = true;
        	if (this.input.value.length >= 14) {
                Core.Web.DOM.preventEventDefault(keyEvent.domEvent);
                return false;
            } 
        
            var character = String.fromCharCode(keyEvent.charCode);
            if (this._filterRegExp.test(character) === false) {
                Core.Web.DOM.preventEventDefault(keyEvent.domEvent);
                return false;
            } 
        }

        // Invoke superclass method to handle valid keyEvents
        return Echo.Sync.TextComponent.prototype.clientKeyPress.call(this, keyEvent);
    },

    // Invoke virtual superclass method which is invoked by most handlers
    //  and property change events.

    sanitizeInput : function(event) {
        Echo.Sync.TextComponent.prototype.sanitizeInput.call(this, event);
        
        if (!this._processInput)
        	return;

		this._processData(false);        
    },

	_processData: function(fromPaste)
	{
        var _deleteKey = false;
        if (this.input.value.length < this._preLength)
        	_deleteKey = true;
        	
        if (fromPaste)
        	_deleteKey = false;
        
       	var value = this.input.value;
       	if (!_deleteKey)
       	{
	        if (value.length == 4 || value.length == 9)
	        	value += "-";
	        	
	        if (value.length > 4 && value.substring(4,5) != '-')
	        {
	        	value = value.substring(0, 4) + "-" + value.substring(4, value.length);
	        }
	        if (value.length > 9 && value.substring(9,10) != '-')
	        {
	        	value = value.substring(0, 9) + "-" + value.substring(9, value.length);
	        }
	        
	        if (value.length > 14)
	        	value = value.substring(0, 14);
		}
		else
		{ 
		  	if (value.length == 4 || value.length == 9)
	        	value = value.substring(0, value.length - 1);
		
		}
        this.input.value = value;
        
        this._preLength = value.length;
        this._adjustStatus();
	},

    /**
     * Run the _flterInput method after the input field has had text pasted into it. The
     *   'paste' event may come from a keyboard combination, a mouse right-click or 
     *    menu 'Edit' command selection.
     */

    _processPasteEvent: function(event) {
        Core.Web.Scheduler.run(Core.method(this, this._handlePasteEvent), 100, false);
    },

    _handlePasteEvent: function() {
        this._filterInput();
		this._processData(true);        
    },


    _filterInput: function() {

        var value = this.input.value;
        var filtered = "";
        
        for (i = 0; i<value.length; i++) {
            var c = value.charAt(i);
            if (this._filterRegExp.test(c))
                filtered += c;
        }

        // Setting the value of an input field has the unfortunate side-effect of
        //  moveing the cursor to end.  Most of the time the user will not notice.
        // In order to mitigate unnecessary cursor reposition, check the filtered
        //  string to ensure that the string has indeed changed.
        
        if(value !== filtered)
            this.input.value = filtered;
   },

    /***************************************************************************
     *   Member variables
     *   ----------------
     *  _type          - The 'type' of input field normal (text) or hidden (password);
     *                     not currently implemented.
     */
        
    _type: "text",


    /***************************************************************************
     * Override the TextComponent superclass method:  Sync.TextComponentSync#renderAdd
     * 
     *  If not for the superclass's use of 'renderAddToParent' we could have invoked
     *  the superclass 'renderAdd' method to create the HTML input and attach the listeners
     *  instead of copying it's contents into this method.
     */

    renderAdd: function(update, parentElement) {

        // From superclass 'renderAdd' -------------------------------------------
        
        // Instance the HTML Input tag according to supplied properties
        this.input = document.createElement("input");
        this.input.id = this.component.renderId;            
        
        if (!this.component.render("editable", true)) {
            this.input.readOnly = true;
        }
        
        this._renderStyle(this.input);
        
        // Add event listeners
        this._addEventHandlers(this.input);
        
        // Set 'text' property, empty string otherwise
        if (this.component.get("text")) {
            this.input.value = this.component.get("text");
        } else {
            this.input.value = "";
        }

        // End: From superclass 'renderAdd' -------------------------------------

                
        // Build the composite component
        
        // Assemble the composite component; Stacked vertically
        this.container = document.createElement("div");

        this.container.appendChild(this.input);
        parentElement.appendChild(this.container);
        
        // Other, non-style, properties
        this._required = this.component.render("required", false);
        
        // Initialize the status line
        this._adjustStatus();
    },
     

    renderUpdate: function(update) {
 
        // Get the results from the superclass method
        var status = Echo.Sync.TextComponent.prototype.renderUpdate.call(this, update);
    
        // Filter the results of 'setText' method from the server
        if (update.getUpdatedProperty("text"))
            this._filterInput();
    
        // Adjust the status of the component
        this._adjustStatus();
        
        return status;
    },

    _adjustStatus: function() {

        var value = this.input.value;
        if( this._patternRegExp.test(value)) 
            this._statusValid();
        else
            this._statusInvalid();
    },

     _statusValid : function() {
        //Echo.Sync.Color.render(this.component.render("foreground", "#000000"), this.input, "color");
        //Echo.Sync.Color.render(this.component.render("background", "#ffffff"), this.input, "backgroundColor");
     },


     _statusInvalid : function() {
        //Echo.Sync.Color.render(this.component.render("invalidForegroundColor", "#ffffff"), this.input, "color");
        //Echo.Sync.Color.render(this.component.render("invalidBackgroundColor", "#ff0000"), this.input, "backgroundColor");
     }


});

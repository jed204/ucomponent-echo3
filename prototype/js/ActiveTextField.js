// Informagen =================================================================================
// Ensure that the 'Informagen' and 'Informagen.Sync' namespaces exists

if (!Core.get(window, ["Informagen", "Sync"])) {
    Core.set(window, ["Informagen", "Sync"], {});
}


Informagen.Sync.ActiveTextField = Core.extend(Echo.Sync.TextComponent, {

    $abstract: {
        _filterRegExp: null,
        _adjustStatus: function() {}
    },


    $construct : function() {
        Echo.Sync.TextField.call(this);
        
        // Here we apply a "JS hack" for a overriding a super non-virtual method...
        // Hopefully someday '_processKeyPress' will be a virtual method.
        // Not used after Echo 3.0.b8

//         this.super_processKeyPress = this._processKeyPress;
//         this._processKeyPress = this.processKeyPress;

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
    
        // Skip copy/cut/paste/select-all etc. commands
        if(!domEvent.metaKey && !domEvent.ctrlKey && !domEvent.altKey && (keyEvent.charCode >= 32)) {
        
           var character = String.fromCharCode(keyEvent.charCode);
            if (this._filterRegExp.test(character) === false) {
                Core.Web.DOM.preventEventDefault(keyEvent.domEvent);
                return false;
            } 
        }

        // Invoke superclass method to handle valid keyEvents
        return Echo.Sync.TextComponent.prototype.clientKeyPress.call(this, keyEvent);
    },


// Not used after Echo 3.0.b8; use virtual 'clientKeyPress' above
//    processKeyPress: function(keyEvent) {
//         if(keyEvent) {
//                         
//             // Don't filter meta, control or alt modified keypresses
//             // FireFox uses charCode equal 0 for special characters i.e. delete, backspace
//             if(!keyEvent.metaKey && !keyEvent.ctrlKey && !keyEvent.altKey && (keyEvent.charCode != 0)) {
//                 
//                 // Extract out the char from IE or other events
//                 var charCode = (keyEvent.charCode) ? keyEvent.charCode : keyEvent.keyCode;
//                 
//                 
//                 // If this character is not allowed, swallow it and return
//                 var character = String.fromCharCode(charCode);
//                 alert(character);
//                 if (this._filterRegExp.test(character) === false) {
//                     Core.Web.DOM.preventEventDefault(keyEvent);
//                     return true;
//                 }
//             }
//         }
//         
//         this.super_processKeyPress(keyEvent);
//     },


    // Invoke virtual superclass method which is invoked by most handlers
    //  and property change events.

    sanitizeInput : function(event) {
        Echo.Sync.TextComponent.prototype.sanitizeInput.call(this, event);
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
        this._adjustStatus();
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
     *  _emptyIcon     - Span (icon) to show when the field is empty
     *  _validIcon     - Span (icon) to show when the field is valid
     *  _invalidIcon   - Span (icon) to show when the field is invalid
     *
     *  _messageElmt   - A 'span' or 'div' containing the required or error message; A
     *                     'span' is used for leading or trailing, a 'div' is 
     *                      used for above or below message placement
     *  _message       - Text displayed when the field is empty or if _validMessage or
     *                      or _invalidMessage are null
     * _validMessage   - Text to display when the input is valid
     * _invalidMessage - Text to display when the input is invalid
     *
     *  _type          - The 'type' of input field normal (text) or hidden (password);
     *                     not currently implemented.
     */
    
    _emptyIcon: null,
    _validIcon: null,
    _invalidIcon: null,
    
    _messageElmt: null,
    _message: null,
    _validMessage: null,
    _invalidMessage: null,
        
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
        
        // Create status 'div', icon 'span's, and message 'div'/'span'
                        
        this._emptyIcon = this._createIconSpan(this.component.render("emptyIcon", "empty"));
        this._validIcon = this._createIconSpan(this.component.render("validIcon", "good"));
        this._invalidIcon = this._createIconSpan(this.component.render("invalidIcon", "error"));
                        
        
        // Display message as stacked 'div', above or below
        this._messageElmt = document.createElement("div");
        this._messageElmt.style.display = "none";
        
        // Display the empty icon as a spacer
        this._emptyIcon.style.display="";
                
        var statusDiv = document.createElement("span");
        statusDiv.appendChild(this._emptyIcon);
        statusDiv.appendChild(this._validIcon);
        statusDiv.appendChild(this._invalidIcon);
        
        // Determine the left/right placement of the icon
        var iconPosition = this.component.render("iconPosition", "trailing");
        iconPosition = Echo.Sync.Alignment.getRenderedHorizontal(iconPosition);
        
        // Determine the top/bottom placement of the message
        var messagePosition = this.component.render("messagePosition", "bottom");
        messagePosition = Echo.Sync.Alignment.getVertical(messagePosition);

        // Assemble the composite component; Stacked vertically
        this.container = document.createElement("div");
        
        if(messagePosition == "top")
            this.container.appendChild(this._messageElmt);

        switch(iconPosition) {
            case "left":
                statusDiv.setAttribute("style", "margin-right:3px;");
                this._messageElmt.setAttribute("style", "padding-left:19px;font-size:0.75em;");
                this.container.appendChild(statusDiv);
                this.container.appendChild(this.input);
                break;
                
            default:
                statusDiv.setAttribute("style", "margin-left:3px;");
                this._messageElmt.setAttribute("style", "padding-left:3px;font-size:0.75em;");
                this.container.appendChild(this.input);
                this.container.appendChild(statusDiv);
       }


        
        if(messagePosition == "bottom")
            this.container.appendChild(this._messageElmt);

        parentElement.appendChild(this.container);
        
        // Other, non-style, properties
        this._required = this.component.render("required", false);
        this._message = this.component.render("message", null);
        this._validMessage = this.component.render("validMessage", null);
        this._invalidMessage = this.component.render("invalidMessage", null);

        
        // Initialize the status line
        this._adjustStatus();
    },
     

    renderUpdate: function(update) {
 
        var updateProperty = null;
        updateProperty = update.getUpdatedProperty("message");
        
        if (updateProperty) 
           this._message = updateProperty.newValue;

 
        updateProperty = update.getUpdatedProperty("validMessage");
        
        if (updateProperty) 
           this._validMessage = updateProperty.newValue;

 
        updateProperty = update.getUpdatedProperty("invalidMessage");
        
        if (updateProperty) 
           this._invalidMessage = updateProperty.newValue;

       
        // Get the results from the superclass method
        var status = Echo.Sync.TextComponent.prototype.renderUpdate.call(this, update);
    
        // Filter the results of 'setText' method from the server
        if (update.getUpdatedProperty("text"))
            this._filterInput();
    
        // Adjust the status of the component
        this._adjustStatus();
        
        return status;
    },

    // Utility method for building Component spans
    
    _createIconSpan : function(iconName) {
        
        // Use 'gif' images for Microsoft challenged browsers
        var fileType = Core.Web.Env.PROPRIETARY_IE_PNG_ALPHA_FILTER_REQUIRED ? ".gif" : ".png";
        var iconFileName = "image/" + iconName + ".icon" + fileType;
        
        var span = document.createElement("span");
        var img = document.createElement("img");
        
        var icon = this.client.getResourceUrl("ActiveTextField", iconFileName);

        Echo.Sync.ImageReference.renderImg(icon, img);
        span.appendChild(img);
        
        // Create this span as hidden
        span.style.display = "none";
        
        return span;
    },

    _adjustStatusPrecondition : function() {

        //  If there are no messages, don't use the vertical space
        if(this._message == null && this._validMessage == null && this._invalidMessage == null) 
            this._messageElmt.style.display = "none";
        else
            this._messageElmt.style.display = "";

        // Hide all icon spans; only show for the appropriate state
        this._emptyIcon.style.display="none";
        this._validIcon.style.display="none";
        this._invalidIcon.style.display="none";

        var value = this.input.value;

        // Empty String, use empty icon
        if(value.length == 0) {
            
            // Display empty icon and standard message if one exists
            this._emptyIcon.style.display="";
            
            this._messageElmt.innerHTML = (this._message) ? this._message : "&nbsp;";
            
            // Reset the colors    
 
            Echo.Sync.Color.render(this.component.render("foreground", "#000000"), this.input, "color");
            Echo.Sync.Color.render(this.component.render("background", "#ffffff"), this.input, "backgroundColor");
        }
        
        return value;
    },

     _statusValid : function() {
        this._validIcon.style.display="";
        this._validIcon.title = "";

        Echo.Sync.Color.render(this.component.render("foreground", "#000000"), this.input, "color");
        Echo.Sync.Color.render(this.component.render("background", "#ffffff"), this.input, "backgroundColor");

        if (this._validMessage)
            this._messageElmt.innerHTML = this._validMessage;
        else if (this._message)
            this._messageElmt.innerHTML = this._message;
        else 
            this._messageElmt.innerHTML = "&nbsp;";
     },


     _statusInvalid : function() {
        this._invalidIcon.style.display="";

        Echo.Sync.Color.render(this.component.render("invalidForegroundColor", "#000000"), this.input, "color");
        Echo.Sync.Color.render(this.component.render("invalidBackgroundColor", "#ffffff"), this.input, "backgroundColor");
                
        if (this._invalidMessage)
            this._messageElmt.innerHTML = this._invalidMessage;
        else if (this._message)
            this._messageElmt.innerHTML = this._message;
        else 
            this._messageElmt.innerHTML = "&nbsp;";
     }

});

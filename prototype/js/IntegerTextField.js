// Informagen =================================================================================
// Ensure that the 'Informagen' and 'Informagen.Sync' namespaces exist

if (!Core.get(window, ["Informagen", "Sync"])) {
    Core.set(window, ["Informagen", "Sync"], {});
}


// Informagen.ActiveTextArea ==================================================================

Informagen.IntegerTextField = Core.extend(Echo.TextComponent, {

    $load : function() {
        Echo.ComponentFactory.registerType("Informagen.IntegerTextField", this);
    },

    componentType : "Informagen.IntegerTextField"
});


// Informagen.Sync.IntegerTextField ===========================================================
//  The name of this object is irrelevant; see '$load' function.  However, keeping this 
//    class as a member of the namespace 'Informagen.Sync' adds consistency.


Informagen.Sync.IntegerTextField = Core.extend(Informagen.Sync.ActiveTextField, {


    // Register this class as the 'Sync' class for the 'Informagen.IntegerTextField' class

    $load: function() {
        Echo.Render.registerPeer("Informagen.IntegerTextField", this);
    },

     $virtual: {

        // JavaScript accepts a larger range but these will eventually being used in Java
        _minimumValue: -2147483648,
        _maximumValue: 2147483647,
         
         // Validate the current contents of the HTML 'input' field
        _filterRegExp: new RegExp("[-|+0-9]"),
        
        // Must use base 10 or else numbers with leading zeros will be interpreted
        //  as octal. Hence, 09 is invalid and will return 0

        _fromString: function(string) { return parseInt(string, 10); }
 

     },
    
    renderAdd : function(update, parentElement) {
        Informagen.Sync.ActiveTextField.prototype.renderAdd.call(this, update, parentElement);      
        this._adjustStatus();
    },


    renderAdd: function(update, parentElement) {

        if(this.component.render("minimumValue") != null)
            this._minimumValue = this.component.render("minimumValue");
        
        if(this.component.render("maximumValue") != null)
            this._maximumValue = this.component.render("maximumValue");

        // Invoke the superclass method for all other methods
        return Informagen.Sync.ActiveTextField.prototype.renderAdd.call(this, update, parentElement);      
        
    },

    /**
     *  Note the use the 'eval' function to evalute the incoming  properties 'newValue'
     *      this was done because a 'SerialPropertyPeer' class has not been written for 
     *      the Java Double class did not currenly exist.
     *      This JS hack will property convert both 'integer' and 'double' string 
     *      representations into their correct JS objects.
     */

    renderUpdate: function(update) {

        var updateProperty = null;
 
        // Check for 'IntegerTextfield' non-style property changes
        
        updateProperty = update.getUpdatedProperty("minimumValue");
        if (updateProperty) {
           this._minimumValue = eval(updateProperty.newValue);
        }
         
        updateProperty = update.getUpdatedProperty("maximumValue");
        if (updateProperty) {
            this._maximumValue = eval(updateProperty.newValue);
        }

        // Invoke the superclass method for all other methods
        return Informagen.Sync.ActiveTextField.prototype.renderUpdate.call(this, update);      
        
    },


    /***************************************************************************
     * Private method to update the status HTML spans by overriding the
     *  superclass mehtod '_storeValue' with '_local_storeValue' as described
     *  above.
     */

    _adjustStatus: function() {

        var input = this._adjustStatusPrecondition();

        if(input.length == 0)
            return;
    
        // Handle two special case where we might have a valid, yet, unformed integer
        if(input === "+")
            input = 1;

        if(input === "-")
            input = -1;

        // Convert from a string into an integer or number
        var value = this._fromString(input); 
        
        // Valid condition means value is in range
        
        if((value >= this._minimumValue) && (value <= this._maximumValue))
            this._statusValid();
        else  {
            this._statusInvalid();
            this._invalidIcon.title = "Value must be between " + 
                                    this._minimumValue + " and " + 
                                    this._maximumValue;
        }

    }

});

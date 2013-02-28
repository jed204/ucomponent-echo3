// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.Stripe = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.Stripe", this);
    },

    componentType : "UntzUntz.Stripe",
    
    doAction: function() {
    
    	Core.Debug.consoleWrite("doACtion called");
        var updateEvent = {type: "action", source: this, actionCommand: this.get("actionCommand")};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			this.fireEvent(updateEvent);
		}		
    }
    
});

UntzUntz.Stripe.Peer = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.Stripe", this);
    },

	token: null,
	_node: null,
	
    renderAdd: function(update, parentElement) {

		stripeCtrl = this;
		
        this._containerElement = parentElement;
        this._node = document.createElement("div");
        this._node.id = this.component.renderId;

		// Load Stripe.js
    	Core.Debug.consoleWrite("Loading Stripe");
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute("src", "https://js.stripe.com/v1/");
		//script.onload = this.stripeLoadedCallback;
		//script.onreadystatechange = function() {
		//	if (this.readyState == 'complete') {
    	//		Core.Debug.consoleWrite("Stripe Script 'complete'");
		//		this.stripeLoadedCallback();
		//	}
		//}			
        this._node.appendChild(script);
        this._containerElement.appendChild(this._node);
       
    },
    
    stripeLoadedCallback: function() {
    	Core.Debug.consoleWrite("Stripe Loaded!");
		Stripe.setPublishableKey( stripeCtrl.component.get("stripePublicKey") );
    },
    
    _getValueFromField : function(fieldName)
    {
    	if (document.getElementById( this.component.get(fieldName) ))
    		return document.getElementById( this.component.get(fieldName) ).value;
    	
    	return null;
    },
    
    _submitPayment : function()
    {
		Core.Debug.consoleWrite("Stripe Key: " + stripeCtrl.component.get("stripePublicKey"));
		Stripe.setPublishableKey( stripeCtrl.component.get("stripePublicKey") );
    	// disable the submit button to prevent repeated clicks
	
    	var str = { };
    	str.name = this._getValueFromField("nameFieldId");
    	str.number = this._getValueFromField("cardNumberFieldId");
    	str.cvc = this._getValueFromField("cvcFieldId");
    	
    	var eM = document.getElementById("C.CardExpMon");
    	var eY = document.getElementById("C.CardExpYear");
    	str.exp_month = eM.options[eM.selectedIndex].value;
    	str.exp_year = eY.options[eY.selectedIndex].value;

		Core.Debug.consoleWrite("B-exp_month: " + str.exp_month);
		Core.Debug.consoleWrite("B-exp_year: " + str.exp_year);

    	str.address_zip = this._getValueFromField("addressZipFieldId");
    	str.address_line1 = this._getValueFromField("addressLine1FieldId");
    	str.address_line2 = this._getValueFromField("addressLine2FieldId");
    	str.address_city = this._getValueFromField("addressCityFieldId");
    	str.address_state = this._getValueFromField("addressStateFieldId");
    	str.address_country = this._getValueFromField("addressCountryFieldId");

		Core.Debug.consoleWrite("str.number: " + str.number);
		Core.Debug.consoleWrite("cardNumberFieldId: " + this.component.get("cardNumberFieldId"));

		Core.Debug.consoleWrite("str => " + str);
		
    	
		Stripe.createToken(str, this.stripeResponseHandler);
 
		// prevent the form from submitting with the default action
 		return false;
    },
    
    _updateProperty: function(propertyName, oldValue, newValue) {
        
		Core.Debug.consoleWrite("Property Set : '" + propertyName + "' was [" + oldValue + "] => is now [" + newValue + "]");
		
        // Create an update event
         var updateEvent = {type: "componentUpdate", 
                            parent: this.component, 
                            propertyName: propertyName, 
                            oldValue: oldValue, 
                            newValue: newValue};
                            
        // Get a reference to the 'client', can't use 'this' inside the Scheduler class
        var client = this.component.application.client;
		   
        // For RemoteClient, process the property update explicitly; for FreeClient, simply set the property
        if (client._processClientUpdate)
            Core.Web.Scheduler.run( function() {client._processClientUpdate(updateEvent)});
        else
            this.component.set(propertyName, newValue);
    },
    
    stripeResponseHandler: function(status, response) {
    	if (response.error) {
         	// show the errors on the form
         	
		  	Core.Debug.consoleWrite("Stripe API Error Response: " + response.error.message);

			var codeStr = response.error.code;
			if (!codeStr)
				codeStr = 'unknown';
				
		  	stripeCtrl.error = response.error.message;
		   	stripeCtrl._updateProperty('errorMessage', '', codeStr);
		   	stripeCtrl.component.doAction();
		   	
       } else {
       
           	// token contains id, last4, and card type
           	var transactionToken = response['id'];
		   	Core.Debug.consoleWrite("Stripe API Call Success! Token: " + transactionToken);
           
           	// send back to server for processing
           	stripeCtrl.token = transactionToken;
		   	stripeCtrl._updateProperty('transactionToken', '', transactionToken);
		   	stripeCtrl.component.doAction();
       }
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
    
		Core.Debug.consoleWrite("renderDispose called!");
	 	if (this._node && this._node.parentNode) {
            this._node.parentNode.removeChild(this._node);
        }
        this._node = null;
        stripeCtrl = null;
        
	},

    renderUpdate: function(update) {
    
		var processingFlagUpdate = update.getUpdatedProperty("processingFlag");
        if (processingFlagUpdate) {
        	var newValue = processingFlagUpdate.newValue == null ? "" : processingFlagUpdate.newValue;
            if (newValue != this._lastProcessedValue) {
                this._submitPayment();
                this._lastProcessedValue = newValue;
            }
        }
    }

});

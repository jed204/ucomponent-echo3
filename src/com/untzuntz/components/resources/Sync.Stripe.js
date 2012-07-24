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
    
        var updateEvent = {type: "action", source: this, actionCommand: this.get("actionCommand")};
        var client = this.application.client;
        if(client._processClientUpdate)
        {
			Core.Debug.consoleWrite("REMOTE Fired Event from Client Component (UntzUntz.Stripe) : " + client._transactionInProgress);
            Core.Web.Scheduler.run( function() { client._processClientEvent(updateEvent) } );
		}
		else
		{
			Core.Debug.consoleWrite("LOCAL Fired Event from Client Component (UntzUntz.Stripe)");
			this.fireEvent(updateEvent);
		}		
    }
    
});

UntzUntz.Stripe.Peer = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.Stripe", this);
    },

	getLabel: function(name, small) {
		var l = document.createElement("label");
		l.style.cssText = "display:block;"+
							"font-weight:bold;"+
							"text-align:right;"+
							"margin-top: 7px;"+
							"width:140px;"+
							"float:left;";
		l.innerText = name;
		return l;
	},

	getInputField: function(size, cls) {
		var i = document.createElement("input");
		i.type = "text";
		i.size = size;
		i.autocomplete = "off";
		i.setAttribute("class", cls);
		return i;
	},
	
	addValues: function(obj, min, max) {
	
		for (var i = min; i <= max; i++)
		{
			var item = document.createElement("option");
			item.innerText = i;
			item.value = i;
			obj.appendChild( item ); 
		}
			
	},

	cvc: null,
	cardNum: null,
	expMon: null,
	expYear: null,
	postalCode: null,
	name: null,
	submitBtn: null,
	form: null,
	_node: null,
	token: null,
	
    renderAdd: function(update, parentElement) {

		stripeCtrl = this;
		
    	this._node = document.createElement("span");
    	this._node.id = this.component.renderId;

        parentElement.appendChild(this._node);
		
		// Build Form
		var form = document.createElement("form");
		form.method = "POST";
		form.action = "";
		form.id = "payment-form";
		
		var nameRow = document.createElement("div");
		nameRow.setAttribute("class", "form-row");
		nameRow.appendChild( this.getLabel("Name on Card") );
		nameRow.appendChild( this.name = this.getInputField(20, "name") );
		this.name.value = this.component.get("name_on_card");
		
		var cardNumRow = document.createElement("div");
		cardNumRow.setAttribute("class", "form-row");
		cardNumRow.appendChild( this.getLabel("Card Number") ); 
		cardNumRow.appendChild( this.cardNum = this.getInputField(30, "card-number") ); 
		
		var cvcRow = document.createElement("div");
		cvcRow.setAttribute("class", "form-row");
		cvcRow.class = "form-row";
		cvcRow.appendChild( this.getLabel("CVC") ); 
		cvcRow.appendChild( this.cvc = this.getInputField(4, "card-cvc") ); 
		
		
		var d = new Date();
		var curMon = d.getMonth() + 1;
		this.expMon = document.createElement("select");
		this.expMon.setAttribute("class", "card-expiry-month");
		this.addValues( this.expMon, 1, 12);
		this.expMon.value = curMon;
		
		var yearStart = d.getYear() + 1900;
		this.expYear = document.createElement("select");
		this.expYear.id = "test123";
		this.expYear.setAttribute("class", "card-expiry-year");
		this.addValues( this.expYear, yearStart, yearStart + 10, yearStart);
		this.expYear.value = yearStart;
		
		var expiryRow = document.createElement("div");
		expiryRow.setAttribute("class", "form-row");
		expiryRow.appendChild( this.getLabel("Expiration") ); 
		expiryRow.appendChild( this.expMon );
		expiryRow.appendChild( this.expYear );
		
		var postalRow = document.createElement("div");
		postalRow.setAttribute("class", "form-row");
		postalRow.appendChild( this.getLabel("Postal Code") );
		postalRow.appendChild( this.postalCode = this.getInputField(10, "postal-code") );
		this.postalCode.value = this.component.get("address_zip");
		
		this.submitBtn = document.createElement("button");
		this.submitBtn.type = "submit";
		this.submitBtn.setAttribute("class", "submit-button");
		this.submitBtn.innerText = "Submit Payment";
		this.submitBtn.id = "submitBtn";
		
		if (this.component.get("submitButtonText") != null)
			this.submitBtn.innerText = this.component.get("submitButtonText");
			
		this.error = document.createElement("label");
		this.error.setAttribute("class", "payment-errors");
		this.error.innerText = "";
		this.error.id = "error";
		
		form.appendChild(nameRow);
		form.appendChild(cardNumRow);
		form.appendChild(cvcRow);
		form.appendChild(expiryRow);
		form.appendChild(postalRow);
		form.appendChild(this.submitBtn);
		form.appendChild(this.error);
		
		var cssInput = ""+
				"font-size:12px;"+
				"padding:4px 2px;"+
				"border:solid 1px #aacfe4;"+
				"margin:2px 0 10px 5px;";

		var cssButton = "clear:both;"+
				"margin-left:150px;"+
				"width:125px;"+
				"height:31px;"+
				"background:#666666;"+
				"text-align:center;"+
				"line-height:21px;"+
				"color:#FFFFFF;"+
				"font-size:11px;"+
				"font-weight:bold;";
		
		var cssNode = "display:block; border:solid 2px #b7ddf2;"+
				"background:#ebf4fb;";
		
		var cssForm = "margin:0 auto;"+
				"width:400px;"+
				"padding:14px;";
		
		var cssError = "margin-top: 8px;text-align:center;padding: 10px;color: #dd0000; font-weight:bold; clear:both; display:block;";
		
		this.name.style.cssText = cssInput;
		this.cardNum.style.cssText = cssInput;
		this.cvc.style.cssText = cssInput;
		this.expMon.style.cssText = cssInput;
		this.expYear.style.cssText = cssInput;
		this.postalCode.style.cssText = cssInput;
		this.submitBtn.style.cssText = cssButton;
		this.error.style.cssText = cssError;
		form.style.cssText = cssForm;
		this._node.style.cssText = cssNode;
		

		Core.Web.Event.add(this.submitBtn, "click", Core.method(this, this._submitPayment), false);		
		
        this.container = document.createElement("div");
        this.container.appendChild(form);

		// Load Stripe.js
		var script = document.createElement('script');
		script.setAttribute("src", "https://js.stripe.com/v1/");
		script.onload = this.stripeLoadedCallback;
		script.onreadystatechange = function() {
			if (this.readyState == 'complete') {
				this.stripeLoadedCallback();
			}
		}			
        this.container.appendChild(script);

    	Echo.Sync.renderComponentDefaults(this.component, this._node);
        Echo.Sync.Insets.render(this.component.render("insets"), this._node, "padding");

        this._node.appendChild(this.container);
        
    },
    
    stripeLoadedCallback: function() {
		Stripe.setPublishableKey( stripeCtrl.component.get("stripePublicKey") );
    },
    
    _submitPayment : function()
    {
    	// disable the submit button to prevent repeated clicks
    	this.submitBtn.setAttribute("disabled", "disabled");
		this.submitBtn.innerText = "Processing...";
  
		Stripe.createToken({
			name: this.name.value,
			number: this.cardNum.value,
			cvc: this.cvc.value,
			exp_month: this.expMon.value,
			exp_year: this.expYear.value,
			address_zip: this.postalCode.value,
			address_line1: this.component.get("address_line1"),
			address_line2: this.component.get("address_line2"),
			address_city: this.component.get("address_city"),
			address_state: this.component.get("address_state"),
			address_country: this.component.get("address_country")
		}, this.stripeResponseHandler);
 
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
		   
         	var submitBtn = document.getElementById("submitBtn");
			submitBtn.innerText = "Submit Payment";
	    	submitBtn.removeAttribute("disabled");
	    	
         	var error = document.getElementById("error");
    		error.innerText = response.error.message;
       } else {
       
         	var submitBtn = document.getElementById("submitBtn");
			submitBtn.innerText = "Submitted";
	    	
       	   	var form = document.getElementById("payment-form");
       	   
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
        
        Core.Web.Event.removeAll(this.submitBtn);
        
	},

    renderUpdate: function(update) {
    
    }

});

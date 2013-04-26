if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.FancyButton = Core.extend(Echo.Button, {

    $load : function() {
        Echo.ComponentFactory.registerType("FancyButton", this);
        Echo.ComponentFactory.registerType("FB", this);
    },
    
    componentType :"UntzUntz.FancyButton"

});

UntzUntz.FancyButton.Peer = Core.extend(Echo.Sync.Button, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.FancyButton", this);
    },
   
   	processBackgroundGradient: function()
   	{
   		// W3C
   		var grad = 'linear-gradient(' + this.component.render("background") + ', ' + this.component.render("backgroundBottom") + ')';
   		
   		// mozilla
   		if (Core.Web.Env.BROWSER_MOZILLA)
			grad = '-moz-linear-gradient(top, ' + this.component.render("background") + ', ' + this.component.render("backgroundBottom") + ')';  		
   		
   		// webkit (Chrome, Safari)
   		if (Core.Web.Env.ENGINE_WEBKIT)
			grad = '-webkit-linear-gradient(top, ' + this.component.render("background") + ', ' + this.component.render("backgroundBottom") + ')';

		// Opera
		if (Core.Web.Env.ENGINE_PRESTO)
			grad = '-o-linear-gradient(top, ' + this.component.render("background") + ', ' + this.component.render("backgroundBottom") + ')';		

   		// IE
   		if (Core.Web.Env.ENGINE_MSHTML)
   		{
   			// IE6-9
   			this.div.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + this.component.render("background") + "', endColorstr='" + this.component.render("backgroundBottom") + "')";
   			// IE10
   			grad = '-ms-linear-gradient(top, ' + this.component.render("background") + ', ' + this.component.render("backgroundBottom") + ')';
		}
		
		if ((Core.Web.Env.BROWSER_CHROME && Core.Web.Env.BROWSER_VERSION_MAJOR < 10) || (Core.Web.Env.BROWSER_SAFARI && Core.Web.Env.BROWSER_VERSION_MAJOR < 5))
			grad = '-webkit-gradient(linear, left top, left bottom, color-stop(0%, ' + this.component.render("background") + '), color-stop(100%, ' + this.component.render("backgroundBottom") + '))';	
				   		   		
   		this.div.style.backgroundImage = grad;
   		
   	},
   	   
   /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.enabled = this.component.isRenderEnabled();

        this.div = Echo.Sync.Button._prototypeButton.cloneNode(false);
        this.div.id = this.component.renderId;        

		// setup
		var val = "display: inline-block;"
		val = val + "cursor: pointer;";
		
		// font ( \"HelveticaNeue-Light\", \"Helvetica Neue Light\", )
		val = val + "font-family:\"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;";
		val = val + "font-weight: " + this.component.get("fontWeight") + ";";
		val = val + "font-size: " + Echo.Sync.Extent.toPixels(this.component.render("fontSize"), false) + "px;";
		val = val + "text-align: center;";
		
		if (this.component.render("background"))
		{
			// background gradient
			val = val + "background-color: hsl(" + this.component.render("background") + ", 100%, 30%) !important;";
  			val = val + "background-repeat: repeat-x;";
					
			// border
			val = val + "border: 1px solid " + this.component.render("backgroundBottom") + ";";
			val = val + "border-bottom-color: darken(" + this.component.render("backgroundBottom") + ", 10%);";
		
			// shadow
		  	val = val + "-moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);";
	  		val = val + "-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);";
  			val = val + "box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);";

		}
  		
  		// foreground color
  		val = val + "color: " + this.component.render("foreground") + " !important;";
  		
  		// shadow if appropriate
		if (this.component.get("textShadowHPos"))
	  	{
	  		var shadowVal = "";
			shadowVal = shadowVal + Echo.Sync.Extent.toPixels(this.component.render("textShadowHPos"), false) + "px ";
			shadowVal = shadowVal + Echo.Sync.Extent.toPixels(this.component.render("textShadowVPos"), false) + "px ";
			if (this.component.render("textShadowBlur"))
				shadowVal = shadowVal + Echo.Sync.Extent.toPixels(this.component.render("textShadowBlur"), false) + "px ";
				
			if (this.component.get("textShadowColor"))
				shadowVal = shadowVal + this.component.get("textShadowColor");
	  	
	  		val = val + "text-shadow: " + shadowVal + ";";
	  	}	
	  	// pretty boy!
	  	val = val + "-webkit-font-smoothing: antialiased;";
  
  		this.div.style.cssText = val;
     
		Echo.Sync.LayoutDirection.render(this.component.getLayoutDirection(), this.div);
        if (this.enabled) {
            Echo.Sync.Color.renderFB(this.component, this.div);
            //Echo.Sync.Border.render(this.component.render("border"), this.div);
            //Echo.Sync.FillImage.render(this.component.render("backgroundImage"), this.div);
        } else {
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "foreground", "disabledForeground", true),
                    this.div, "color");
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "background", "disabledBackground", true),
                    this.div, "backgroundColor");
            Echo.Sync.Border.render(Echo.Sync.getEffectProperty(this.component, "border", "disabledBorder", true),
                    this.div);
            //Echo.Sync.FillImage.render(Echo.Sync.getEffectProperty(this.component,
            //        "backgroundImage", "disabledBackgroundImage", true), this.div);
        }

        Echo.Sync.Insets.render(this.component.render("insets"), this.div, "padding");
        Echo.Sync.Alignment.render(this.component.render("alignment"), this.div, true, this.component);

        var toolTipText = this.component.render("toolTipText");
        if (toolTipText) {
            this.div.title = toolTipText;
        }
        var width = this.component.render("width");
        if (width) {
            this.div.style.width = Echo.Sync.Extent.toCssValue(width, true, true);
        }
        var height = this.component.render("height");
        if (height) {
            this.div.style.height = Echo.Sync.Extent.toCssValue(height, false);
            this.div.style.overflow = "hidden";
        }

        this.renderContent();

        if (this.enabled) {
            // Add event listeners for focus and mouse rollover.  When invoked, these listeners will register the full gamut
            // of button event listeners.  There may be a large number of such listeners depending on how many effects
            // are enabled, and as such we do this lazily for performance reasons.
            Core.Web.Event.add(this.div, "focus", this._processInitEventRef, false);
            Core.Web.Event.add(this.div, "mouseover", this._processInitEventRef, false);
        }

		if (this.component.render("borderRadius"))
		{
			this.div.style.setProperty("border-radius", Echo.Sync.Extent.toPixels(this.component.render("borderRadius"), false) + "px");
			this.div.style.setProperty("background-clip", "padding-box");
		}
		
		this.processBackgroundGradient();

        parentElement.appendChild(this.div);  
        
        this.div.innerHTML = this.div.innerText;
    },
    
	/**
     * Enables/disables pressed appearance of button.
     * 
     * @param {Boolean} rollover the new pressed state
     * @param {Boolean} pressed the new pressed state
     */
    setHighlightState: function(rollover, pressed) {
            var focused = this.component && this.component.application && 
                    this.component.application.getFocusedComponent() == this.component;
            
            // Determine effect property name.  Priorities are 1: pressed, 2: rollover: 3: focused.
            var ep = pressed ? "pressed" : (rollover ? "rollover" : "focused");
            var state = focused || pressed || rollover;

			if (state)
			{
				this.div.style.backgroundImage = "";
				this.div.style.backgroundColor = this.component.render("backgroundBottom");
				
				if (this.component.get("linkFlag"))
					this.div.style.textDecoration = "underline";
			}
			else
			{
				this.div.style.textDecoration = "none";
				this.div.style.backgroundColor = this.component.render("background");
				this.processBackgroundGradient();

			}
    }    
});

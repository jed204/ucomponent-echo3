// UntzUntz =================================================================================
// Ensure that the 'UntzUntz' and 'UntzUntz.Sync' namespaces exists
if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.AlertLabel = Core.extend(Echo.Component, {

    $load : function() {
        Echo.ComponentFactory.registerType("UntzUntz.AlertLabel", this);
    },

    componentType :"UntzUntz.AlertLabel"
});

/**
	
	Label that can 'flash' to draw the user's eye

*/
UntzUntz.AlertLabel.Peer = Core.extend(Echo.Render.ComponentSync, { 

    $static: {
    
       /** 
        * Default spacing between label icon/text. 
        * @type #Extent
        */
       _defaultIconTextMargin: 5,
       _defaultInitialHighlightTime: 1500,
       _defaultStepTime: 75
    },

    $load: function() {
        Echo.Render.registerPeer("UntzUntz.AlertLabel", this);
    },

    /**
     * The text node or element representing the label.
     * @type Node
     */
    _node: null,
    _holding: null,
    doneTId: null,
    intTId: null,

    /**
     * Formats the whitespace in the given text for use in HTML.
     * 
     * @param text {String} the text to format
     * @param parentElement the element to append the text to
     */
    _formatWhitespace: function(text, parentElement) {
        // switch between spaces and non-breaking spaces to preserve line wrapping
        text = text.replace(/\t/g, " \u00a0 \u00a0");
        text = text.replace(/ {2}/g, " \u00a0");
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (i > 0) {
                parentElement.appendChild(document.createElement("br"));
            }
            if (line.length > 0) {
                parentElement.appendChild(document.createTextNode(line));
            }
        }
    },
    
    updateHighlight: function(step, parent) {

	  var updated = false;
      if (rhex < finalRHex)
	  {
	  	  updated = true;
	      rhex += 11;
	  }
      if (ghex < finalGHex)
	  {
	  	  updated = true;
          ghex += 11;
      }
      if (bhex < finalBHex)
	  {
	  	  updated = true;
          bhex += 11;
	  }
	  
      if (updated)
      {
          	this._node.style.background = "rgb(" + rhex + "," + ghex + "," + bhex + ")";
      }
      else
      {
          hex = 255; //reset hex value
          clearInterval(this.intTId);
          this.intTId = null;
	      this.doneTId = setTimeout(function(){parent.done();}, 2000);
      }
	},
	
	done: function() {
		
		Core.Debug.consoleWrite("Alert Label DONE called");
		
		if (this.intTId)
	      	clearInterval(this.intTId);
	    if (this.doneTId)
	      	clearInterval(this.doneTId);
        this.intTId = null;
        this.doneTId = null;
      	
		if (this._node && this._holding)
	    {
	    	try {
	    		this._holding.removeChild(this._node);
			} catch (e) {}
	    }	
	    
	    if (this._containerElement && this._holding)
	    {
	    	try {
		        this._containerElement.removeChild(this._holding);
			} catch (e) {}
	    }
    	
        this._node = null;
        this._holding = null;
        this._containerElement = null;
	},
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
    
    	this.done();
	    this._containerElement = document.getElementById('body');
        var icon = this.component.render("icon"),
        text = this.component.render("text"),
        foreground = this.component.render("foreground"),
        background = this.component.render("background"),
        toolTip = this.component.render("toolTipText"),
        img;
    
        if (text != null && text.length > 0) {
            var lineWrap = this.component.render("lineWrap", true);
            var formatWhitespace = this.component.render("formatWhitespace", false) &&
                    (text.indexOf(' ') != -1 || text.indexOf('\n') != -1 || text.indexOf('\t') != -1);
            
            if (icon) {
                // Text and icon.
                var iconTextMargin = this.component.render("iconTextMargin", 
                        Echo.Sync.Label._defaultIconTextMargin);
                var orientation = Echo.Sync.TriCellTable.getOrientation(this.component, "textPosition");
                var tct = new Echo.Sync.TriCellTable(orientation, Echo.Sync.Extent.toPixels(iconTextMargin));
                img = document.createElement("img");
                Echo.Sync.ImageReference.renderImg(icon, img);
                if (formatWhitespace) {
                    this._formatWhitespace(text, tct.tdElements[0]);
                } else {
                    tct.tdElements[0].appendChild(document.createTextNode(text));
                }
                if (!lineWrap) {
                    tct.tdElements[0].style.whiteSpace = "nowrap";
                }
                tct.tdElements[1].appendChild(img);
                this._node = tct.tableElement;
                this._node.id = this.component.renderId;
                Echo.Sync.renderComponentDefaults(this.component, this._node);
            } else {
                // Text without icon.
                var font = this.component.render("font");
                if (!this.client.designMode && !toolTip && !font && lineWrap && !foreground && !background && 
                        !formatWhitespace && !this.component.getLayoutDirection()) {
                    this._node = document.createTextNode(text);
                } else {
                    this._node = document.createElement("span");
                    this._node.style.cssText = "display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size:1.5em; border-radius: 5px; padding: 20px; margin: 10px auto; box-shadow: 0 0 10px #222";
                    this._node.id = this.component.renderId;
                    if (formatWhitespace) {
                        this._formatWhitespace(text, this._node);
                    } else {
                        this._node.appendChild(document.createTextNode(text));
                    }
                    if (!lineWrap) {
                        this._node.style.whiteSpace = "nowrap";
                    }
                    Echo.Sync.renderComponentDefaults(this.component, this._node);
                }
            }
        } else if (icon) {
            img = document.createElement("img");
            Echo.Sync.ImageReference.renderImg(icon, img);
            this._node = document.createElement("span");
            this._node.id = this.component.renderId;
            this._node.appendChild(img);
            Echo.Sync.Color.render(this.component.render("background"), this._node, "backgroundColor");
        } else {
            // Neither icon nor text, render blank.
            if (this.client.designMode) {
                this._node = document.createElement("span");
                this._node.id = this.component.renderId;
            } else {
                this._node = null;
            }
        }
    
        if (this._node) {
            if (toolTip) {
                this._node.title = toolTip;
            }
            
	        this._holding = document.createElement("div");
	    	this._holding.id = this.component.renderId;
	        this._holding.style.cssText = "text-align: center; z-index: 32766; position: relative; top: 75px;";
	        this._holding.appendChild(this._node);
	        
	        if (this._containerElement)
	        {
		        this._containerElement.appendChild(this._holding);
	            
				var step = this.component.render("step", UntzUntz.AlertLabel.Peer._defaultStepTime);
	            
				// TODO: Make these configurable
				rhex = 255; ghex = 255; bhex = 170;
		        finalRHex = 255; finalGHex = 255; finalBHex = 255;
		        
		        this.prepInterval(this, step);
		    }
        }
        else
        	this.done();

    },
    
    prepInterval: function(parent, step)
    {
		var initialHighlightTime = this.component.render("initialHighlightTime", UntzUntz.AlertLabel.Peer._defaultInitialHighlightTime);
    	this.intTId = setInterval(function(){parent.updateHighlight(initialHighlightTime, parent);}, step);
    }, 
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
		this.done();    
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
    
		Core.Debug.consoleWrite("AlertLabel -> Updating : " + update);
    
        if (this._node) {
            this._node.parentNode.removeChild(this._node);
        }
        
        this.renderAdd(update, this._containerElement);
        return false; // Child elements not supported: safe to return false.
    }
    
});

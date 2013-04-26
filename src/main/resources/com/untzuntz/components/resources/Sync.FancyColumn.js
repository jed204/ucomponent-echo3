if (!Core.get(window, ["UntzUntz"])) {
    Core.set(window, ["UntzUntz"], {});
}

UntzUntz.FancyColumn = Core.extend(Echo.Column, {

    $load : function() {
        Echo.ComponentFactory.registerType("FancyColumn", this);
        Echo.ComponentFactory.registerType("FC", this);
    },
    
    componentType :"UntzUntz.FancyColumn"

});

UntzUntz.FancyColumn.Peer = Core.extend(Echo.Sync.Column, {

	$load: function() {
        Echo.Render.registerPeer("UntzUntz.FancyColumn", this);
    },
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.element = this.containerElement = document.createElement("div");
        this.element.id = this.component.renderId;
        this.element.style.outlineStyle = "none";
        this.element.tabIndex = "-1";

        Echo.Sync.renderComponentDefaults(this.component, this.element);
        Echo.Sync.Border.render(this.component.render("border"), this.element);
        Echo.Sync.Insets.render(this.component.render("insets"), this.element, "padding");

        this.cellSpacing = Echo.Sync.Extent.toPixels(this.component.render("cellSpacing"), false);
        if (this.cellSpacing) {
            this.spacingPrototype = document.createElement("div");
            this.spacingPrototype.style.height = this.cellSpacing + "px";
            this.spacingPrototype.style.fontSize = "1px";
            this.spacingPrototype.style.lineHeight = "0";
        }

		var val = "";
		if (this.component.render("shadowVPos"))
			val = val + Echo.Sync.Extent.toPixels(this.component.render("shadowVPos"), false) + "px ";
		if (this.component.render("shadowHPos"))
			val = val + Echo.Sync.Extent.toPixels(this.component.render("shadowHPos"), false) + "px ";
		if (this.component.render("shadowBlur"))
			val = val + Echo.Sync.Extent.toPixels(this.component.render("shadowBlur"), false) + "px ";
		if (this.component.render("shadowSpread"))
			val = val + Echo.Sync.Extent.toPixels(this.component.render("shadowSpread"), false) + "px ";
		if (this.component.render("shadowColor"))
			val = val + this.component.render("shadowColor");

		if (val.length > 0)
		{
			this.element.style.setProperty("-moz-box-shadow", val);
			this.element.style.setProperty("-webkit-box-shadow", val);
			this.element.style.setProperty("box-shadow", val);
		}
	
		if (this.component.render("borderRadius"))
		{
			this.element.style.setProperty("border-radius", Echo.Sync.Extent.toPixels(this.component.render("borderRadius"), false) + "px");
			this.element.style.setProperty("background-clip", "padding-box");
		}				
		
        this.renderAddChildren(update);

        parentElement.appendChild(this.element);
    }
});
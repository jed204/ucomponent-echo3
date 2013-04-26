package com.untzuntz.components.app;

import nextapp.echo.app.Color;
import nextapp.echo.app.Column;
import nextapp.echo.app.Extent;

/**
 * The Fancy Column provides a shadow option for a column.
 * 
 * @author jdanner
 *
 */
public class FancyColumn extends Column {

	private static final long serialVersionUID = 3199732228016410254L;

    public static final String PROPERTY_SHADOW_COLOR = "shadowColor";
    public static final String PROPERTY_SHADOW_HPOS = "shadowHPos";
    public static final String PROPERTY_SHADOW_VPOS = "shadowVPos";
    public static final String PROPERTY_SHADOW_BLUR = "shadowBlur";
    public static final String PROPERTY_SHADOW_SPREAD = "shadowSpread";
    public static final String PROPERTY_SHADOW_INSET = "shadowInset";
    public static final String PROPERTY_BORDER_RADIUS = "borderRadius";

    public FancyColumn() {
    	super();
    }
    
    public Color getShadowColor() {
    	return (Color)get(PROPERTY_SHADOW_COLOR);
    }

    public void setShadowColor(Color color) {
    	set(PROPERTY_SHADOW_COLOR, color);
    }
    
    public Extent getShadowHorizontalPosition() {
    	return (Extent)get(PROPERTY_SHADOW_HPOS);
    }
    
    public void setShadowHorizontalPosition(Extent ex) {
    	set(PROPERTY_SHADOW_HPOS, ex);
    }
	
    public Extent getShadowVerticalPosition() {
    	return (Extent)get(PROPERTY_SHADOW_VPOS);
    }
    
    public void setShadowVerticalPosition(Extent ex) {
    	set(PROPERTY_SHADOW_VPOS, ex);
    }
	
    public Extent getShadowBlur() {
    	return (Extent)get(PROPERTY_SHADOW_BLUR);
    }
    
    public void setShadowBlur(Extent ex) {
    	set(PROPERTY_SHADOW_BLUR, ex);
    }
	
    public Extent getShadowSpread() {
    	return (Extent)get(PROPERTY_SHADOW_SPREAD);
    }
    
    public void setShadowSpread(Extent ex) {
    	set(PROPERTY_SHADOW_SPREAD, ex);
    }
    
    public Boolean getShadowInset() {
    	return (Boolean)get(PROPERTY_SHADOW_INSET);
    }
	
    public void setShadowInset(Boolean b) {
    	set(PROPERTY_SHADOW_INSET, b);
    }
    
    public Extent getBorderRadius() {
    	return (Extent)get(PROPERTY_BORDER_RADIUS);
    }
    
    public void setBorderRadius(Extent ex) {
    	set(PROPERTY_BORDER_RADIUS, ex);
    }
    

}

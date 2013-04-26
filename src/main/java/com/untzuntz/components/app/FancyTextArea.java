package com.untzuntz.components.app;

import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Font;
import nextapp.echo.app.Insets;
import nextapp.echo.app.LayoutData;
import nextapp.echo.app.text.StringDocument;
import nextapp.echo.app.text.TextComponent;

public class FancyTextArea extends TextComponent {

	private static final long serialVersionUID = 2299732338016410254L;

    public static final String PROPERTY_HINT_TEXT = "hintText";
    public static final String PROPERTY_BORDER_RADIUS = "borderRadius";
    public static final String PROPERTY_ERROR_FLAG = "errorFlag";
    
    private static final Extent EX_5 = new Extent(5, Extent.PX);
    private static final Insets IN_5 = new Insets(5);
    private static final Font FONT_MED = new Font(Font.HELVETICA, Font.PLAIN, new Extent(15));
    

    /**
     * Creates a new <code>TextArea</code> with an empty 
     * <code>StringDocument</code> as its model, and default width and
     * height settings.
     */
    public FancyTextArea() {
        super(new StringDocument());
		setInsets(IN_5);
		setFont(FONT_MED);
		setBorderRadius(EX_5);
		setBorder(new Border(1, new Color(0xbbbbbb), Border.STYLE_SOLID));
    }

    public FancyTextArea(String hintText)
    {
    	this();
    	setHintText(hintText);
    }

    public FancyTextArea(String hintText, Extent width, LayoutData layout)
    {
    	this(hintText);
    	setWidth(width);
    	setLayoutData(layout);
    	
    }

    public String getHintText() {
    	return (String)get(PROPERTY_HINT_TEXT);
    }
    
    public void setHintText(String t) {
    	set(PROPERTY_HINT_TEXT, t);
    }

    public Extent getBorderRadius() {
    	return (Extent)get(PROPERTY_BORDER_RADIUS);
    }
    
    public void setBorderRadius(Extent ex) {
    	set(PROPERTY_BORDER_RADIUS, ex);
    }
    
    public Boolean getErrorFlag() {
    	return (Boolean)get(PROPERTY_ERROR_FLAG);
    }
    
    public void setErrorFlag(Boolean b) {
    	set(PROPERTY_ERROR_FLAG, b);
    }

}

package com.untzuntz.components.app;

import nextapp.echo.app.Alignment;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.Insets;

public class AlertLabel extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20070101L;

    public static final String PROPERTY_FORMAT_WHITESPACE = "formatWhitespace";
    public static final String PROPERTY_ICON = "icon";
    public static final String PROPERTY_ICON_TEXT_MARGIN = "iconTextMargin";
    public static final String PROPERTY_LINE_WRAP = "lineWrap";
    public static final String PROPERTY_TEXT = "text";
    public static final String PROPERTY_TEXT_ALIGNMENT = "textAlignment";
    public static final String PROPERTY_TEXT_POSITION = "textPosition";
    public static final String PROPERTY_TOOL_TIP_TEXT = "toolTipText";
    public static final String PROPERTY_INITIAL_HIGHLIGHT_TIME = "initialHighlightTime";
    public static final String PROPERTY_STEP_TIME = "stepTime";
    public static final String PROPERTY_INSETS = "insets";

	public static final Color		LIGHT_YELLOW	= new Color(0xffff66);
	public static final Insets		DEFAULT_INSETS	= new Insets(5);
	
   /**
     * Creates a label with no text or icon.
     */
    public AlertLabel() {
        this(null, null);
        setBackground(LIGHT_YELLOW);
        setInsets(DEFAULT_INSETS);
        setVisible(false);
    }
    
    /**
     * Creates a label with text.
     *
     * @param text the text to be displayed
     */
    public AlertLabel(String text) {
        this(text, null);
        setBackground(LIGHT_YELLOW);
        setInsets(DEFAULT_INSETS);
    }
    
    /**
     * Creates a label with an icon.
     *
     * @param icon the icon to be displayed
     */
    public AlertLabel(ImageReference icon) {
        this(null, icon);
        setBackground(LIGHT_YELLOW);
        setInsets(DEFAULT_INSETS);
    }

    /**
     * Creates a label with text and an icon.
     *
     * @param text the text to be displayed
     * @param icon the icon to be displayed
     */
    public AlertLabel(String text, ImageReference icon) {
        super();
    
        setIcon(icon);
        setText(text);
        setBackground(LIGHT_YELLOW);
        setInsets(DEFAULT_INSETS);
    }
    
    /**
     * Returns the icon of the label.
     * 
     * @return the icon
     */
    public ImageReference getIcon() {
        return (ImageReference) get(PROPERTY_ICON);
    }
    
    /**
     * Returns the margin size between the icon and the text.
     * The margin will only be displayed if the label has both
     * icon and text properties set.
     * 
     * @return the margin size 
     */
    public Extent getIconTextMargin() {
        return (Extent) get(PROPERTY_ICON_TEXT_MARGIN);
    }
    
    /**
     * Returns the text of the label.
     * 
     * @return the text
     */
    public String getText() {
        return (String) get(PROPERTY_TEXT);
    }

    /**
     * Returns the alignment of the text relative to the icon.
     * 
     * @return the text alignment
     */
    public Alignment getTextAlignment() {
        return (Alignment) get(PROPERTY_TEXT_ALIGNMENT);
    }

    /**
     * Returns the position of the text relative to the icon.
     * 
     * @return the text position
     */
    public Alignment getTextPosition() {
        return (Alignment) get(PROPERTY_TEXT_POSITION);
    }

    /**
     * Returns the tool tip text (displayed when the mouse cursor is hovered 
     * over the component).
     * 
     * @return the tool tip text
     */
    public String getToolTipText() {
        return (String) get(PROPERTY_TOOL_TIP_TEXT);
    }
    
    /**
     * Determines if the text of the label should be formatted in case the 
     * target renderer does not preserve whitespace. Default value is false.
     * 
     * @return the format whitespace state
     */
    public boolean isFormatWhitespace() {
        Boolean value = (Boolean) get(PROPERTY_FORMAT_WHITESPACE);
        return value == null ? false : value.booleanValue();
    }
    
    /**
     * Determines if the text of the label should wrap in the event that 
     * horizontal space is limited.  Default value is true.
     * 
     * @return the line wrap state
     */
    public boolean isLineWrap() {
        Boolean value = (Boolean) get(PROPERTY_LINE_WRAP);
        return value == null ? true : value.booleanValue();
    }
    
    /**
     * This component does not support children.
     * 
     * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
     */
    public boolean isValidChild(Component component) {
        return false;
    }

    /**
     * Sets whether the text of the label should be formatted in case the target
     * renderer does not preserve whitespace. Default value is false.
     * 
     * @param newValue the new format whitespace state
     */
    public void setFormatWhitespace(boolean newValue) {
        set(PROPERTY_FORMAT_WHITESPACE, newValue ? Boolean.TRUE : Boolean.FALSE);
    }
    
    /**
     * Sets the icon to be displayed.
     *
     * @param newValue the icon to be displayed
     */
    public void setIcon(ImageReference newValue) {
        set(PROPERTY_ICON, newValue);
    }
    
    /**
     * Sets the margin size between the icon and the text.
     * The margin will only be displayed if the label has both
     * icon and text properties set.
     * 
     * @param newValue the margin size 
     */
    public void setIconTextMargin(Extent newValue) {
        set(PROPERTY_ICON_TEXT_MARGIN, newValue);
    }
    
    /**
     * Sets whether the text of the label should wrap in the event that 
     * horizontal space is limited.  Default value is true.
     * 
     * @param newValue the new line wrap state
     */
    public void setLineWrap(boolean newValue) {
        set(PROPERTY_LINE_WRAP, new Boolean(newValue));
    }
    
    /**
     * Sets the text to be displayed.
     *
     * @param newValue the text to be displayed
     */
    public void setText(String newValue) {
    	setVisible(true);
        set(PROPERTY_TEXT, newValue);
    }
    
    /**
     * Sets the alignment of the text relative to the icon.
     * Note that only one of the provided <code>Alignment</code>'s
     * settings should be non-default.
     * 
     * @param newValue the new text position
     */
    public void setTextAlignment(Alignment newValue) {
        set(PROPERTY_TEXT_ALIGNMENT, newValue);
    }
    
    /**
     * Sets the position of the text relative to the icon.
     * Note that only one of the provided <code>Alignment</code>'s
     * settings should be non-default.
     * 
     * @param newValue the new text position
     */
    public void setTextPosition(Alignment newValue) {
        set(PROPERTY_TEXT_POSITION, newValue);
    }

    /**
     * Sets the tool tip text (displayed when the mouse cursor is hovered 
     * over the component).
     * 
     * @param newValue the new tool tip text
     */
    public void setToolTipText(String newValue) {
        set(PROPERTY_TOOL_TIP_TEXT, newValue);
    }

    /**
     * Sets the amount of time the highlight is shown before we start to fade
     * 
     * @param timeInMilliseconds
     */
    public void setInitialHighlightTime(int timeInMilliseconds)
    {
    	set(PROPERTY_INITIAL_HIGHLIGHT_TIME, new Integer(timeInMilliseconds));
    }
    
    /**
     * Sets the amount of time between changing the background another level
     * 
     * @param timeInMilliseconds
     */
    public void setStepTime(int timeInMilliseconds)
    {
    	set(PROPERTY_STEP_TIME, new Integer(timeInMilliseconds));
    }

    /**
     * The amount of time the highlight is static before we fade it
     * @return
     */
    public Integer getInitialHighlightTime()
    {
    	Integer value = (Integer) get(PROPERTY_INITIAL_HIGHLIGHT_TIME);
        return value == null ? 1500 : value.intValue();
    }

    /**
     * Amount of time between changing the background another level
     * @return
     */
    public Integer getStepTime()
    {
    	Integer value = (Integer) get(PROPERTY_STEP_TIME);
        return value == null ? 75 : value.intValue();
    }
    
    /**
     * Returns the insets of the text component.
     * 
     * @return the insets
     */
    public Insets getInsets() {
        return (Insets) get(PROPERTY_INSETS);
    }

    /**
     * Sets the insets of the text component.
     * 
     * @param newValue the new insets
     */
    public void setInsets(Insets newValue) {
        set(PROPERTY_INSETS, newValue);
    }


}

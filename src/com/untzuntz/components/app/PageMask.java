package com.untzuntz.components.app;

import nextapp.echo.app.Component;

public class PageMask extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20070101L;

    public static final String PROPERTY_ZINDEX = "zIndex";
    public static final String PROPERTY_OPACITY = "opacity";
    public static final String PROPERTY_MASK_COLOR = "maskColor";

   /**
     * Creates a label with no text or icon.
     */
    public PageMask() {
        set(PROPERTY_OPACITY, "75");
        set(PROPERTY_ZINDEX, "32766");
        set(PROPERTY_MASK_COLOR, "000000");
        setVisible(false);
    }
    
    /**
     * This component does not support children.
     * 
     * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
     */
    public boolean isValidChild(Component component) {
        return false;
    }

}

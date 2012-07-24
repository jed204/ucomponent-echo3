package com.untzuntz.components.app;

import java.util.EventListener;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class Floater extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20121402L;

    public static final String PROPERTY_TEXT = "text";
    public static final String PROPERTY_PARENT_RENDER_ID = "parentRenderId";
    public static final String PROPERTY_TOP_SPACE = "topSpacing";
    public static final String PROPERTY_LEFT_SPACE = "leftSpacing";
    

    public static final String ACTION_LISTENERS_CHANGED_PROPERTY = "actionListeners";
    public static final String ACTION_COMMAND_CHANGED_PROPERTY = "actionCommand";
    public static final String INPUT_ACTION = "action";

    private String actionCommand;
    
    public String getActionCommand() {
        return actionCommand;
    }

    public void setActionCommand(String newValue) {
        String oldValue = actionCommand;
        actionCommand = newValue;
        firePropertyChange(ACTION_COMMAND_CHANGED_PROPERTY, oldValue, newValue);
    }

   /**
     * 
     */
    public Floater() {
    }
    
    public void addActionListener(ActionListener l) {
        getEventListenerList().addListener(ActionListener.class, l);
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, null, l);
    }

    public void removeActionListener(ActionListener l) {
        getEventListenerList().removeListener(ActionListener.class, l);
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, l, null);
    }

    public boolean hasActionListeners() {
        return hasEventListenerList() 
                && getEventListenerList().getListenerCount(ActionListener.class) > 0;
    }

    private void fireAction() {
        EventListener[] actionListeners = getEventListenerList().getListeners(ActionListener.class);
        ActionEvent e = new ActionEvent(this, getActionCommand());
        for (int i = 0; i < actionListeners.length; ++i) {
            ((ActionListener) actionListeners[i]).actionPerformed(e);
        }
    }
    
    public void setText(String text) {
        set(PROPERTY_TEXT, text);
    }

    public String getText() {
    	return (String)get(PROPERTY_TEXT);
    }
    
    public void setParentRenderId(String text) {
        set(PROPERTY_PARENT_RENDER_ID, text);
    }

    public String getParentRenderId() {
    	return (String)get(PROPERTY_PARENT_RENDER_ID);
    }
    
    public void setTopSpacing(Integer y) {
    	set(PROPERTY_TOP_SPACE, y);
    }
    
    public Integer getTopSpacing() {
    	return get(PROPERTY_TOP_SPACE) == null ? 0 : (Integer)get(PROPERTY_TOP_SPACE);
    }

    public void setLeftSpacing(Integer x) {
        set(PROPERTY_LEFT_SPACE, x);
    }

    public Integer getLeftSpacing() {
    	return get(PROPERTY_LEFT_SPACE) == null ? 0 : (Integer)get(PROPERTY_LEFT_SPACE);
    }

    /**
     * This component does not support children.
     * 
     * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
     */
    public boolean isValidChild(Component component) {
        return false;
    }

    public void processInput(String inputName, Object inputValue) {
        super.processInput(inputName, inputValue);
        if (INPUT_ACTION.equals(inputName)) {
        	System.out.println("JS TIMER HIT " + System.currentTimeMillis());
            fireAction();
        }
    }
	
}

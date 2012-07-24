package com.untzuntz.components.app;

import java.util.EventListener;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class JSTimer extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20121402L;

    public static final String PROPERTY_TIME = "time";

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
    public JSTimer() {
        set(PROPERTY_TIME, 60000);
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
    
    public void setTime(int ms) {
        set(PROPERTY_TIME, ms);
    }

    public int getTime() {
    	return get(PROPERTY_TIME) == null ? 0 : (Integer)get(PROPERTY_TIME);
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

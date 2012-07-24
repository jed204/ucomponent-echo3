package com.untzuntz.components.app;

import java.util.EventListener;
import java.util.List;
import java.util.Vector;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class NonEchoAccess extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20110429L;
    
    public static final String ACTION_COMMAND_CHANGED_PROPERTY = "actionCommand";
    public static final String ACTION_LISTENERS_CHANGED_PROPERTY = "actionListeners";
    public static final String INPUT_ACTION = "action";
    public static final String ACTION_MESSAGE_CHANGED_PROPERTY = "actionMessage";
    public static final String PROPERTY_ACTION_MESSAGE = "actionMessage";

    private String actionCommand;
    
    /**
     * Creates an ActiveXControl
     */
    public NonEchoAccess() {
    	super();
    }
    
    public String getActionCommand() {
        return actionCommand;
    }

    public void setActionCommand(String newValue) {
        String oldValue = actionCommand;
        actionCommand = newValue;
        firePropertyChange(ACTION_COMMAND_CHANGED_PROPERTY, oldValue, newValue);
    }

    public String getActionMessage()
    {
    	return (String)get(PROPERTY_ACTION_MESSAGE);
    }
    
    private void setActionMessage(String msg)
    {
    	set(PROPERTY_ACTION_MESSAGE, msg);
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
     * Adds an <code>ActionListener</code> to the <code>ActiveXControl</code>.
     * The <code>ActionListener</code> will be invoked when the user
     * presses the ENTER key in the field.
     * 
     * @param l the <code>ActionListener</code> to add
     */
    public void addActionListener(ActionListener l) {
        getEventListenerList().addListener(ActionListener.class, l);
        // Notification of action listener changes is provided due to 
        // existence of hasActionListeners() method. 
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, null, l);
    }

    /**
     * Fires an action event to all listeners.
     */
    private void fireActionEvent() {
    	System.out.println("Firing Actions...");
        if (!hasEventListenerList()) {
            return;
        }
        EventListener[] listeners = getEventListenerList().getListeners(ActionListener.class);
        ActionEvent e = null;
        for (int i = 0; i < listeners.length; ++i) {
            if (e == null) {
                e = new ActionEvent(this, getActionCommand());
            } 
            ((ActionListener) listeners[i]).actionPerformed(e);
        }
    }
    
    /**
     * Determines if any <code>ActionListener</code>s are registered.
     * 
     * @return true if any action listeners are registered
     */
    public boolean hasActionListeners() {
        return hasEventListenerList() && getEventListenerList().getListenerCount(ActionListener.class) != 0;
    }
    
    /**
     * @see nextapp.echo.app.Component#processInput(java.lang.String, java.lang.Object)
     */
    public void processInput(String inputName, Object inputValue) {
    	
        System.out.println("processInput: " + inputName + " / " + inputValue);
        
        super.processInput(inputName, inputValue);

    	if (INPUT_ACTION.equals(inputName))
            fireActionEvent();
    	else if (PROPERTY_ACTION_MESSAGE.equals(inputName))
            setActionMessage((String)inputValue);
    }
    
    public List<ActionListener> getActionListeners()
    {
    	EventListener[] elArray = getEventListenerList().getListeners(ActionListener.class);
    	List<ActionListener> ret = new Vector<ActionListener>();
    	for (EventListener el : elArray)
    		ret.add((ActionListener)el);
    	
    	return ret;
    }
    
    /**
     * Removes an <code>ActionListener</code> from the <code>ActiveXControl</code>.
     * 
     * @param l the <code>ActionListener</code> to remove
     */
    public void removeActionListener(ActionListener l) {
        if (!hasEventListenerList()) {
            return;
        }
        getEventListenerList().removeListener(ActionListener.class, l);
        // Notification of action listener changes is provided due to 
        // existence of hasActionListeners() method. 
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, l, null);
    }
}

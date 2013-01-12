package com.untzuntz.components.app;

import java.util.EventListener;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class InteleViewerLaunch extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20121402L;

    public static final String PROPERTY_BASE_URL = "baseUrl";
    public static final String PROPERTY_USERNAME = "userName";
    public static final String PROPERTY_SESSION_ID = "sessionId";
    public static final String PROPERTY_LAUNCH_ID = "lid";
    public static final String PROPERTY_ACC_NUM = "accessionNumber";
    public static final String PROPERTY_PAT_ID = "patientId";
    public static final String PROPERTY_LAUNCH_RESULT = "launchResult";

    public static final String LAUNCH_RESULT_CHANGED_PROPERTY = "launchResult";
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
    public InteleViewerLaunch() {
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

    /**
     * Fires an action event to all listeners.
     */
    private void fireAction() {
        if (!hasEventListenerList())
            return;
        
        EventListener[] actionListeners = getEventListenerList().getListeners(ActionListener.class);
        ActionEvent e = new ActionEvent(this, getActionCommand());
        for (int i = 0; i < actionListeners.length; ++i) {
            ((ActionListener) actionListeners[i]).actionPerformed(e);
        }
    }
    
    public void setBaseURL(String ms) {
        set(PROPERTY_BASE_URL, ms);
    }

    public String getBaseURL() {
    	return (String)get(PROPERTY_BASE_URL);
    }

    public void setUserName(String ms) {
        set(PROPERTY_USERNAME, ms);
    }

    public String getUserName() {
    	return (String)get(PROPERTY_USERNAME);
    }

    public void setSessionID(String ms) {
        set(PROPERTY_SESSION_ID, ms);
    }

    public String getSessionID() {
    	return (String)get(PROPERTY_SESSION_ID);
    }
    
    public void setAccessionNumber(String ms) {
        set(PROPERTY_ACC_NUM, ms);
    }

    public String getAccessionNumber() {
    	return (String)get(PROPERTY_ACC_NUM);
    }
    
    public void setPatientID(String ms) {
        set(PROPERTY_PAT_ID, ms);
    }

    public String getPatientID() {
    	return (String)get(PROPERTY_PAT_ID);
    }
    
    public void setLaunchResult(String ms) {
        set(PROPERTY_LAUNCH_RESULT, ms);
    }

    public String getLaunchResult() {
    	return (String)get(PROPERTY_LAUNCH_RESULT);
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
    	System.out.println("Process Input: " + inputName + "|" + inputValue + " @ " + System.currentTimeMillis());
        if (LAUNCH_RESULT_CHANGED_PROPERTY.equals(inputName)) {
        	setLaunchResult((String)inputValue);
            fireAction();
        }
    }

}

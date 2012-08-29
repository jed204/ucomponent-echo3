package com.untzuntz.components.app;

import java.util.EventListener;
import java.util.List;
import java.util.Vector;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class ActiveXControl extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20110429L;
    
    public static final String ACTION_COMMAND_CHANGED_PROPERTY = "actionCommand";
    public static final String ACTION_LISTENERS_CHANGED_PROPERTY = "actionListeners";
    
    public static final String INPUT_ACTION = "action";
    public static final String ACTION_MESSAGE_CHANGED_PROPERTY = "actionMessage";
    public static final String ACTION_NAME_CHANGED_PROPERTY = "actionName";
    
    public static final String PROPERTY_ACTIVEX_CTRL_ID = "activeXControlId";
    public static final String PROPERTY_OBJECT_CLASS_ID = "objectClassId";
    public static final String PROPERTY_CODEBASE_ID = "codeBase";
    public static final String PROPERTY_CTRL_WIDTH = "controlWidth";
    public static final String PROPERTY_CTRL_HEIGHT = "controlHeight";
    public static final String PROPERTY_ACTION_MESSAGE = "actionMessage";
    public static final String PROPERTY_ACTION_NAME = "actionName";
    public static final String PROPERTY_ACTIVEX_PROP_PREFIX = "activeX.Property.";
    public static final String PROPERTY_ACTIVEX_EVENT_PREFIX = "activeX.Event.";
    public static final String PROPERTY_ACTIVEX_EVENTRESULT_PREFIX = "activeX.EventResult.";
	
    private String actionCommand;
    
    /**
     * Creates an ActiveXControl
     */
    public ActiveXControl() {
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

    
    /**
     * This component does not support children.
     * 
     * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
     */
    public boolean isValidChild(Component component) {
        return false;
    }

    /**
     * Returns the value of a property index set for the activex control
     * 
     * Result in the form:   Name=>Value
     * 
     * @param idx
     * @return
     */
    public String getActiveXProperty(int idx)
    {
    	return (String)get(PROPERTY_ACTIVEX_PROP_PREFIX + idx);
    }

    /**
     * Sets a param value on the activex object, example:
     * 
     * <object ...>
     *    <param name="nametest" value="valuetest"/>
     * </object>
     * 
     * Sent to the JavaScript control as Name=>Value
     *      
     * @param idx
     * @return
     */
    public void setActiveXProperty(int idx, String name, String value)
    {
    	set(PROPERTY_ACTIVEX_PROP_PREFIX + idx, name + "=>" + value);
    }
    
    /**
     * Returns the value of the internal action message
     * 
     * Examples:
     * 	Action Name					Value
     *  --------------------------------------------
     * 	activeXLoadPass				Success
     *  activeXLoadFailure			[JavaScript reason for failure]
     *  [eventName]					EventReceived
     * 
     * @return
     */
    public String getActionMessage()
    {
    	return (String)get(PROPERTY_ACTION_MESSAGE);
    }
    
    private void setActionMessage(String msg)
    {
    	set(PROPERTY_ACTION_MESSAGE, msg);
    }
    
    /**
     * Returns the value of the internal action name
     * 
     * Examples:
     * 	Action Name					Value
     *  --------------------------------------------
     * 	activeXLoadPass				Success
     *  activeXLoadFailure			[JavaScript reason for failure]
     *  [eventName]					EventReceived
     * 
     * @return
     */
    public String getActionName()
    {
    	return (String)get(PROPERTY_ACTION_NAME);
    }
    
    private void setActionName(String msg)
    {
    	set(PROPERTY_ACTION_NAME, msg);
    }
    
    /**
     * Returns the value of the event at 'idx'
     * 
     * @param idx
     * @return
     */
    public String getActiveXEvent(int idx)
    {
    	return (String)get(PROPERTY_ACTIVEX_EVENT_PREFIX + idx);
    }

    /**
     * Sets a param value on the activex object, example:
     * 
     * <object ...>
     * </object>
     * <script for="CTRLID" event="EVENTNAMEHERE()"></script>
     *      
     * @param idx
     * @return
     */
    public void setActiveXEvent(int idx, String name)
    {
    	set(PROPERTY_ACTIVEX_EVENT_PREFIX + idx, name);
    }
    
    /**
     * Returns the number of arguments returned by an event
     * 
     * Get the values of arguments from getActiveXEventResult(name, idx)
     * 
     * @param name
     * @return
     */
    public String getActiveXEventResultCount(String name)
    {
    	return (String)get(PROPERTY_ACTIVEX_EVENTRESULT_PREFIX + name);
    }
    
    /**
     * Returns the value of an event at argument 'idx'
     * 
     * Get the count of arguments from getActiveXEventResultCount(name)
     * 
     * @param name
     * @param idx
     * @return
     */
    public String getActiveXEventResult(String name, int idx)
    {
    	return (String)get(PROPERTY_ACTIVEX_EVENTRESULT_PREFIX + name + "." + idx);
    }
    
    /**
     * The name of the control to check in the follow JavaScript command:
     * 
     * try { new ActiveXObject('VALUEHERE'); } catch () {}
     * 
     * @return
     */
    public String getActiveXControlId()
    {
    	return (String) get(PROPERTY_ACTIVEX_CTRL_ID);
    }
    
    /**
     * Sets the name of the control to check in the following JavaScript command:
     * 
     * try { new ActiveXObject('VALUEHERE'); } catch () {}
     * 
     * @param ctrlId
     */
    public void setActiveXControlId(String ctrlId)
    {
    	set(PROPERTY_ACTIVEX_CTRL_ID, ctrlId);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object classid="VALUEHERE" ...></object>
     * 
     * @return
     */
    public String getObjectClassId()
    {
    	return (String) get(PROPERTY_OBJECT_CLASS_ID);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object classid="VALUEHERE" ...></object>
     * 
     * @param objectClassId
     */
    public void setObjectClassId(String objectClassId)
    {
    	set(PROPERTY_OBJECT_CLASS_ID, objectClassId);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object codeBase="VALUEHERE" ...></object>
     * 
     * @return
     */
    public String getCodeBase()
    {
    	return (String) get(PROPERTY_CODEBASE_ID);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object codeBase="VALUEHERE" ...></object>
     * 
     * @param codeBase
     */
    public void setCodeBase(String codeBase)
    {
    	set(PROPERTY_CODEBASE_ID, codeBase);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object WIDTH="VALUEHERE" ...></object>
     * 
     * @return
     */
    public Integer getControlWidth()
    {
    	Integer value = (Integer) get(PROPERTY_CTRL_WIDTH);
        return value == null ? 640 : value.intValue();
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object WIDTH="VALUEHERE" ...></object>
     * 
     * @param width
     */
    public void setControlWidth(Integer width)
    {
    	set(PROPERTY_CTRL_WIDTH, width);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object HEIGHT="VALUEHERE" ...></object>
     * 
     * @return
     */
    public Integer getControlHeight()
    {
    	Integer value = (Integer) get(PROPERTY_CTRL_HEIGHT);
        return value == null ? 480 : value.intValue();
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <object HEIGHT="VALUEHERE" ...></object>
     * 
     * @param width
     */
    public void setControlHeight(Integer width)
    {
    	set(PROPERTY_CTRL_HEIGHT, width);
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
    	else if (PROPERTY_ACTION_NAME.equals(inputName))
            setActionName((String)inputValue);
    	else if (inputName.startsWith(PROPERTY_ACTIVEX_EVENTRESULT_PREFIX))
    		set(inputName, (String)inputValue);
    		
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

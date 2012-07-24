package com.untzuntz.components.app;

import java.util.EventListener;
import java.util.List;
import java.util.Vector;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class JavaAppletControl extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20110429L;
    
    public static final String ACTION_COMMAND_CHANGED_PROPERTY = "actionCommand";
    public static final String ACTION_LISTENERS_CHANGED_PROPERTY = "actionListeners";
    
    public static final String INPUT_ACTION = "action";
    public static final String ACTION_MESSAGE_CHANGED_PROPERTY = "actionMessage";
    public static final String ACTION_NAME_CHANGED_PROPERTY = "actionName";
    
    public static final String PROPERTY_NAME = "name";
    public static final String PROPERTY_CODE = "code";
    public static final String PROPERTY_ARCHIVE = "archive";
    public static final String PROPERTY_CODEBASE = "codebase";
    public static final String PROPERTY_CTRL_WIDTH = "controlWidth";
    public static final String PROPERTY_CTRL_HEIGHT = "controlHeight";
    public static final String PROPERTY_ACTION_MESSAGE = "actionMessage";
    public static final String PROPERTY_ACTION_NAME = "actionName";
    public static final String PROPERTY_CTRL_PROP_PREFIX = "ctrl.Property.";
    public static final String PROPERTY_CTRL_EVENT_PREFIX = "ctrl.Event.";
    public static final String PROPERTY_CTRL_EVENTRESULT_PREFIX = "ctrl.EventResult.";
	
    private String actionCommand;
    
    /**
     * Creates an ActiveXControl
     */
    public JavaAppletControl() {
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
     * Returns the value of a property index set for the control control
     * 
     * Result in the form:   Name=>Value
     * 
     * @param idx
     * @return
     */
    public String getCtrlProperty(int idx)
    {
    	return (String)get(PROPERTY_CTRL_PROP_PREFIX + idx);
    }

    /**
     * Sets a param value on the control object, example:
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
    public void setCtrlProperty(int idx, String name, String value)
    {
    	set(PROPERTY_CTRL_PROP_PREFIX + idx, name + "=>" + value);
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
    public String getCtrlEvent(int idx)
    {
    	return (String)get(PROPERTY_CTRL_EVENT_PREFIX + idx);
    }

    /**
     * Sets a param value on the control object, example:
     * 
     * <object ...>
     * </object>
     * <script for="CTRLID" event="EVENTNAMEHERE()"></script>
     *      
     * @param idx
     * @return
     */
    public void setCtrlEvent(int idx, String name)
    {
    	set(PROPERTY_CTRL_EVENT_PREFIX + idx, name);
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
    	return (String)get(PROPERTY_CTRL_EVENTRESULT_PREFIX + name);
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
    	return (String)get(PROPERTY_CTRL_EVENTRESULT_PREFIX + name + "." + idx);
    }
    
    /**
     * Returns the name of the class
     * 
     * <applet code="VALUEHERE" ...></object>
     * 
     * @return
     */
    public String getCode()
    {
    	return (String) get(PROPERTY_CODE);
    }
    
    /**
     * Sets the class to load:
     * 
     * <applet code="VALUEHERE" ...></object>
     * 
     * @param code
     */
    public void setCode(String code)
    {
    	set(PROPERTY_CODE, code);
    }
    
    public String getName()
    {
    	return (String)get(PROPERTY_NAME);
    }
    
    public void setName(String name)
    {
    	set(PROPERTY_NAME, name);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <applet archive="VALUEHERE" ...></object>
     * 
     * @return
     */
    public String getArchive()
    {
    	return (String) get(PROPERTY_ARCHIVE);
    }
    
    /**
     * The value to provide in the following HTML segment:
     * 
     * <applet archive="VALUEHERE" ...></object>
     * 
     * @param objectClassId
     */
    public void setArchive(String objectClassId)
    {
    	set(PROPERTY_ARCHIVE, objectClassId);
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
    	return (String) get(PROPERTY_CODEBASE);
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
    	set(PROPERTY_CODEBASE, codeBase);
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
    	System.out.println("Java Applet - Firing Actions...hel: " + hasEventListenerList());
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
    	else if (inputName.startsWith(PROPERTY_CTRL_EVENTRESULT_PREFIX))
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

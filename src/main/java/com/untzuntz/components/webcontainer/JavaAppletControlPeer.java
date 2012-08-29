package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.JavaAppletControl;

/**
 * Synchronization peer for <code>JavaAppletControlPeer</code>s.
 */
public class JavaAppletControlPeer extends AbstractComponentSynchronizePeer implements ComponentSynchronizePeer {

    /**
     * The JS service files to load.
     */
    private static final String[] SERVICE_FILES =
            {
                    "com/untzuntz/components/resources/PluginDetect.js",
                    "com/untzuntz/components/resources/Sync.JavaAppletControl.js"
            };

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service JAVAPPLTCONTROL_SERVICE = JavaScriptService.forResources("UntzUntz.JavaAppletControl", 
    		SERVICE_FILES);

//    /** The associated client-side JavaScript module <code>Service</code>. */
//    private static final Service JAVAPPLTCONTROL_SERVICE = JavaScriptService.forResource("UntzUntz.JavaAppletControl", 
//    		"com/untzuntz/components/resources/Sync.JavaAppletControl.js");
    

    static {
    	WebContainerServlet.getServiceRegistry().add(JAVAPPLTCONTROL_SERVICE);
    }
    
    public JavaAppletControlPeer()
    {
    	super();
    	
        addOutputProperty(JavaAppletControl.ACTION_MESSAGE_CHANGED_PROPERTY);
        addOutputProperty(JavaAppletControl.ACTION_NAME_CHANGED_PROPERTY);
        
        addEvent(new EventPeer(JavaAppletControl.INPUT_ACTION, JavaAppletControl.ACTION_LISTENERS_CHANGED_PROPERTY) {
			public boolean hasListeners(Context context, Component c) {
            	System.out.println("Has Action Listeners: " + ((JavaAppletControl) c).hasActionListeners());
            	return ((JavaAppletControl) c).hasActionListeners();
            }
        });

    	System.out.println("Initialized...");
    }
    
    /**
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getOutputProperty(
     *      nextapp.echo.app.util.Context, nextapp.echo.app.Component, java.lang.String, int)
     */
    public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) {
    	
    	Object ret = super.getOutputProperty(context, component, propertyName, propertyIndex);
        System.out.println("Property Name: " + propertyName + " / IDX: " + propertyIndex + " => " + ret);
        return ret;
    }


    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return mode ? "UJAC" : "UntzUntz.JavaAppletControl";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return JavaAppletControl.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(JAVAPPLTCONTROL_SERVICE.getId());
    }
    
    public Class getInputPropertyClass(String propertyName) {
    	
    	System.out.println("Getting Prop Class: " + propertyName);
        if (JavaAppletControl.ACTION_MESSAGE_CHANGED_PROPERTY.equals(propertyName))
            return String.class;
        if (JavaAppletControl.ACTION_NAME_CHANGED_PROPERTY.equals(propertyName))
            return String.class;
        if (propertyName != null && propertyName.startsWith(JavaAppletControl.PROPERTY_CTRL_EVENTRESULT_PREFIX))
            return String.class;
        
        return null;
    }

    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue)
    {
    	System.out.println("Input Property : " + propertyName + " // IDX: " + propertyIndex + " // Val : " + newValue);
        if (propertyName.equals(JavaAppletControl.ACTION_MESSAGE_CHANGED_PROPERTY)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, JavaAppletControl.ACTION_MESSAGE_CHANGED_PROPERTY, newValue);
        }
        else if (propertyName.equals(JavaAppletControl.ACTION_NAME_CHANGED_PROPERTY)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, JavaAppletControl.ACTION_NAME_CHANGED_PROPERTY, newValue);
        }
        else if (propertyName != null && propertyName.startsWith(JavaAppletControl.PROPERTY_CTRL_EVENTRESULT_PREFIX)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, propertyName, newValue);
        }
    }    
}



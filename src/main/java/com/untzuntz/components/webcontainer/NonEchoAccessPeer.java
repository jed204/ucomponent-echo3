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

import com.untzuntz.components.app.ActiveXControl;
import com.untzuntz.components.app.NonEchoAccess;

/**
 * Synchronization peer for <code>NonEchoAccessPeer</code>s.
 */
public class NonEchoAccessPeer extends AbstractComponentSynchronizePeer implements ComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service NonEchoAccess_SERVICE = JavaScriptService.forResource("UntzUntz.NonEchoAccess", 
            "com/untzuntz/components/resources/Sync.NonEchoAccess.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(NonEchoAccess_SERVICE);
    }
    
    public NonEchoAccessPeer()
    {
    	super();
    	
        addEvent(new EventPeer(NonEchoAccess.INPUT_ACTION, NonEchoAccess.ACTION_LISTENERS_CHANGED_PROPERTY) {
			public boolean hasListeners(Context context, Component c) {
            	System.out.println("Has Action Listeners: " + ((NonEchoAccess) c).hasActionListeners());
            	return ((NonEchoAccess) c).hasActionListeners();
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
        return mode ? "UNE" : "UntzUntz.NonEchoAccess";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return NonEchoAccess.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(NonEchoAccess_SERVICE.getId());
    }
    
    public Class getInputPropertyClass(String propertyName) {
    	
    	System.out.println("Getting Prop Class: " + propertyName);
        if (ActiveXControl.ACTION_MESSAGE_CHANGED_PROPERTY.equals(propertyName))
            return String.class;

        return null;
    }

    
    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue)
    {
    	System.out.println("Input Property : " + propertyName + " // IDX: " + propertyIndex + " // Val : " + newValue);
        if (propertyName.equals(NonEchoAccess.ACTION_MESSAGE_CHANGED_PROPERTY)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, NonEchoAccess.ACTION_MESSAGE_CHANGED_PROPERTY, newValue);
        }
    }    
}



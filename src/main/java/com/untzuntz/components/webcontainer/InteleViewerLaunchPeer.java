package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.InteleViewerLaunch;

public class InteleViewerLaunchPeer extends AbstractComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service SERVICE = JavaScriptService.forResource("UntzUntz.InteleViewerLaunch", 
            "com/untzuntz/components/resources/Sync.InteleViewerLaunch.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(SERVICE);
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return "UntzUntz.InteleViewerLaunch";
    }
    
    public InteleViewerLaunchPeer()
    {
    	super();
   
        addOutputProperty(InteleViewerLaunch.LAUNCH_RESULT_CHANGED_PROPERTY);

    	addEvent(new EventPeer(InteleViewerLaunch.INPUT_ACTION, InteleViewerLaunch.ACTION_LISTENERS_CHANGED_PROPERTY) {
            public boolean hasListeners(Context context, Component c) {
                return ((InteleViewerLaunch) c).hasActionListeners();
            }
        });    	
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return InteleViewerLaunch.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(SERVICE.getId());
    }

    /**
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getOutputProperty(
     *      nextapp.echo.app.util.Context, nextapp.echo.app.Component, java.lang.String, int)
     */
    public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) {
    	
    	Object ret = super.getOutputProperty(context, component, propertyName, propertyIndex);
        System.out.println("IV Property Name: " + propertyName + " / IDX: " + propertyIndex + " => " + ret);
        return ret;
    }

    public Class getInputPropertyClass(String propertyName) {
    	
        if (InteleViewerLaunch.LAUNCH_RESULT_CHANGED_PROPERTY.equals(propertyName))
            return String.class;
        
        return null;
    }

    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue)
    {
    	System.out.println("IV Input Property : " + propertyName + " // IDX: " + propertyIndex + " // Val : " + newValue);
        if (propertyName.equals(InteleViewerLaunch.LAUNCH_RESULT_CHANGED_PROPERTY)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, InteleViewerLaunch.LAUNCH_RESULT_CHANGED_PROPERTY, newValue);
        }
    }    

}

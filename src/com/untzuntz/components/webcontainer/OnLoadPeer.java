package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.OnLoad;

/**
 * Synchronization peer for <code>OnLoadPeer</code>s.
 */
public class OnLoadPeer extends AbstractComponentSynchronizePeer implements ComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service ONLOAD_SERVICE = JavaScriptService.forResource("UntzUntz.OnLoad", 
            "com/untzuntz/components/resources/Sync.OnLoad.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(ONLOAD_SERVICE);
    }
    
    public OnLoadPeer()
    {
    	super();
        
        addEvent(new EventPeer(OnLoad.INPUT_ACTION, OnLoad.ACTION_LISTENERS_CHANGED_PROPERTY) {
			public boolean hasListeners(Context context, Component c) {
            	System.out.println("Has Action Listeners: " + ((OnLoad) c).hasActionListeners());
            	return ((OnLoad) c).hasActionListeners();
            }
        });

    	System.out.println("Initialized...");
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return mode ? "UOL" : "UntzUntz.OnLoad";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    @SuppressWarnings("rawtypes")
	public Class getComponentClass() {
        return OnLoad.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(ONLOAD_SERVICE.getId());
    }
}



package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer.EventPeer;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.ActiveXControl;
import com.untzuntz.components.app.JavaScriptLoader;

/**
 * Synchronization peer for <code>AlertLabel</code>s.
 */
public class JavaScriptLoaderPeer extends AbstractComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service JAVASCRIPTLOADER_SERVICE = JavaScriptService.forResource("UntzUntz.JavaScriptLoader", 
            "com/untzuntz/components/resources/Sync.JavaScriptLoader.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(JAVASCRIPTLOADER_SERVICE);
    }
    
    public JavaScriptLoaderPeer()
    {
    	super();
    	
        addEvent(new EventPeer(JavaScriptLoader.INPUT_ACTION, JavaScriptLoader.ACTION_LISTENERS_CHANGED_PROPERTY) {
			public boolean hasListeners(Context context, Component c) {
            	System.out.println("Has Action Listeners: " + ((JavaScriptLoader) c).hasActionListeners());
            	return ((JavaScriptLoader) c).hasActionListeners();
            }
        });

    	System.out.println("JSL Initialized...");
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return "UntzUntz.JavaScriptLoader";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return JavaScriptLoader.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(JAVASCRIPTLOADER_SERVICE.getId());
    }
}


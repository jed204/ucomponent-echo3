package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.PageMask;

/**
 * Synchronization peer for <code>AlertLabel</code>s.
 */
public class PageMaskPeer extends AbstractComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service PAGEMASK_SERVICE = JavaScriptService.forResource("UntzUntz.PageMask", 
            "com/untzuntz/components/resources/Sync.PageMask.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(PAGEMASK_SERVICE);
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return "UntzUntz.PageMask";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return PageMask.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(PAGEMASK_SERVICE.getId());
    }
}


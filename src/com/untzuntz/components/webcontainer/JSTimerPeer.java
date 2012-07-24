package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.JSTimer;

public class JSTimerPeer extends AbstractComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service SERVICE = JavaScriptService.forResource("UntzUntz.JSTimer", 
            "com/untzuntz/components/resources/Sync.JSTimer.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(SERVICE);
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return "UntzUntz.JSTimer";
    }
    
    public JSTimerPeer()
    {
    	super();
    	addEvent(new EventPeer(JSTimer.INPUT_ACTION, JSTimer.ACTION_LISTENERS_CHANGED_PROPERTY) {
            public boolean hasListeners(Context context, Component c) {
                return ((JSTimer) c).hasActionListeners();
            }
        });    	
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return JSTimer.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(SERVICE.getId());
    }

}

package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.webcontainer.sync.component.ColumnPeer;

import com.untzuntz.components.app.FancyColumn;

public class FancyColumnPeer extends ColumnPeer {

    private static final Service ONLOAD_SERVICE = JavaScriptService.forResource("UntzUntz.FancyColumn", 
            "com/untzuntz/components/resources/Sync.FancyColumn.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(ONLOAD_SERVICE);
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return mode ? "FC" : "FancyColumn";
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return FancyColumn.class;
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(ONLOAD_SERVICE.getId());
    }


}

package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.webcontainer.sync.component.TextComponentPeer;

import com.untzuntz.components.app.CodeTextField;

public class CodeTextFieldPeer extends TextComponentPeer {

    private static final String REGISTRY_KEY = "UntzUntz.CodeTextField";
    private static final String JAVASCRIPT_PATH = "com/untzuntz/components/resources/Sync.CodeTextField.js";

    static {
        Service service = JavaScriptService.forResource(REGISTRY_KEY, JAVASCRIPT_PATH);
        WebContainerServlet.getServiceRegistry().add(service);
    }

    public CodeTextFieldPeer() {
        super();
    }

    // Intialize and invoke superclass initialization -------------------------------------

    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(REGISTRY_KEY);
    }

     // Abstract methods from 'ComponentSynchronizePeer' -----------------------------------
    //  Return application class and registry unique name
    
   public Class getComponentClass() {
        return CodeTextField.class;
    }

    public String getClientComponentType(boolean shortType) {
        return REGISTRY_KEY;
    }

    /**
     *  The WebContainer will invoke this peer method in order to respond to 'PropertyChange'
     *      events in the Java which need to be passed to the JavaScript client
     */
 
    public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) {
        return super.getOutputProperty(context, component, propertyName, propertyIndex);
    }

}

package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.webcontainer.sync.component.TextComponentPeer;

import com.untzuntz.components.app.ClientTextField;

public class ClientTextFieldPeer extends TextComponentPeer {

    private static final String REGISTRY_KEY = "UntzUntz.ClientTextField";
    private static final String JAVASCRIPT_PATH = "com/untzuntz/components/resources/Sync.ClientTextField.js";

    static {
        Service service = JavaScriptService.forResource(REGISTRY_KEY, JAVASCRIPT_PATH);
        WebContainerServlet.getServiceRegistry().add(service);
    }

    public ClientTextFieldPeer() {
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
        return ClientTextField.class;
    }

    public String getClientComponentType(boolean shortType) {
        return REGISTRY_KEY;
    }

    public Class getInputPropertyClass(String propertyName) {
    	
    	System.out.println("Type: " + propertyName);
        if (ClientTextField.PROPERTY_TEXT_LENGTH.equals(propertyName))
            return Integer.class;
        
        return super.getInputPropertyClass(propertyName);
    }

    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue)
    {
    	System.out.println("propertyName => " + propertyName + " | Value: " + newValue);
        if (propertyName.equals(ClientTextField.PROPERTY_TEXT_LENGTH)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, ClientTextField.PROPERTY_TEXT_LENGTH, newValue);
        }
        else
        	super.storeInputProperty(context, component, propertyName, propertyIndex, newValue);
    }    


}

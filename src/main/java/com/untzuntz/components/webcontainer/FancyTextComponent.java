package com.untzuntz.components.webcontainer;

import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

public class FancyTextComponent {

    private static final Service ONLOAD_SERVICE = JavaScriptService.forResource("UntzUntz.FancyTextField", 
            "com/untzuntz/components/resources/Sync.FancyTextField.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(ONLOAD_SERVICE);
    }

    public static void load() {
    	
    }
    
    public static void init(ServerMessage serverMessage) {
		serverMessage.addLibrary(ONLOAD_SERVICE.getId());
    }
}

package com.untzuntz.components.webcontainer;

import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import com.untzuntz.components.app.Stripe;

public class StripePeer extends AbstractComponentSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service SERVICE = JavaScriptService.forResource("UntzUntz.Stripe", 
            "com/untzuntz/components/resources/Sync.Stripe.js");
    
    static {
    	WebContainerServlet.getServiceRegistry().add(SERVICE);
    }
    
    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean mode) {
        return "UntzUntz.Stripe";
    }
    
    public StripePeer()
    {
    	super();
    	
        addOutputProperty(Stripe.PROPERTY_STRIPE_PUBLIC_KEY);
        addOutputProperty(Stripe.PROPERTY_SUBMIT_BUTTON_TEXT);
        addOutputProperty(Stripe.PROPERTY_NAME_ON_CARD);
        addOutputProperty(Stripe.PROPERTY_ADDR_LINE1);
        addOutputProperty(Stripe.PROPERTY_ADDR_LINE2);
        addOutputProperty(Stripe.PROPERTY_ADDR_CITY);
        addOutputProperty(Stripe.PROPERTY_ADDR_STATE);
        addOutputProperty(Stripe.PROPERTY_ADDR_ZIP);
        addOutputProperty(Stripe.PROPERTY_ADDR_COUNTRY);

    	addEvent(new EventPeer(Stripe.INPUT_ACTION, Stripe.ACTION_LISTENERS_CHANGED_PROPERTY) {
            public boolean hasListeners(Context context, Component c) {
                return ((Stripe) c).hasActionListeners();
            }
        });    	
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
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return Stripe.class;
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(Context context, Component component) {
        super.init(context, component);
        ServerMessage serverMessage = (ServerMessage)context.get(ServerMessage.class);
        serverMessage.addLibrary(SERVICE.getId());
    }

    public Class getInputPropertyClass(String propertyName) {
    	
    	System.out.println("Getting Prop Class: " + propertyName);
        if (Stripe.PROPERTY_TRANSACTION_TOKEN.equals(propertyName))
            return String.class;
        
        return null;
    }

    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue)
    {
    	System.out.println("Input Property : " + propertyName + " // IDX: " + propertyIndex + " // Val : " + newValue);
        if (propertyName.equals(Stripe.PROPERTY_TRANSACTION_TOKEN)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, Stripe.PROPERTY_TRANSACTION_TOKEN, newValue);
        }
    }    

}

package com.untzuntz.components.app;

import java.util.EventListener;

import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

public class Stripe extends Component {

    /** Serial Version UID. */
    private static final long serialVersionUID = 20121402L;

    public static final String ACTION_LISTENERS_CHANGED_PROPERTY = "actionListeners";
    public static final String ACTION_COMMAND_CHANGED_PROPERTY = "actionCommand";
    public static final String INPUT_ACTION = "action";
    public static final String PROPERTY_SUBMIT_BUTTON_TEXT = "submitButtonText";
    public static final String PROPERTY_STRIPE_PUBLIC_KEY = "stripePublicKey";
    public static final String PROPERTY_TRANSACTION_TOKEN = "transactionToken";
    public static final String PROPERTY_NAME_ON_CARD = "name_on_card";
    public static final String PROPERTY_ADDR_LINE1 = "address_line1";
    public static final String PROPERTY_ADDR_LINE2 = "address_line2";
    public static final String PROPERTY_ADDR_CITY = "address_city";
    public static final String PROPERTY_ADDR_STATE = "address_state";
    public static final String PROPERTY_ADDR_ZIP = "address_zip";
    public static final String PROPERTY_ADDR_COUNTRY = "address_country";

    private String privateApiKey;
    private String actionCommand;
    
    public String getActionCommand() {
        return actionCommand;
    }

    public void setActionCommand(String newValue) {
        String oldValue = actionCommand;
        actionCommand = newValue;
        firePropertyChange(ACTION_COMMAND_CHANGED_PROPERTY, oldValue, newValue);
    }

   /**
     * 
     */
    public Stripe(String publicKey, String apiKey) {
    	setStripePublicKey(publicKey);
    	this.privateApiKey = apiKey;
    }
    
    @SuppressWarnings("unused")
	private Stripe() {}
    
    public void addActionListener(ActionListener l) {
        getEventListenerList().addListener(ActionListener.class, l);
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, null, l);
    }

    public void removeActionListener(ActionListener l) {
        getEventListenerList().removeListener(ActionListener.class, l);
        firePropertyChange(ACTION_LISTENERS_CHANGED_PROPERTY, l, null);
    }

    public boolean hasActionListeners() {
        return hasEventListenerList() 
                && getEventListenerList().getListenerCount(ActionListener.class) > 0;
    }

    private void fireAction() {
        EventListener[] actionListeners = getEventListenerList().getListeners(ActionListener.class);
        ActionEvent e = new ActionEvent(this, getActionCommand());
        for (int i = 0; i < actionListeners.length; ++i) {
            ((ActionListener) actionListeners[i]).actionPerformed(e);
        }
    }
    
    /**
     * This component does not support children.
     * 
     * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
     */
    public boolean isValidChild(Component component) {
        return false;
    }
    
    public void setStripePublicKey(String t) {
    	set(PROPERTY_STRIPE_PUBLIC_KEY, t);
    }
    
    public String getStripePrivateAPIKey() {
    	return privateApiKey;
    }

    public void setTransactionToken(String t) {
    	set(PROPERTY_TRANSACTION_TOKEN, t);
    }
    
    public String getTransactionToken() {
    	return (String)get(PROPERTY_TRANSACTION_TOKEN);
    }
    
    public void processInput(String inputName, Object inputValue) {

        System.out.println("processInput: " + inputName + " / " + inputValue);
        
        super.processInput(inputName, inputValue);
        if (INPUT_ACTION.equals(inputName))
            fireAction();
        else if (PROPERTY_NAME_ON_CARD.equals(inputName))
        	setNameOnCard( (String)inputValue );
        else if (PROPERTY_ADDR_LINE1.equals(inputName))
        	setAddress1( (String)inputValue );
        else if (PROPERTY_ADDR_LINE2.equals(inputName))
        	setAddress2( (String)inputValue );
        else if (PROPERTY_ADDR_CITY.equals(inputName))
        	setCity( (String)inputValue );
        else if (PROPERTY_ADDR_STATE.equals(inputName))
        	setState( (String)inputValue );
        else if (PROPERTY_ADDR_ZIP.equals(inputName))
        	setPostalCode( (String)inputValue );
        else if (PROPERTY_ADDR_COUNTRY.equals(inputName))
        	setCountry( (String)inputValue );
        else if (PROPERTY_TRANSACTION_TOKEN.equals(inputName))
        	setTransactionToken( (String)inputValue );
      
    }

    public void setSubmitButtonText(String t) { set(PROPERTY_SUBMIT_BUTTON_TEXT, t); }
    public String getSubmitButtonText() { return (String)get(PROPERTY_SUBMIT_BUTTON_TEXT); }

    public void setNameOnCard(String t) { set(PROPERTY_NAME_ON_CARD, t); }
    public String getNameOnCard() { return (String)get(PROPERTY_NAME_ON_CARD); }

    public void setAddress1(String t) { set(PROPERTY_ADDR_LINE1, t); }
    public String getAddress1() { return (String)get(PROPERTY_ADDR_LINE1); }

    public void setAddress2(String t) { set(PROPERTY_ADDR_LINE2, t); }
    public String getAddress2() { return (String)get(PROPERTY_ADDR_LINE2); }

    public void setCity(String t) { set(PROPERTY_ADDR_CITY, t); }
    public String getCity() { return (String)get(PROPERTY_ADDR_CITY); }

    public void setState(String t) { set(PROPERTY_ADDR_STATE, t); }
    public String getState() { return (String)get(PROPERTY_ADDR_STATE); }

    public void setPostalCode(String t) { set(PROPERTY_ADDR_ZIP, t); }
    public String getPostalCode() { return (String)get(PROPERTY_ADDR_ZIP); }

    public void setCountry(String t) { set(PROPERTY_ADDR_COUNTRY, t); }
    public String getCountry() { return (String)get(PROPERTY_ADDR_COUNTRY); }

    

}

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
    public static final String PROPERTY_STRIPE_PUBLIC_KEY = "stripePublicKey";
    public static final String PROPERTY_TRANSACTION_TOKEN = "transactionToken";
    public static final String PROPERTY_ERROR_MESSAGE = "errorMessage";
    public static final String PROPERTY_PROCESS_FLAG = "processingFlag";

    public static final String PROPERTY_NAME_FIELD_ID = "nameFieldId";
    public static final String PROPERTY_CARD_FIELD_ID = "cardNumberFieldId";
    public static final String PROPERTY_CVC_FIELD_ID = "cvcFieldId";
    public static final String PROPERTY_EXP_MONTH_FIELD_ID = "expMonthFieldId";
    public static final String PROPERTY_EXP_YEAR_FIELD_ID = "expYearFieldId";
    public static final String PROPERTY_ADDR_ZIP = "addressZipFieldId";
    public static final String PROPERTY_ADDR_LINE1 = "addressLine1FieldId";
    public static final String PROPERTY_ADDR_LINE2 = "addressLine2FieldId";
    public static final String PROPERTY_ADDR_CITY = "addressCityFieldId";
    public static final String PROPERTY_ADDR_STATE = "addressStateFieldId";
    public static final String PROPERTY_ADDR_COUNTRY = "addressCountryFieldId";
    
    public void setNameFieldId(String t) { set(PROPERTY_NAME_FIELD_ID, t); }
    public String getName() { return (String)get(PROPERTY_NAME_FIELD_ID); }
    
    public void setCardFieldId(String t) { set(PROPERTY_CARD_FIELD_ID, t); }
    public String getCardFieldId() { return (String)get(PROPERTY_CARD_FIELD_ID); }
    
    public void setCVCFieldId(String t) { set(PROPERTY_CVC_FIELD_ID, t); }
    public String getCVCFieldId() { return (String)get(PROPERTY_CVC_FIELD_ID); }
    
    public void setExpMonthFieldId(String t) { set(PROPERTY_EXP_MONTH_FIELD_ID, t); }
    public String getExpMonthFieldId() { return (String)get(PROPERTY_EXP_MONTH_FIELD_ID); }
    
    public void setExpYearFieldId(String t) { set(PROPERTY_EXP_YEAR_FIELD_ID, t); }
    public String getExpYearFieldId() { return (String)get(PROPERTY_EXP_YEAR_FIELD_ID); }
    
    public void setZipFieldId(String t) { set(PROPERTY_ADDR_ZIP, t); }
    public String getZipFieldId() { return (String)get(PROPERTY_ADDR_ZIP); }
    
    public void setAddr1FieldId(String t) { set(PROPERTY_ADDR_LINE1, t); }
    public String getAddr1FieldId() { return (String)get(PROPERTY_ADDR_LINE1); }
    
    public void setAddr2FieldId(String t) { set(PROPERTY_ADDR_LINE2, t); }
    public String getAddr2FieldId() { return (String)get(PROPERTY_ADDR_LINE2); }
    
    public void setCityFieldId(String t) { set(PROPERTY_ADDR_CITY, t); }
    public String getCityFieldId() { return (String)get(PROPERTY_ADDR_CITY); }
    
    public void setStateFieldId(String t) { set(PROPERTY_ADDR_STATE, t); }
    public String getStateFieldId() { return (String)get(PROPERTY_ADDR_STATE); }
    
    public void setCountryFieldId(String t) { set(PROPERTY_ADDR_COUNTRY, t); }
    public String getCountryFieldId() { return (String)get(PROPERTY_ADDR_COUNTRY); }
    
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
    
    public void setErrorMessage(String t) {
    	set(PROPERTY_ERROR_MESSAGE, t);
    }
    
    public String getErrorMessage() {
    	return (String)get(PROPERTY_ERROR_MESSAGE);
    }
    
    public void processToken()
    {
    	setErrorMessage(null);
    	set(PROPERTY_PROCESS_FLAG, "true-" + System.currentTimeMillis());
    }
    
    public void processInput(String inputName, Object inputValue) {

        super.processInput(inputName, inputValue);
        if (INPUT_ACTION.equals(inputName))
            fireAction();
        else if (PROPERTY_ERROR_MESSAGE.equals(inputName))
        	setErrorMessage( (String)inputValue );
        else if (PROPERTY_TRANSACTION_TOKEN.equals(inputName))
        	setTransactionToken( (String)inputValue );
      
    }

}

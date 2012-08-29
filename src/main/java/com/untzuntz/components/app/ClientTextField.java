package com.untzuntz.components.app;

import nextapp.echo.app.TextField;

public class ClientTextField extends TextField {

	private static final long serialVersionUID = -22528336582916088L;

    public static final String PROPERTY_TEXT_LENGTH = "textLength";
    
    public ClientTextField(String s) {
    	setRenderId(s);
    }
    
    public void setText(String text) {
    	super.setText(text);
    	if (text != null)
    		setTextLength(text.length());
    }

    public void setTextLength(Integer t) {
    	set(PROPERTY_TEXT_LENGTH, t);
    }
    
    public Integer getTextLength() {
    	return get(PROPERTY_TEXT_LENGTH) == null ? 0 : (Integer)get(PROPERTY_TEXT_LENGTH);
    }

    public void processInput(String inputName, Object inputValue) {

        System.out.println("processInput: " + inputName + " / " + inputValue);
        
        super.processInput(inputName, inputValue);
        if (PROPERTY_TEXT_LENGTH.equals(inputName))
            setTextLength((Integer)inputValue);
    }

}

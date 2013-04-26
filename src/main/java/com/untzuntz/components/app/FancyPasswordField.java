package com.untzuntz.components.app;

import nextapp.echo.app.Extent;


public class FancyPasswordField extends FancyTextField {

	private static final long serialVersionUID = 2299732338016410254L;

	public FancyPasswordField() {
		super();
		setHintText("Password");
	}
	
	public FancyPasswordField(String hintText) {
		super(hintText);
	}
	
	public FancyPasswordField(Extent width) {
		this();
    	setWidth(width);
	}

}

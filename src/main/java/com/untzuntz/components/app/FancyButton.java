package com.untzuntz.components.app;

import nextapp.echo.app.Button;
import nextapp.echo.app.Color;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Insets;
import nextapp.echo.app.event.ActionListener;


public class FancyButton extends Button {

	private static final long serialVersionUID = 2222732338016410254L;
    public static final String PROPERTY_BORDER_RADIUS = "borderRadius";
    public static final String PROPERTY_BACKGROUND_BOTTOM = "backgroundBottom";
    public static final String PROPERTY_FONT_SIZE = "fontSize";
    public static final String PROPERTY_FONT_WEIGHT = "fontWeight";
    public static final String PROPERTY_LINK_FLAG = "linkFlag";
    public static final String PROPERTY_SHADOW_COLOR = "textShadowColor";
    public static final String PROPERTY_SHADOW_HPOS = "textShadowHPos";
    public static final String PROPERTY_SHADOW_VPOS = "textShadowVPos";
    public static final String PROPERTY_SHADOW_BLUR = "textShadowBlur";
    private static final Extent EX_0 = new Extent(0, Extent.PX);
    private static final Extent EX_N1 = new Extent(-1, Extent.PX);
    
    public static enum FontWeight {
    	
    	normal,
    	bold;
    	
    }
    
    public static enum ButtonColor {
    	
    	Default(new Color(0x333333), new Color(0xffffff), new Color(0xe6e6e6), false, false, FontWeight.normal),
    	Primary(Color.WHITE, new Color(0x0088cc), new Color(0x0044cc), false, true, FontWeight.bold),
    	Info(Color.WHITE, new Color(0x5bc0de), new Color(0x2f96b4), false, true, FontWeight.bold),
    	Success(Color.WHITE, new Color(0x62c462), new Color(0x51a351), false, true, FontWeight.bold),
    	Warning(Color.WHITE, new Color(0xfbb450), new Color(0xf89406), false, true, FontWeight.bold),
    	Danger(Color.WHITE, new Color(0xee5f5b), new Color(0xbd362f), false, true, FontWeight.bold),
    	Inverse(Color.WHITE, new Color(0x444444), new Color(0x222222), false, true, FontWeight.bold),
    	Link(new Color(0x0088cc), null, null, true, false, FontWeight.bold);
    	
    	private Color foreground;
    	private Color backgroundTop;
    	private Color backgroundBottom;
    	private Boolean linkFlag;
    	private Boolean textShadowFlag;
    	private FontWeight weight;
    	private ButtonColor(Color foreground, Color backgroundTop, Color backgroundBottom, Boolean linkFlag, Boolean textShadowFlag, FontWeight weight) {
    		this.foreground = foreground;
    		this.backgroundTop = backgroundTop;
    		this.backgroundBottom = backgroundBottom;
    		this.linkFlag = linkFlag;
    		this.textShadowFlag = textShadowFlag;
    		this.weight = weight;
    	}
		public Color getForeground() {
			return foreground;
		}
		public Color getBackgroundTop() {
			return backgroundTop;
		}
		public Color getBackgroundBottom() {
			return backgroundBottom;
		}
		public Boolean getLinkFlag() {
			return linkFlag;
		}
		public Boolean getTextShadowFlag() {
			return textShadowFlag;
		}
		public FontWeight getFontWeight() {
			return weight;
		}
    	
    }
	
	public static enum Size {
		
		Large(new Insets(16, 9, 16, 9), new Extent(6, Extent.PX), new Extent(17, Extent.PX)),
		Default(new Insets(12, 6, 12, 6), new Extent(4, Extent.PX), new Extent(14, Extent.PX)),
		Small(new Insets(10, 4, 10, 4), new Extent(3, Extent.PX), new Extent(12, Extent.PX)),
		Mini(new Insets(6, 2, 6, 2), new Extent(3, Extent.PX), new Extent(10, Extent.PX));
		
		private Insets inset;
		private Extent borderRadius;
		private Extent fontSize;
		private Size(Insets in, Extent br, Extent fontSize) {
			inset = in;
			borderRadius = br;
			this.fontSize = fontSize;
		}
		
		public Insets getInset() {
			return inset;
		}
		
		public Extent getBorderRadius() {
			return borderRadius;
		}
		
		public Extent getFontSize() {
			return fontSize;
		}
	}

	public FancyButton(String text, ButtonColor bc, Size size, ActionListener al, String ac) {
		this(bc, size);
		addActionListener(al);
		setActionCommand(ac);
		setText(text);
	}

	public FancyButton(String text, ButtonColor bc, Size size) {
		this(bc, size);
		setText(text);
	}

	public FancyButton(ButtonColor bc, Size size) {
		this();
		setButtonColor(bc);
		setSize(size);
	}

	public FancyButton(String text) {
		this();
		setText(text);
	}
	
	public FancyButton()
	{
		setButtonColor(ButtonColor.Default);
		setSize(Size.Default);
		setRolloverEnabled(true);
	}
	
	public void setButtonColor(ButtonColor color) {
		setForeground(color.getForeground());
		setBackground(color.getBackgroundTop());
		setBackgroundBottom(color.getBackgroundBottom());
		setLinkFlag(color.getLinkFlag());
		setFontWeight(color.getFontWeight());
		
		if (color.getTextShadowFlag())
		{
			setTextShadowColor("rgba(0, 0, 0, 0.25)");
			setTextShadowBlur(EX_0);
			setTextShadowHorizontalPosition(EX_0);
			setTextShadowVerticalPosition(EX_N1);
		}
	}
	
	public void setSize(Size size) {
		
		setBorderRadius(size.getBorderRadius());
		setInsets(size.getInset());
		setFontSize(size.getFontSize());
	}

    public Extent getBorderRadius() {
    	return (Extent)get(PROPERTY_BORDER_RADIUS);
    }
    
    public void setBorderRadius(Extent ex) {
    	set(PROPERTY_BORDER_RADIUS, ex);
    }
    
    public Extent getFontSize() {
    	return (Extent)get(PROPERTY_FONT_SIZE);
    }
    
    public void setFontSize(Extent ex) {
    	set(PROPERTY_FONT_SIZE, ex);
    }
    
    public Color getBackgroundBottom() {
    	return (Color)get(PROPERTY_BACKGROUND_BOTTOM);
    }
    
    public void setBackgroundBottom(Color c) {
    	set(PROPERTY_BACKGROUND_BOTTOM, c);
    }

    public Boolean getLinkFlag() {
    	return (Boolean)get(PROPERTY_LINK_FLAG);
    }
    
    public void setLinkFlag(Boolean lf) {
    	set(PROPERTY_LINK_FLAG, lf);
    }
    
    public String getTextShadowColor() {
    	return (String)get(PROPERTY_SHADOW_COLOR);
    }

    public void setTextShadowColor(String color) {
    	set(PROPERTY_SHADOW_COLOR, color);
    }
    
    public String getFontWeight() {
    	return (String)get(PROPERTY_FONT_WEIGHT);
    }

    public void setFontWeight(FontWeight w) {
    	set(PROPERTY_FONT_WEIGHT, w.name());
    }
    
    public Extent getTextShadowHorizontalPosition() {
    	return (Extent)get(PROPERTY_SHADOW_HPOS);
    }
    
    public void setTextShadowHorizontalPosition(Extent ex) {
    	set(PROPERTY_SHADOW_HPOS, ex);
    }
	
    public Extent getTextShadowVerticalPosition() {
    	return (Extent)get(PROPERTY_SHADOW_VPOS);
    }
    
    public void setTextShadowVerticalPosition(Extent ex) {
    	set(PROPERTY_SHADOW_VPOS, ex);
    }
	
    public Extent getTextShadowBlur() {
    	return (Extent)get(PROPERTY_SHADOW_BLUR);
    }
    
    public void setTextShadowBlur(Extent ex) {
    	set(PROPERTY_SHADOW_BLUR, ex);
    }

}

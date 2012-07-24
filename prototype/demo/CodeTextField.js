
window.onload = function() {

Core.Web.init();

// Default Integer Textfield
new ActiveTextFieldDemo("demo1", new UntzUntz.CodeTextField());

};

new ActiveTextFieldDemo("demo2", new Informagen.IntegerTextField({
           emptyIcon: "leftArrow",
           validIcon: "good",
         invalidIcon: "warning",
     messagePosition: "top",
        iconPosition: "default",
             message: "Enter your Age:",
        minimumValue: 21,
        maximumValue: 99
}));


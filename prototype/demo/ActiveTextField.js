
/**
 *            div - The 'id' of the target 'div' in which display the component
 *      textField - A newly instance subclass of ActiveTextField
 */

ActiveTextFieldDemo = Core.extend(Echo.Application, {
                
    $construct : function(div, textField) {
    
        Echo.Application.call(this);

        var client = new Echo.FreeClient(this, document.getElementById(div));
        
        client.init();
        this.rootComponent.add(textField);
    }
});


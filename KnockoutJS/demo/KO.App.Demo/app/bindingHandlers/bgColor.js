ko.bindingHandlers.bgColor = {
    init:function(element,valueAccessor,allBindings, viewModel, bindingContext){
        element.style.backgroundColor = '#ffffff'
    },
    update:function(element,valueAccessor,allBindings, viewModel, bindingContext){
        var color = ko.utils.unwrapObservable(valueAccessor());
        if(/#([0-f]{3}$)|([0-f]{6}$)/.test(color)){
            element.style.backgroundColor = color;
        }
    }
};

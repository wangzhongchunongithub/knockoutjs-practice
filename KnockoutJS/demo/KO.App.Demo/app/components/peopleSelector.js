function createViewModel(){
    var viewModel = function(params){
        var self = this;
        self.people = ko.observableArray();
        var branch = ko.toJS(params.branch);
        if(params.branch !== undefined){
            branch.employees.map(function(item){
                if(item.email !== branch.manager.email){
                    self.people.push(item.email)
                }
            });
        }
        if(params.val !== undefined){
            self.selectedPerson = params.val;
        }

        self.test = function(param){
            console.log('people selector...');
            console.log(param);
        };
    };
    return viewModel;
}
function createTemplate(){
    var template = '<select class="form-control input-sm" data-bind="options:people,optionsText:function(item){ return item},value:selectedPerson"></select><!--ko if:$component.test($component)--><!--/ko--><!--ko if:$component.test($root)--><!--/ko--><!--ko if:$component.test($parent)--><!--/ko-->';
    return template;
}
ko.components.register('people-selector',{
    viewModel:createViewModel(),
    template:createTemplate()
});


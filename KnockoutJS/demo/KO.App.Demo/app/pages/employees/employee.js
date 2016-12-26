var staffs = staffModel.getStaffs(),
    branches = staffs.data.branches,
    viewModel = {
        id:'0001',
        name:ko.observable(),
    };
    ViewModel = function(){
        var self = this;
        self.data = {
            branches:{
                count:ko.observable(0),
                detail:ko.observableArray()
            }
        };
        self.lastUpdated = ko.observable();
        self.primaryUnit = ko.observable();

        self.factory = {
            Employee:function(params){
                this.eid = params.eid;
                this.name = ko.observable(params.name).extend({
                    format:{
                        regex:/^[A-Z]{1}[a-zA-Z]*\.[A-Z]{1}[a-zA-Z]*/,
                        message:'Please input a First Name and a Last Name.'
                    }
                });
                this.email = ko.observable(params.email);
                this.phone = ko.observable(params.phone).extend({
                    format:{
                        regex:/0086\d{11}$/,
                        message:'Please check the phone number.'
                    }
                });
            },
            Branch:function(params){
                var me = this;
                me.shortName = ko.observable(params.shortName);
                me.fullName = params.fullName;
                me.location = params.location;
                me.employees = ko.observableArray();
                me.managerAssistant = ko.observable(params.managerAssistant);
                me.hr = ko.observable(params.hr);
                me.manager = new self.factory.Employee(params.manager);
                params.employees.forEach(function(item){
                    me.employees.push(new self.factory.Employee(item));
                });
                self.data.branches.count(self.data.branches.count() + 1);
            }
        };
        self.operations = {
            submit:function(){
                console.log(self.data.branches.detail.filterByProperty('location','Wuhan'));
                staffs.data.branches.data.detail = ko.toJS(self.data.branches.detail);
                staffModel.setStaffs(ko.toJSON(staffs));

               // alert(ko.toJSON(self.data.branches));
            },
            test:function(param){
                console.log(param);
            }
        };
        self.init = function(){
            branches.data.detail.forEach(function(branch){
                self.data.branches.detail.push(new self.factory.Branch(branch));
            });
            self.lastUpdated(branches.lastUpdated);
        };
        self.init();
    };

ko.applyBindings(new ViewModel());
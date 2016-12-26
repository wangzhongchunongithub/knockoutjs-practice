var staffs = staffModel.getStaffs(),
    companyInfo = staffs.data.companyInfo.data,
    ViewModel = function(){
        var self = this;
        self.data = {
            company:{
                name: ko.observable(),
                abbreviation: ko.observable()
            },
            title:ko.pureComputed(function(){
                return self.data.company.name() + '-' + self.data.company.abbreviation();
            })
        };
        self.biz = {
            lastUpdated:staffs.data.companyInfo.lastUpdated,
            //ko.dependentObservable(),ko.computed();
            companyTitle:ko.computed(function(){
                return self.data.company.name() + '(' + self.data.company.abbreviation() + ')';
            })
        };
        self.operations = {
            submit:function(){
                //You should use ko.utils.unwrapObservable in cases where you don't know if you have been given an observable or not ;
                console.log(ko.utils.unwrapObservable(self.biz.lastUpdated));
                console.log(ko.utils.unwrapObservable(self.data.company.name));
                console.log(self.data.company.name());
                console.log(ko.utils.unwrapObservable(self.data.company.abbreviation));
                //uwrap an object which contains observable;
                console.log(ko.toJS(self.data.company));
                //toJSON an observable;

                staffs.data.companyInfo.data = ko.toJS(self.data.company);
                staffModel.setStaffs(ko.toJSON(staffs));
               // alert(ko.toJSON(self.data.company));
            }
        };

        self.styles = {
            bgColor:ko.observable("#ffffff")
        };

        self.init = function(){
            self.data.company.name(companyInfo.name);
            self.data.company.abbreviation(companyInfo.abbreviation);
        };

        self.init();
        var subscription = self.data.company.name.subscribe(function(companyName){
            self.data.company.abbreviation(companyName.split(" ").reduce(function(prev,current){
                return current.length > 0 ? prev += current[0] : prev;
            },''));
            //if(subscription !== undefined){
           //     subscription.dispose();
            //}
        });

        ko.watch(self.data, false, function () {
            console.log('data has been changed ...');
        });
    };

ko.applyBindings(new ViewModel());
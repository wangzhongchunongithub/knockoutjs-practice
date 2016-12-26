window.staffModel = (function(){
    var staffModel = null,
        Staff = function(){
            function getStaffs(){
                var staff = {
                    lastUpdated:'2016-08-05T07:52:27.379Z',
                    version:'0',
                    data:{
                        companyInfo:{
                            lastUpdated: "2016-08-05T07:17:47.604Z",
                            permission:'read',
                            data:{
                                name:'A BIG Corperation',
                                abbreviation:'XYC'
                            }
                        },
                        branches:{
                            lastUpdated: "2016-08-05T07:17:47.604Z",
                            permission:'read',
                            count:2,
                            data:{
                                detail:[
                                    {
                                        shortName:'cs',
                                        fullName:'Customer Service',
                                        location:'Wuhan',
                                        manager:{
                                            eid:'60000010',
                                            name:'xx',
                                            email:'x.x@abc.com',
                                            phone:'008615555555555'
                                        },
                                        hr:'',
                                        managerAssistant:'z.z@abc.com',
                                        employees:[
                                            {
                                                eid:'60000000',
                                                name:'yy',
                                                email:'y.y@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000001',
                                                name:'zz',
                                                email:'z.z@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000010',
                                                name:'xx',
                                                email:'x.x@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000002',
                                                name:'ww',
                                                email:'w.w@abc.com',
                                                phone:'008615555555555'
                                            }
                                        ]
                                    },
                                    {
                                        shortName:'Cloud',
                                        fullName:'Cloud Service',
                                        location:'Shanghai',
                                        manager:{
                                            eid:'60000009',
                                            name:'xx',
                                            email:'x.x@abc.com',
                                            phone:'008615555555555'
                                        },
                                        hr:'',
                                        managerAssistant:'a.a@abc.com',
                                        employees:[
                                            {
                                                eid:'60000009',
                                                name:'xx',
                                                email:'x.x@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000004',
                                                name:'aa',
                                                email:'a.a@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000004',
                                                name:'bb',
                                                email:'b.b@abc.com',
                                                phone:'008615555555555'
                                            },
                                            {
                                                eid:'60000008',
                                                name:'cc',
                                                email:'c.c@abc.com',
                                                phone:'008615555555555'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                };
                if(window.localStorage.getItem('app-data-staff') == null){
                    window.localStorage.setItem('app-data-staff',JSON.stringify(staff));
                    staff = null;
                }
                return JSON.parse(window.localStorage.getItem('app-data-staff'))
            }

            function setStaffs(data){
                window.localStorage.setItem('app-data-staff',typeof data === 'string'? data : JSON.parse(data));
            }

            return {
                getStaffs:getStaffs,
                setStaffs:setStaffs
            }
        };
    function createModel(){
        if(staffModel === null){
            staffModel = new Staff();
        }
        return staffModel;
    }
    return createModel();
})();
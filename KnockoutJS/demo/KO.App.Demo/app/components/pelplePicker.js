function createPeoplePickerBinding(){
    function setElePadding(id,padding){
        if(document.getElementById(id) !== null){
            document.getElementById(id ).style.paddingLeft = padding + 'px';
        }
    }
    function getPersonByEmail (email){
        var allPeople = [],
            targetPerson = null;
        staffModel.getStaffs().data.branches.data.detail.forEach(function(item){
            allPeople = allPeople.concat(item.employees)
        });
        allPeople.some(function(item){
            if(item.email === email){
                targetPerson = item;
                return true;
            }
            return false;
        });
        return targetPerson;
    }
    function createPersonDisplayer(person,eleId,obs){
        var existedDisplayer = document.getElementById(eleId + '-displayer'),
            displayer = document.createElement('span'),
            deleteLink = document.createElement('a'),
            deleteSpan = document.createElement('span'),
            personLink = document.createElement('a');

        function deleteSelectedPerson(){
            obs('');
            setElePadding(eleId + '-input-box',0);
            document.getElementById(eleId + '-displayer').innerHTML = '';
            document.getElementById(eleId + '-input-box').value = '';
            document.getElementById(eleId + '-input-box').click();
            document.getElementById(eleId + '-input-box').focus();
        }

        if(existedDisplayer !== null){
            existedDisplayer.parentNode.removeChild(existedDisplayer);
        }

        displayer.id = eleId + '-displayer';
        displayer.classList.add('peoplePicker-displayer');
        displayer.style.left = '5px';
        displayer.style.top = '-23px';


        deleteSpan.id = eleId + '-delete-link';
        deleteSpan.classList.add("peoplePicker-delete-link");
        deleteSpan.innerHTML = '&nbsp;X&nbsp;';

        deleteLink.title = 'Delete the person';
        deleteLink.appendChild(deleteSpan);
        deleteLink.onclick = deleteSelectedPerson;
        personLink.innerText = person.name;
        personLink.title = person.email;
        personLink.classList.add("peoplePicker-res-name");

        displayer.appendChild(personLink);
        displayer.appendChild(deleteLink);

        setElePadding(eleId + '-input-box',(person.name.length * 9 + 10));
        return displayer;
    }
    ko.bindingHandlers.peoplePicker = {
        createPersonDisplayer:function(){
            console.log('done');
        },
        init:function(element,valueAccessor,allBindings){
            var obs = valueAccessor(),
                self = ko.bindingHandlers.peoplePicker,
                selected = getPersonByEmail(obs()),
                eleId = allBindings().id,
                allPeople = [],
                peopleListDiv = document.createElement('div'),
                inputControl = document.createElement('input'),
                peopleList = document.createElement('ul'),
                mouseOnPeopleList = false,
                isResolved = true;

            function showPeopleList(target){
                target.parentNode.insertBefore(peopleListDiv,target.nextSibling);
                peopleListDiv.classList.remove('hidden');
            }

            function hidePeopleList(){
                peopleListDiv.classList.add('hidden');
            }
            function getPeopleList(key){
                if(allPeople.length === 0){
                    staffModel.getStaffs().data.branches.data.detail.forEach(function(item){
                        allPeople = allPeople.concat(item.employees)
                    });
                }
                return allPeople.filter(function(item){
                    return item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || item.email.toLowerCase().indexOf(key.toLowerCase()) !== -1;
                });
            }

            function createPeopleList(people){
                var tempItem = null;
                peopleList.innerHTML = '';
                people.forEach(function(person){
                    tempItem = document.createElement('li');
                    tempItem.classList.add('peoplePicker-item');
                    tempItem.innerText = person.email + '(' + person.name  + ')';
                    tempItem.onmouseover = function(){
                        this.style.backgroundColor = '#bbb';
                    };
                    tempItem.onclick = function(){
                        obs(person.email);
                        selected = person;
                        document.getElementById(inputControl.id).value = '';
                        hidePeopleList();
                        document.getElementById(inputControl.id).parentNode.insertBefore(createPersonDisplayer(person,eleId,obs),inputControl.nextSibling);
                        isResolved = true;
                    };
                    tempItem.onmouseout = function(){
                        this.style.backgroundColor = '#ddd';
                    };
                    peopleList.appendChild(tempItem);
                });
                peopleListDiv.innerHTML = '';
                peopleListDiv.appendChild(peopleList);
            }

            function initPicker(){
                peopleListDiv.id = eleId + '-people-list-div';
                peopleListDiv.classList.add('peoplePicker-div');
                peopleListDiv.onmouseover = function(){
                    mouseOnPeopleList = true;
                };
                peopleListDiv.onmouseout = function(){
                    mouseOnPeopleList = false;
                };

                inputControl.id = eleId + '-input-box';
                inputControl.setAttribute('palceholder','Input a Name or Email...')
                inputControl.classList.add('peoplePicker-input');
                inputControl.onkeyup = function(){
                    createPeopleList(getPeopleList(this.value));
                    if(document.getElementById(eleId + '-displayer') !== null){
                        document.getElementById(eleId + '-displayer').innerHTML = '';
                    }
                    setElePadding(eleId + '-input-box',0);
                    showPeopleList(this);
                };
                inputControl.onblur = function(event){
                    if(!mouseOnPeopleList){
                        hidePeopleList();
                        document.getElementById(inputControl.id).value = '';
                        if(selected !== null){
                            document.getElementById(inputControl.id).parentNode.insertBefore(createPersonDisplayer(selected,eleId,obs),inputControl.nextSibling);
                        }
                        obs(selected.email);
                    }
                };

                peopleList.classList.add('peoplePicker-list');

                element.style.width = '230px';
                element.classList.add('bg-primary');
                element.appendChild(inputControl);
                element.appendChild(document.createElement('span'));
            }

            initPicker();
        },
        update:function(element,valueAccessor,allBindings){
            var eleId = allBindings().id,
                self = ko.bindingHandlers.peoplePicker,
                obs = valueAccessor();
            self.createPersonDisplayer();
            if(obs() === ''){
                if(document.getElementById(eleId + '-displayer') !== null){
                    document.getElementById(eleId + '-displayer').innerHTML = '';
                }
            }else{
                document.getElementById(eleId + '-input-box').parentNode.insertBefore(createPersonDisplayer(getPersonByEmail(obs()),eleId,obs),document.getElementById(eleId + '-input-box').nextSibling);
            }
        }
    };
}

function createViewModel(){
    var viewModel = function(params){
        var self = this;
        self.id = utils.newGuid();
        self.selected = params.person;
    };
    return viewModel;
}
function createTemplate(){
    var template = "<div class='form-control' data-bind='peoplePicker:selected,id:$component.id'></div>";
    return template;
}

createPeoplePickerBinding();
ko.components.register('people-picker',{
    viewModel:createViewModel(),
    template:createTemplate()
});


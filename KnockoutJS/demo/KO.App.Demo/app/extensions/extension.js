/**
 * Created by wanzhong on 8/18/2016.
 */
ko.extenders.format = function(target,format){
    target.hasError = ko.observable();
    target.message = ko.observable();

    function validate(val){
        if(format.regex.test(val)){
            target.hasError(false);
            target.message('');
        }else{
            target.hasError(true);
            target.message(format.message);
        }
    }
    target.subscribe(validate);
    return target;
};
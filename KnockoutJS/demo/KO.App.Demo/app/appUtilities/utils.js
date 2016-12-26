window.utils = (function(){
    var utilities = null,
        Utils = function(){
            function createGuid(){
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
            return {
                newGuid:createGuid
            }
        };
    function createUtils(){
        if(utilities === null){
            utilities = new Utils();
        }
        return utilities;
    }
    return createUtils();
})();
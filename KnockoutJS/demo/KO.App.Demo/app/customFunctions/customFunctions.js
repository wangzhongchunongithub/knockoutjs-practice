/**
 * Created by wanzhong on 8/19/2016.
 */
ko.observableArray.fn.filterByProperty = function(prop,val){
  return this().filter(function(item){
      return item[prop] === val;
  });
};
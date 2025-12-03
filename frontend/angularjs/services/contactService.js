(function(){
  angular.module('contactApp')
    .factory('ContactService',['$http',function($http){
      var base = '/api';
      // assume backend is on / (proxy) or change to http://localhost:3000
      var url = 'http://localhost:3000';
      return {
        list: function(){return $http.get(url+'/contacts')},
        get: function(id){return $http.get(url+'/contacts/'+id)},
        create: function(payload){return $http.post(url+'/contacts',payload)},
        update: function(id,payload){return $http.patch(url+'/contacts/'+id,payload)},
        remove: function(id){return $http.delete(url+'/contacts/'+id)},
        removeByPhone: function(phone){return $http.delete(url+'/contacts/phone/'+encodeURIComponent(phone))}
      };
    }]);
})();
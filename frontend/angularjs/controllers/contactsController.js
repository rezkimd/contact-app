(function(){
  angular.module('contactApp')
    .controller('ContactsCtrl',['$scope','ContactService','$location',function($scope,ContactService,$location){
      $scope.user = JSON.parse(localStorage.getItem('user')||'null');
      $scope.contacts = [];
      $scope.loading = true;
      ContactService.list().then(function(res){$scope.contacts=res.data;$scope.loading=false},function(){alert('Failed to load')});

      $scope.openChat = function(contact){ $location.path('/chat/'+contact._id)};

      $scope.deleteByPhone = function(phone){
        if(!confirm('Delete contact with phone '+phone+' ?')) return;
        ContactService.removeByPhone(phone).then(function(res){
          alert('Deleted');
          // refresh
          return ContactService.list();
        }).then(function(r){$scope.contacts = r.data}).catch(function(){alert('Delete failed')});
      };

    }]);
})();
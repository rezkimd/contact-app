(function(){
  angular.module('contactApp')
    .controller('MainCtrl',['$scope','ContactService','$location',function($scope,ContactService,$location){
      $scope.user = JSON.parse(localStorage.getItem('user')||'null');
      if(!$scope.user){$location.path('/login');return}

      $scope.openProfile = function(){ $location.path('/profile'); };

    }]);
})();
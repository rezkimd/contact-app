(function(){
  angular.module('contactApp')
    .controller('AuthCtrl',['$scope','$location',function($scope,$location){
      $scope.login = function(){
        if(!$scope.name || !$scope.phone){$scope.error='Name and phone required';return}
        var user = {name:$scope.name,phone:$scope.phone};
        localStorage.setItem('user',JSON.stringify(user));
        $location.path('/app');
      };
    }]);
})();
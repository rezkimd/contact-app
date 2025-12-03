(function(){
  angular.module('contactApp')
    .controller('ChatCtrl',['$scope','$routeParams','ContactService',function($scope,$routeParams,ContactService){
      $scope.user = JSON.parse(localStorage.getItem('user')||'null');
      $scope.messages = [];
      $scope.contact = null;
      ContactService.get($routeParams.id).then(function(res){$scope.contact = res.data},function(){alert('Contact not found')});

      $scope.send = function(){
        if(!$scope.newMsg) return;
        $scope.messages.push({text:$scope.newMsg,from:'me',time:new Date()});
        $scope.newMsg='';
      };
    }]);
})();
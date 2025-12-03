(function(){
  angular.module('contactApp',['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
        .when('/login',{templateUrl:'views/login.html',controller:'AuthCtrl'})
        .when('/app',{templateUrl:'views/main.html',controller:'MainCtrl'})
        .when('/profile',{templateUrl:'views/profile.html',controller:'MainCtrl'})
        .when('/contacts',{templateUrl:'views/contacts.html',controller:'ContactsCtrl'})
        .when('/chat/:id',{templateUrl:'views/chat.html',controller:'ChatCtrl'})
        .otherwise({redirectTo:'/login'});
    }])
    .run(['$rootScope','$location',function($rootScope,$location){
      $rootScope.isLoggedIn = function(){return !!localStorage.getItem('user')};
      $rootScope.getUser = function(){return JSON.parse(localStorage.getItem('user')||'null')};
      $rootScope.logout = function(){localStorage.removeItem('user'); $location.path('/login')};
    }]);
})();
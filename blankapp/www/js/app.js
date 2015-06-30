// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider){
  
      $stateProvider
       .state('tabs',{
          url:'/tab',
          abstract:true,
          templateUrl:'templates/tabs.html'
       })
       .state('tabs.home',{
         url:'/home',
         views:{
          'home-tab':{
               templateUrl:'templates/home.html'
           }
         }
       })
       .state('tabs.list',{
         url:'/list',
         views:{
          'list-tab':{
               templateUrl:'templates/list.html',
               controller:'listController'
           }
         }
       })
        .state('tabs.details',{
         url:'/list/:aid',
         views:{
          'list-tab':{
               templateUrl:'templates/detail.html',
               controller:'listController'
           }
         }
       })
       $urlRouterProvider
         .otherwise('/tab/home');
})

.controller('listController',function($scope,$http,$state) {
     $http.get('js/data.json').success(function(data){
       
       $scope.artists=data.speakers;
       
       $scope.selectedArtist=$state.params.aid;
       
       $scope.onItemDelete=function(item){
    
           $scope.artists.splice(  $scope.artists.indexOf(item),1);
       };
       
   
       $scope.toggleStar=function(item){
         item.star=!item.star;
       }
       
       $scope.doRefresh=function(){
              $http.get('js/data.json').success(function(data){
                      $scope.artists=data.speakers;
                      $scope.$broadcast('scroll.refreshComplete')
              })
       }
       
       $scope.moveItem=function(item,fromIndex,toIndex){
         $scope.artists.splice(fromIndex,1);
            $scope.artists.splice(toIndex,0,item);
       }

     });
});





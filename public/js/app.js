'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MyCtrl1'});
  $routeProvider.when('/teachers', {templateUrl: 'partials/teachers.html', controller: 'MyCtrl2'});
  $routeProvider.when('/lab/:id', {templateUrl: 'partials/lab.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);

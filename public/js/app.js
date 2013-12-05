'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: 'MainController' });
  
  $routeProvider.when('/teacher', { templateUrl: 'partials/teachers.html', controller: 'Teachers' });
  $routeProvider.when('/teacher/:id', { templateUrl: 'partials/concrete-teacher.html', controller: 'ConcreteTeacher' });
  
  $routeProvider.when('/group', { templateUrl: 'partials/groups.html', controller: 'Groups' });
  $routeProvider.when('/group/:id', { templateUrl: 'partials/concrete-group.html', controller: 'ConcreteGroup' });
  
  $routeProvider.otherwise({ redirectTo: '/group' });
}]);

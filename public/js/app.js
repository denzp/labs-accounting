'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])

.config(['$routeProvider', function($routeProvider) {  
  var wrap = function(name) {
    return ['Backend', function(Backend) {
      return Backend[name]();
    }];
  }
  var wrapWithId = function(name) {
    return ['Backend', '$route', function(Backend, $route) {
      return Backend[name]($route.current.params.id);
    }];
  }
  
  $routeProvider.when('/teacher', {
    templateUrl: 'partials/teachers.html',
    controller: 'Teachers',
    resolve: {
      teacherList: wrap('getTeacherListPromise')
    }
  });
  $routeProvider.when('/teacher/:id', {
    templateUrl: 'partials/concrete-teacher.html',
    controller: 'ConcreteTeacher',
    resolve: {
      teacherInfo: wrapWithId('getTeacherInfoPromise'),
      coursesList: wrapWithId('getTeacherCoursesListPromise'),
    }
  });
  
  $routeProvider.when('/group', {
    templateUrl: 'partials/groups.html',
    controller: 'Groups',
    resolve: {
      groupList: wrap('getGroupListPromise')
    }
  });
  $routeProvider.when('/group/:id', {
    templateUrl: 'partials/concrete-group.html',
    controller: 'ConcreteGroup',
    resolve: {
      groupInfo: wrapWithId('getGroupInfoPromise'),
      studentsList: wrapWithId('getGroupStudentsListPromise'),
    }
  });
  
  $routeProvider.otherwise({ redirectTo: '/group' });
}]);

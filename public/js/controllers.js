'use strict';

angular.module('myApp.controllers', [])

.controller('Teachers', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/teacher').success(function(data) {
    $scope.teacherList = data;
  })
}])

.controller('ConcreteTeacher', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/api/teacher/' + $routeParams.id + '/courses').success(function(data) {
    $scope.coursesList = data;
  })
  $http.get('/api/teacher/' + $routeParams.id).success(function(data) {
    $scope.info = data;
  })
}])

.controller('Groups', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/group').success(function(data) {
    $scope.groupList = data;
  })
}])

.controller('ConcreteGroup', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/api/group/' + $routeParams.id + '/students').success(function(data) {
    $scope.studentList = data;
  })
  $http.get('/api/group/' + $routeParams.id).success(function(data) {
    $scope.info = data;
  })
}])

.controller('MainController', ['$scope', '$http', function($scope, $http) {
  //
}])
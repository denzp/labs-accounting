'use strict';

angular.module('myApp.controllers', [])

.controller('Teachers', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/teacher').success(function(data) {
    $scope.teacherList = data;
  })
}])

.controller('ConcreteTeacher', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/api/teacher/' + $routeParams.id).success(function(data) {
    $scope.coursesList = data;
  })
}])

.controller('Groups', ['$scope', '$http', function($scope, $http) {
  $scope.groupList = $http.get('/api/group');
}])

.controller('MainController', ['$scope', '$http', function($scope, $http) {
  //
}])
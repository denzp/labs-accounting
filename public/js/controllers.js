'use strict';

angular.module('myApp.controllers', [])

.controller('Teachers', ['$scope', 'teacherList', function($scope, teacherList) {
  $scope.teacherList = teacherList.data;
}])

.controller('ConcreteTeacher', ['$scope', 'teacherInfo', 'coursesList', function($scope, teacherInfo, coursesList) {
  $scope.info = teacherInfo.data;
  $scope.coursesList = coursesList.data;
}])

.controller('Groups', ['$scope', 'groupList', function($scope, groupList) {
  $scope.groupList = groupList.data;
}])

.controller('ConcreteGroup', ['$scope', 'studentsList', 'groupInfo', function($scope, studentsList, groupInfo) {
  $scope.studentsList = studentsList.data;
  $scope.info = groupInfo.data;
}])

.controller('MainController', ['$scope', '$timeout', 'Backend', function($scope, $timeout, Backend) {
  $scope.loginWindowVisibility = false;
  $scope.toggleLogin = function() {
    $scope.loginWindowVisibility = !$scope.loginWindowVisibility;
  }
  
  
  $scope.login = JSON.parse(localStorage.loginData || '{ }');
  
  $scope.auth = { };
  $scope.performAuth = function() {
    Backend
      .performLogin($scope.auth.login, $scope.auth.password)
      .then(successfulLogin, failedLogin);
  }
  
  var successfulLogin = function(data) {
    $timeout(function() {
      $scope.loginWindowVisibility = false;
      
      $scope.login = {
        id: data.id,
        pubkey: data.pubkey,
        login: data.login,
        name: data.name,
        surname: data.surname
      }
      
      localStorage.loginData = JSON.stringify($scope.login);
    })
  }
  var failedLogin = function() {
    alert('Unable to login! Please, check authorization credentials.');
  }
  
  $scope.performLogout = function() {
    $scope.login = { };
    localStorage.loginData = '{ }';
  }
}])
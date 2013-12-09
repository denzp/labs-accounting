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

.controller('MainController', ['$scope', function($scope) {
  //
}])
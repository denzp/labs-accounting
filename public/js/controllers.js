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

.controller('ConcreteGroup', ['$scope', 'coursesList', 'groupInfo', function($scope, coursesList, groupInfo) {
  $scope.groupCoursesList = coursesList.data;
  $scope.info = groupInfo.data;
  
  var maxQuarter = 0;
  $scope.quarters = { };
  coursesList.data.map(function(v) {
    if($scope.quarters[v.quarter] === undefined) {
      $scope.quarters[v.quarter] = {
        visible: false,
        count: 1,
        id: v.quarter
      }
      
      if(v.quarter > maxQuarter)
        maxQuarter = v.quarter;
    }
    
    ++$scope.quarters[v.quarter].count;
  })
  
  $scope.quarters[maxQuarter].visible = true;
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

.controller('ConcreteCourse', ['$scope', 'courseInfo', 'labsList', 'studentsList', function($scope, courseInfo, labsList, studentsList) {
  $scope.info = courseInfo.data;
  $scope.labsList = labsList.data;
  $scope.studentsList = studentsList.data;
  
  $scope.calcScale = function(studentId, labId) {
    var mark = ($scope.labMarks[studentId] || [])[labId] || 0;
    
    if(mark < 0.3333)
      return 'bad-mark';
    
    if(mark < 0.6666)
      return 'average-mark';
    
    if(mark < 0.9)
      return 'almost-good-mark';
    
    return 'good-mark';
  }
  
  // mock data
  $scope.testsList = [
    { name: 'Test 1' },
    { name: 'Test 2' }
  ];
  
  $scope.labMarks = {
    0: {
      1: 0.5444444,
      4: 1
    },
    
    1: {
      1: 0.5444444,
      4: 1,
      3: 0.8,
      2: 0.9999999
    },
    
    2: {
      3: 0.1
    }
  }
}])
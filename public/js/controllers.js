'use strict';

angular.module('myApp.controllers', [])

.controller('Teachers', ['$scope', 'teacherList', 'Auth', function($scope, teacherList, Auth) {
  $scope.login = Auth.data;
  $scope.teacherList = teacherList.data;
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('TeachersEdit', ['$scope', 'teacherFullList', 'Backend', 'Auth', function($scope, teacherFullList, Backend, Auth) {
  $scope.login = Auth.data;
  $scope.teacherList = teacherFullList.data;
  
  $scope.newTeacher = { accessType: 1 };
  $scope.addNewTeacher = function() {
    Backend
      .addNewTeacher($scope.newTeacher)
      .then(function(result) {
        $scope.teacherList.push(result.data[0]);
        $scope.newTeacher = { accessType: 1 };
      }, function(result) {
        console.error(result);
      })
  }
}])

.controller('ConcreteTeacher', ['$scope', 'teacherInfo', 'coursesList', 'Auth', function($scope, teacherInfo, coursesList, Auth) {
  $scope.login = Auth.data;
  $scope.info = teacherInfo.data;
  $scope.coursesList = coursesList.data;
}])

.controller('Groups', ['$scope', 'groupList', 'Auth', function($scope, groupList, Auth) {
  $scope.login = Auth.data;
  $scope.groupList = groupList.data;
  
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('GroupsEdit', ['$scope', 'groupList', 'Backend', function($scope, groupList, Backend) {
  $scope.groupList = groupList.data;
  
  $scope.newGroup = { isDistanced: 0 };
  $scope.addGroup = function() {
    Backend
      .addGroup($scope.newGroup)
      .then(function(result) {
        $scope.groupList.push(result.data[0]);
        $scope.newGroup = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteGroup = function(id) {
    Backend
      .deleteGroup({ id: id })
      .then(function(result) {
        var groups = [];
        for(var i = 0; i < $scope.groupList.length; ++i)
          if($scope.groupList[i].id != id)
            groups.push($scope.groupList[i]);
        
        $scope.groupList = groups;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeName = function(id, v) {
    if(v.length < 2)
      return "Group name is too short!";
    
    Backend.editGroup({
      id: id,
      name: v
    })
  }
  $scope.changeType = function(id, v) {
    Backend.editGroup({
      id: id,
      isDistanced: v
    })
  }
}])

.controller('ConcreteGroup', ['$scope', 'coursesList', 'groupInfo', 'Auth', function($scope, coursesList, groupInfo, Auth) {
  $scope.login = Auth.data;
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
  
  if($scope.quarters[maxQuarter])
    $scope.quarters[maxQuarter].visible = true;
  
  $scope.view = function() {
    window.location.hash += '/students';
  }
  $scope.edit = function() {
    window.location.hash += '/edit';
  }
}])

.controller('ConcreteGroupStudents', ['$scope', 'studentsList', 'groupInfo', function($scope, studentsList, groupInfo) {
  $scope.studentsList = studentsList.data;
  $scope.info = groupInfo.data;
}])

.controller('ConcreteGroupEdit', ['$scope', 'studentsList', 'groupInfo', 'Backend', function($scope, studentsList, groupInfo, Backend) {
  $scope.studentsList = studentsList.data;
  $scope.info = groupInfo.data;
  
  $scope.newStudent = { };
  $scope.addNewStudent = function() {
    $scope.newStudent.group = groupInfo.data.id;
    Backend
      .addNewStudent($scope.newStudent)
      .then(function(result) {
        $scope.studentsList.push(result.data[0]);
        $scope.newStudent = { };
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.deleteStudent = function(id) {
    $scope.newStudent.group = groupInfo.data.id;
    Backend
      .deleteStudent({ id: id })
      .then(function(result) {
        var students = [];
        for(var i = 0; i < $scope.studentsList.length; ++i)
          if($scope.studentsList[i].id != id)
            students.push($scope.studentsList[i]);
        
        $scope.studentsList = students;
      }, function(result) {
        console.error(result);
      })
  }
  
  $scope.changeName = function(id, v) {
    if(v.length < 2)
      return "Name is too short!";
    
    Backend.editStudent({
      id: id,
      name: v
    })
  }
  $scope.changeSurname = function(id, v) {
    if(v.length < 2)
      return "Surname is too short!";
    
    Backend.editStudent({
      id: id,
      surname: v
    })
  }
  $scope.changePatronymic = function(id, v) {
    if(v.length < 2)
      return "Patronymic is too short!";
    
    Backend.editStudent({
      id: id,
      patronymic: v
    })
  }
}])

.controller('MainController', ['$scope', '$timeout', 'Backend', 'Auth', function($scope, $timeout, Backend, Auth) {
  $scope.login = Auth.data;
  
  $scope.loginWindowVisibility = false;
  $scope.toggleLogin = function() {
    $scope.loginWindowVisibility = !$scope.loginWindowVisibility;
  }

  $scope.auth = { };
  $scope.performAuth = function() {
    Backend
      .performLogin($scope.auth.login, $scope.auth.password)
      .then(successfulLogin, failedLogin);
  }
  
  var successfulLogin = function(data) {
    $timeout(function() {
      $scope.loginWindowVisibility = false;
      
      Auth.set({
        id: data.id,
        pubkey: data.pubkey,
        login: data.login,
        name: data.name,
        surname: data.surname,
        access: data.accessType
      })
    })
  }
  var failedLogin = function() {
    alert('Unable to login! Please, check authorization credentials.');
  }
  
  $scope.performLogout = function() {
    Auth.clear();
    //window.location.reload();
  }
}])

.controller('ConcreteCourse', ['$scope', 'courseInfo', 'labsList', 'studentsList', 'Auth', function($scope, courseInfo, labsList, studentsList, Auth) {
  $scope.login = Auth.data;
  $scope.info = courseInfo.data;
  $scope.labsList = labsList.data;
  $scope.studentsList = studentsList.data;
  
  $scope.calcScale = function(studentId, labId) {
    var mark = ($scope.labMarks[studentId] || [])[labId];
    
    if(!mark)
      return '';
    
    if(mark < 61)
      return 'bad-mark';
    
    if(mark < 75)
      return 'average-mark';
    
    if(mark < 90)
      return 'almost-good-mark';
    
    return 'good-mark';
  }
  
  $scope.getTotalSumm = function() {
    var summ = 0;
    for(var i = 0; i < $scope.labsList.length; ++i)
      summ += $scope.labsList[i].refMark;
    
    return summ;
  }
  
  $scope.totalMarks = { };
  $scope.getMark = function(studentId) {
    if($scope.totalMarks[studentId] < 60)
      return 'F';
    
    if($scope.totalMarks[studentId] <= 70)
      return 'E';
    
    if($scope.totalMarks[studentId] <= 75)
      return 'D';
    
    if($scope.totalMarks[studentId] <= 80)
      return 'C';
    
    if($scope.totalMarks[studentId] < 90)
      return 'B';
    
    return 'A';
  }
  
  $scope.calcSum = function(studentId) {
    var summ = 0;
    var student = $scope.labMarks[studentId] || [];
    
    var ref = { };
    $scope.labsList.map(function(v) {
      ref[v.id] = v.refMark;
    })
    
    for(var i in student)
      summ += parseInt(student[i]) * ref[i] / 100;
    
    $scope.totalMarks[studentId] = summ;
    return summ;
  }
  
  // mock data
  $scope.testsList = [
    { name: 'Test 1' },
    { name: 'Test 2' }
  ];
  
  $scope.labMarks = {
    0: {
      1: 54,
      4: 100
    },
    
    1: {
      1: 55,
      4: 100,
      3: 80,
      2: 99
    },
    
    2: {
      3: 10
    }
  }
}])
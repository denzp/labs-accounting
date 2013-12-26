'use strict';

angular.module('myApp.services', [])

.service('Backend', ['$http', '$q', 'Auth', function($http, $q, Auth) {
  this.getGroupListPromise = function getGroupListPromise() {
    return $http.get('/api/group');
  }
  this.getTeacherListPromise = function getTeacherListPromise() {
    return $http.get('/api/teacher');
  }
  
  this.getTeacherInfoPromise = function getTeacherInfoPromise(id) {
    return $http.get('/api/teacher/' + id);
  }
  this.getTeacherCoursesListPromise = function getTeacherCoursesListPromise(id) {
    return $http.get('/api/teacher/' + id + '/courses');
  }
  
  this.getGroupInfoPromise = function getGroupInfoPromise(id) {
    return $http.get('/api/group/' + id);
  }
  this.getGroupCoursesListPromise = function getGroupCoursesListPromise(id) {
    return $http.get('/api/group/' + id + '/courses');
  }
  this.getGroupStudentsListPromise = function getGroupStudentsListPromise(id) {
    return $http.get('/api/group/' + id + '/students');
  }
  
  this.performLogin = function performLogin(login, hash) {
    var deferred = $q.defer();
    
    $http.post('/api/auth', { login: login, hash: hash })
      .then(
        function(result) {
          deferred.resolve(result.data);
        },
        function() {
          deferred.reject();
        });
    
    return deferred.promise;
  }
  
  this.getCourseInfoPromise = function getCourseInfoPromise(id) {
    return $http.get('/api/course/' + id + '');
  }
  this.getCourseLabsListPromise = function getCourseLabsListPromise(id) {
    return $http.get('/api/course/' + id + '/labs');
  }
  this.getCourseTestsListPromise = function getCourseTestsListPromise(id) {
    return $http.get('/api/course/' + id + '/tests');
  }
  this.getCourseLabsMarksListPromise = function getCourseLabsMarksListPromise(id) {
    return $http.get('/api/course/' + id + '/labs/marks');
  }
  this.getCourseTestsMarksListPromise = function getCourseTestsMarksListPromise(id) {
    return $http.get('/api/course/' + id + '/tests/marks');
  }
  this.getCourseStudentsListPromise = function getCourseStudentsListPromise(id) {
    return $http.get('/api/course/' + id + '/students');
  }
  
  
  // POST
  this.getTeacherFullListPromise = function getTeacherListPromise() {
    return $http.post('/api/teacher/full', {
      login: Auth.login,
      pubkey: Auth.pubkey
    })
  }
  
  this.addNewTeacher = function addNewTeacher(data) {
    return $http.post('/api/teacher/add', { data: data });
  }
  this.deleteTeacher = function deleteTeacher(data) {
    return $http.post('/api/teacher/delete', { data: data });
  }
  this.editTeacher = function editTeacher(data) {
    return $http.post('/api/teacher/edit', { data: data });
  }
  
  this.editStudent = function editStudent(data) {
    return $http.post('/api/student/edit', { data: data });
  }
  this.addNewStudent = function addNewStudent(data) {
    return $http.post('/api/student/add', { data: data });
  }
  this.deleteStudent = function deleteStudent(data) {
    return $http.post('/api/student/delete', { data: data });
  }
  
  this.deleteGroup = function deleteGroup(data) {
    return $http.post('/api/group/delete', { data: data });
  }
  this.addGroup = function addGroup(data) {
    return $http.post('/api/group/add', { data: data });
  }
  this.editGroup = function editGroup(data) {
    return $http.post('/api/group/edit', { data: data });
  }
  
  this.deleteCourse = function deleteCourse(data) {
    return $http.post('/api/course/delete', { data: data });
  }
  this.addCourse = function addCourse(data) {
    return $http.post('/api/course/add', { data: data });
  }
  this.editCourse = function editCourse(data) {
    return $http.post('/api/course/edit', { data: data });
  }
  
  this.setMark = function setMark(data) {
    return $http.post('/api/mark/set', { data: data });
  }
  this.setTestMark = function setTestMark(data) {
    return $http.post('/api/test/set', { data: data });
  }
  
  this.editLab = function editLab(data) {
    return $http.post('/api/labs/edit', { data: data });
  }
  this.editTest = function editTest(data) {
    return $http.post('/api/tests/edit', { data: data });
  }
  this.addLab = function addLab(data) {
    return $http.post('/api/labs/add', { data: data });
  }
  this.addTest = function addTest(data) {
    return $http.post('/api/tests/add', { data: data });
  }
  this.deleteLab = function deleteLab(data) {
    return $http.post('/api/labs/delete', { data: data });
  }
  this.deleteTest = function deleteTest(data) {
    return $http.post('/api/tests/delete', { data: data });
  }
}])

.service('Auth', [function() {
  var data = JSON.parse(localStorage.loginData || '{ }');
  
  this.__defineGetter__('data', function() {
    return data;
  });
  
  this.set = function(obj) {
    for(var i in data)
      delete data[i];
    
    for(var i in obj)
      data[i] = obj[i];
    
    localStorage.loginData = JSON.stringify(data);
  }
  
  this.clear = function() {
    for(var i in data)
      delete data[i];
    
    localStorage.loginData = '{ }';
  }
}]);
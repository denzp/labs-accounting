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
  
  this.editStudent = function addNewStudent(data) {
    return $http.post('/api/student/edit', { data: data });
  }
  this.addNewStudent = function addNewStudent(data) {
    return $http.post('/api/student/add', { data: data });
  }
  this.deleteStudent = function deleteStudent(data) {
    return $http.post('/api/student/delete', { data: data });
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
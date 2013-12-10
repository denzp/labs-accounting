'use strict';

angular.module('myApp.services', [])

.service('Backend', ['$http', '$q', function($http, $q) {
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
}]);
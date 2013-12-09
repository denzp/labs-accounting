'use strict';

angular.module('myApp.services', [])

.service('Backend', ['$http', function($http) {
  this.getGroupListPromise = function() {
    return $http.get('/api/group');
  }
  this.getTeacherListPromise = function() {
    return $http.get('/api/teacher');
  }
  
  this.getTeacherInfoPromise = function(id) {
    return $http.get('/api/teacher/' + id);
  }
  this.getTeacherCoursesListPromise = function(id) {
    return $http.get('/api/teacher/' + id + '/courses');
  }
  
  this.getGroupInfoPromise = function(id) {
    return $http.get('/api/group/' + id);
  }
  this.getGroupStudentsListPromise = function(id) {
    return $http.get('/api/group/' + id + '/students');
  }
}]);
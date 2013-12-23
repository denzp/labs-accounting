'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  
  'xeditable'
])

.run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
}])

.config(['$routeProvider', function($routeProvider) {  
  var wrap = function(name) {
    return ['Backend', function(Backend) {
      return Backend[name]();
    }];
  }
  var wrapWithId = function(name) {
    return ['Backend', '$route', function(Backend, $route) {
      return Backend[name]($route.current.params.id);
    }];
  }
  
  $routeProvider.when('/teacher', {
    templateUrl: 'partials/teachers.html',
    controller: 'Teachers',
    resolve: {
      teacherList: wrap('getTeacherListPromise')
    }
  });
  $routeProvider.when('/teacher/edit', {
    templateUrl: 'partials/teachers-edit.html',
    controller: 'TeachersEdit',
    resolve: {
      teacherFullList: wrap('getTeacherFullListPromise')
    }
  });
  $routeProvider.when('/teacher/:id', {
    templateUrl: 'partials/concrete-teacher.html',
    controller: 'ConcreteTeacher',
    resolve: {
      teacherInfo: wrapWithId('getTeacherInfoPromise'),
      coursesList: wrapWithId('getTeacherCoursesListPromise'),
    }
  });
  $routeProvider.when('/teacher/:id/edit', {
    templateUrl: 'partials/concrete-teacher-edit.html',
    controller: 'ConcreteTeacherEdit',
    resolve: {
      teacherInfo: wrapWithId('getTeacherInfoPromise'),
      coursesList: wrapWithId('getTeacherCoursesListPromise'),
      groupList: wrap('getGroupListPromise')
    }
  });
  
  $routeProvider.when('/group', {
    templateUrl: 'partials/groups.html',
    controller: 'Groups',
    resolve: {
      groupList: wrap('getGroupListPromise')
    }
  });
  $routeProvider.when('/group/edit', {
    templateUrl: 'partials/groups-edit.html',
    controller: 'GroupsEdit',
    resolve: {
      groupList: wrap('getGroupListPromise')
    }
  });
  $routeProvider.when('/group/:id', {
    templateUrl: 'partials/concrete-group.html',
    controller: 'ConcreteGroup',
    resolve: {
      groupInfo: wrapWithId('getGroupInfoPromise'),
      coursesList: wrapWithId('getGroupCoursesListPromise'),
    }
  });
  $routeProvider.when('/group/:id/edit', {
    templateUrl: 'partials/concrete-group-edit.html',
    controller: 'ConcreteGroupEdit',
    resolve: {
      groupInfo: wrapWithId('getGroupInfoPromise'),
      studentsList: wrapWithId('getGroupStudentsListPromise'),
    }
  });
  $routeProvider.when('/group/:id/students', {
    templateUrl: 'partials/concrete-group-students.html',
    controller: 'ConcreteGroupStudents',
    resolve: {
      groupInfo: wrapWithId('getGroupInfoPromise'),
      studentsList: wrapWithId('getGroupStudentsListPromise'),
    }
  });
  
  $routeProvider.when('/course/:id', {
    templateUrl: 'partials/concrete-course.html',
    controller: 'ConcreteCourse',
    resolve: {
      courseInfo: wrapWithId('getCourseInfoPromise'),
      labsList: wrapWithId('getCourseLabsListPromise'),
      studentsList: wrapWithId('getCourseStudentsListPromise'),
    }
  });
  
  $routeProvider.otherwise({ redirectTo: '/group' });
}]);

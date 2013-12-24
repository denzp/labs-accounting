'use strict';

angular.module('myApp.filters', [])

.filter('courseFilter', function() {
  return function(input, filter) {
    var output = [];
    
    for(var i = 0; i < input.length; ++i) {
      if(filter.quarters[input[i].quarter].visible)
        output.push(input[i]);
    }
    
    return output;
  }
})

.filter('quarterSort', function() {
  return function(input) {
    return input.sort(function(v1, v2) { return v1.quarter < v2.quarter; });
  }
})
.filter('quarterFilterSort', function() {
  return function(input) {
    var keys = [], output = [];

    for(var i in input)
      if (input.hasOwnProperty(i))
        keys.push(i);

    keys.sort(function(v1, v2) { return v2 > v1; });

    for(var i = 0; i < keys.length; ++i)
      output.push(input[keys[i]]);
    
    return output;
  }
})

.filter('labMark', function() {
  return function(input) {
    if(!input)
      return '0%';
    
    return parseInt(input) + '%';
  }
})

.filter('testMark', function() {
  return function(input) {
    if(!input)
      return '0';
    
    return parseInt(input);
  }
})
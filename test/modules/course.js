var utils = require('../utils'),
    assert  = require('assert');

var tests = [
  {
    'when we getting course info': {
      topic: utils.get('/api/course/2'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, {
          "id": 2,
          "title": "TestCourse2",
          "groupName": "SP-11z",
          "group": 2,
          "year": 2013
        })
      }
    },
    
    'when we getting non-exist course info': {
      topic: utils.get('/api/course/50'),
      
      'response have 404 NotFound': utils.isNotFound,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, null);
      }
    },
    
    'when we getting labs of specified course (0)': {
      topic: utils.get('/api/course/1/labs'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 1,
            "name": "Lab1",
            "refMark": 10
          },
          {
            "id": 2,
            "name": "Lab2",
            "refMark": 10
          },
          {
            "id": 3,
            "name": "Lab3",
            "refMark": 5
          },
          {
            "id": 4,
            "name": "Lab4",
            "refMark": 20
          }
        ])
      }
    },
    
    'when we getting labs of specified empty course': {
      topic: utils.get('/api/course/2/labs'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [])
      }
    },
    
    'when we getting labs of specified course (1)': {
      topic: utils.get('/api/course/3/labs'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 5,
            "name": "Lab1",
            "refMark": 10
          },
          {
            "id": 6,
            "name": "Lab2",
            "refMark": 7
          },
          {
            "id": 7,
            "name": "Lab3",
            "refMark": 5
          }
        ])
      }
    }
  }
];

module.exports = function(vows) {
  for(var i = 0; i < tests.length; ++i)
    vows.addBatch(tests[i]);
  
  return vows;
}
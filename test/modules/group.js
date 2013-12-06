var utils = require('../utils'),
    assert  = require('assert');

var tests = [
  {
    'when we getting group list': {
      topic: utils.get('/api/group'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 1,
            "name": "SP-11"
          },
          {
            "id": 2,
            "name": "SP-11z"
          },
          {
            "id": 3,
            "name": "SP-12-1"
          },
          {
            "id": 4,
            "name": "SP-12-2"
          }
        ])
      }
    },
    
    'when we getting group info': {
      topic: utils.get('/api/group/1'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, {
          "id": 1,
          "name": "SP-11",
          "isDistanced": 0
        })
      }
    },
    
    'when we getting non-exiting group info': {
      topic: utils.get('/api/group/50'),
      
      'response have 404 NotFound': utils.isNotFound,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, null);
      }
    }
  },
  {
    'when we getting students of specified group': {
      topic: utils.get('/api/group/1/students'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 0,
            "name": "TestStudent1",
            "patronymic": "TestStudent1Patronymic",
            "surname": "TestStudent1Surname"
          },
          {
            "id": 1,
            "name": "TestStudent2",
            "patronymic": "TestStudent2Patronymic",
            "surname": "TestStudent2Surname"
          },
          {
            "id": 2,
            "name": "TestStudent3",
            "patronymic": "TestStudent3Patronymic",
            "surname": "TestStudent3Surname"
          }
        ])
      }
    },
    
    'when we getting students of empty group': {
      topic: utils.get('/api/group/0/students'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [])
      }
    }
  }
]

module.exports = function(vows) {
  for(var i = 0; i < tests.length; ++i)
    vows.addBatch(tests[i]);
  
  return vows;
}
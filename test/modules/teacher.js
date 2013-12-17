var utils = require('../utils'),
    assert  = require('assert');

var tests = [
  {
    'when we getting teachers list': {
      topic: utils.get('/api/teacher'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            id: 1,
            name: 'TestName1',
            surname: 'TestSurname1',
            patronymic: 'TestPatronymic1'
          },
          {
            id: 2,
            name: 'TestName2',
            surname: 'TestSurname2',
            patronymic: 'TestPatronymic2'
          },
          {
            id: 3,
            name: 'TestName3',
            surname: 'TestSurname3',
            patronymic: 'TestPatronymic3'
          }
        ])
      }
    },
    
    'when we getting teacher info': {
      topic: utils.get('/api/teacher/1'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, {
          "id": 1,
          "name": "TestName1",
          "surname": "TestSurname1",
          "patronymic": "TestPatronymic1"
        })
      }
    },
    
    'when we getting non-exist teacher info': {
      topic: utils.get('/api/teacher/50'),
      
      'response have 404 NotFound': utils.isNotFound,
      'have right body': function(err, response, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, null);
      }
    }
  },
  
  {
    'when we getting courses of specified teacher (0)':
    {
      topic: utils.get('/api/teacher/2/courses'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 3,
            "title": "TestCourse3",
            "group": 2,
            "groupName": "SP-11z",
            "quarter": 3
          },
          {
            "id": 4,
            "title": "TestCourse4",
            "group": 3,
            "groupName": "SP-12-1",
            "quarter": 4
          }
        ])
      }
    },
    
    'when we getting courses of specified teacher (1)': {
      topic: utils.get('/api/teacher/1/courses'),
      
      'response have 200 OK': utils.isOk,
      'have right body': function(err, respose, body) {
        var body = JSON.parse(body);
        assert.deepEqual(body, [
          {
            "id": 1,
            "title": "TestCourse1",
            "group": 1,
            "groupName": "SP-11",
            "quarter": 1
          },
          {
            "id": 2,
            "title": "TestCourse2",
            "group": 2,
            "groupName": "SP-11z",
            "quarter": 2
          }
        ])
      }
    },
    
    'when we getting courses of specified teacher which haven\'t courses yet': {
      topic: utils.get('/api/teacher/3/courses'),
      
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
var vows    = require('vows'),
    assert  = require('assert'),
    fs      = require('fs'),
    sqlite3 = require('sqlite3'),
    engine  = require('../js/engine'),
    backend = require('../http_handler'),
    request = require('request');

try {
  fs.unlinkSync('test_db.sqlite');
} catch(e) { }

function isOk(err, response) {
  return function() {
    assert.equal(err, undefined);
    assert.equal(response.statusCode, 200);
  }
}
function get(url) {
  return function() {
    request.get('http://localhost:' + (process.env.PORT || 8080) + url, this.callback);
  }
}

var db = undefined;
var server = undefined;

vows
.describe('Labs Accounting application')
.addBatch({
  'when creating sqlite db': {
    topic: function() {
      db = new sqlite3.Database('test_db.sqlite');
      return db;
    },
  
    'we got a db instance': function (topic) {
      assert.notEqual(topic, undefined);
    }
  }
})
.addBatch({
  'when creating the backend': {
    topic: function() {
      engine.createEngine(db, function(app) {
        server = backend(app);
        this.callback(undefined, server);
      }.bind(this))
    },
    
    'we got a backend instance': function (err, topic) {
      assert.notEqual(topic, undefined);
    }
  }
})
.addBatch({
  'when adding test data': {
    topic: function() {
      var self = this;
      var sql = fs.readFileSync('sql/test_data.sql', { encoding: 'utf-8' });
      
      db.serialize(function() {
        db.exec(sql, function(err) {
          self.callback(err, true);
        })
      })
    },
    
    'we have success': function(err, topic) {
      assert.equal(err, undefined);
      assert.equal(topic, true);
    }
  }
})
.addBatch({
  'when we getting teachers list': {
    topic: get('/api/teacher/'),
    
    'response have 200 OK': isOk,
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
  }
})
.addBatch({
  'when we getting group list': {
    topic: get('/api/group/'),
    
    'response have 200 OK': isOk,
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
  }
})
.addBatch({
  'when we getting students of specified group': {
    topic: get('/api/group/1'),
    
    'response have 200 OK': isOk,
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
    topic: get('/api/group/0'),
    
    'response have 200 OK': isOk,
    'have right body': function(err, respose, body) {
      var body = JSON.parse(body);
      assert.deepEqual(body, [])
    }
  }
})
.addBatch({
  'when we getting courses of specified teacher': {
    topic: get('/api/teacher/2'),
    
    'response have 200 OK': isOk,
    'have right body': function(err, respose, body) {
      var body = JSON.parse(body);
      assert.deepEqual(body, [
        {
          "id": 3,
          "title": "TestCourse3",
          "group": 2,
          "year": 2013
        },
        {
          "id": 4,
          "title": "TestCourse4",
          "group": 3,
          "year": 2014
        }
      ])
    }
  },
  
  'when we getting courses of specified teacher': {
    topic: get('/api/teacher/1'),
    
    'response have 200 OK': isOk,
    'have right body': function(err, respose, body) {
      var body = JSON.parse(body);
      assert.deepEqual(body, [
        {
          "id": 1,
          "title": "TestCourse1",
          "group": 1,
          "year": 2013
        },
        {
          "id": 2,
          "title": "TestCourse2",
          "group": 2,
          "year": 2013
        }
      ])
    }
  },
  
  'when we getting courses of specified teacher which haven\'t courses yet': {
    topic: get('/api/teacher/3'),
    
    'response have 200 OK': isOk,
    'have right body': function(err, respose, body) {
      var body = JSON.parse(body);
      assert.deepEqual(body, [])
    }
  }
})
.addBatch({
  'when we closing test app': {
    'we close the server': function() {
      server.close();
    }
  }
})
.run();
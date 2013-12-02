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
        db.exec(sql, function() {
          self.callback(undefined, true);
        })
      })
    },
    
    'we have success': function(err, topic) {
      assert.equal(topic, true);
    }
  }
})
.addBatch({
  'when we getting teachers list': {
    topic: function() {
      request.get('http://localhost:' + (process.env.PORT || 8080) + '/api/teacher/', this.callback);
    },
    
    'response have 200 OK': function(err, response) {
      assert.equal(err, undefined);
      assert.equal(response.statusCode, 200);
    },
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
  'when we closing test app': {
    'we close the server': function() {
      server.close();
    }
  }
})
.run();
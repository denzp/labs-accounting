var sqlite3 = require('sqlite3'),
    engine  = require('../../js/engine'),
    backend = require('../../http_handler'),
    assert  = require('assert'),
    fs      = require('fs');

var db,
    callback_;

var tests = [
  {
    'when creating sqlite db': {
      topic: new sqlite3.Database('test_db.sqlite'),
    
      'we got a db instance': function (topic) {
        db = topic;
        assert.notEqual(topic, undefined);
      }
    }
  },
  {
    'when creating the backend': {
      topic: function() {
        engine.createEngine(db, function(app) {
          server = backend(app);
          callback_(server);
          this.callback(undefined, server);
        }.bind(this))
      },
      
      'we got a backend instance': function (err, topic) {
        assert.notEqual(topic, undefined);
      }
    }
  },
  {
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
  }
];

module.exports = function(vows, callback) {
  callback_ = callback;
  
  for(var i = 0; i < tests.length; ++i)
    vows.addBatch(tests[i]);
  
  return vows;
}
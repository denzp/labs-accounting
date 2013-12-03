var fs = require('fs');

var checkTables = function(db, callback) {
  db.serialize(function() {
    db.get('SELECT "name" FROM "sqlite_master" WHERE "type"="table" AND "name"="Teachers";', function(err, data) {
      if(data === undefined)
        createTables(db, callback);
      else
        callback();
    })
  })
}
var createTables = function(db, callback) {
  db.serialize(function() {
    var sql = fs.readFileSync('sql/prepare.sql', { encoding: 'utf-8' });
    db.exec(sql, function() {
      callback();
    })
  })
}

function Engine(db) {
  this.db = db;
}

//inheriance
require('./teacher').mixin(Engine);
require('./group').mixin(Engine);
require('./course').mixin(Engine);
require('./auth').mixin(Engine);

module.exports.createEngine = function(db, callback) {
  checkTables(db, function() {
    callback(new Engine(db));
  })
}
var fs = require('fs');

var checkTables = function(db) {
  db.serialize(function() {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Teachers';", function(err, data) {
      if(data === undefined) createTables(db);
    })
  })
}
var createTables = function(db) {
  var text = fs.readFileSync('sql/prepare.sql', { encoding: 'utf-8' });
  
  db.serialize(function() {
    db.exec(text);
  })
}

module.exports.createEngine = function(db) {
  checkTables(db);
  
  //TODO
  return undefined;
}
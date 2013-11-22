var sqlite3 = require('sqlite3').verbose(),
    fs      = require('fs'),
    engine  = require('./js/engine');

var db = new sqlite3.Database('db.sqlite');

engine.createEngine(db, function(app) {
  db.serialize(function() {
    var sql = fs.readFileSync('sql/test.sql', { encoding: 'utf-8' });
    db.exec(sql);
  })
})
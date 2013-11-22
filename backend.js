var express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    engine  = require('./js/engine.js');

var db = new sqlite3.Database('db.sqlite');
var app = engine.createEngine(db);

express()

.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
})

.use(express.static(__dirname + '/public'))
.listen(8080);
console.log('Listening on port 8080');
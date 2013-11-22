var express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    engine  = require('./js/engine');

var db = new sqlite3.Database('db.sqlite');

engine.createEngine(db, function(app) {
  //http server
  express()
  
  .get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
  })
  
  .get('/teacher', function(req, res) {
    app.getAllTeachers(res);
  })
  /*.get('/teacher/:id', function(req, res) {
    app.getTeacherCourses(req.params.id, res);
  })*/
  
  .get('/group', function(req, res) {
    app.getAllGroups(res);
  })
  /*.get('/group/:id', function(req, res) {
    app.getGroupStudents(res);
  })*/
  
  .use(express.static(__dirname + '/public'))
  .listen(8080);
  
  console.log('Listening on port 8080');
})
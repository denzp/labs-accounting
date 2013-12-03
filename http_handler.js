var express = require('express');

module.exports = function(app) {
  return express()
  .use(express.json())
  
  .get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
  })
  
  .get('/api/teacher', function(req, res) {
    app.getAllTeachers(function(data) {
      res.json(data);
    });
  })
  .get('/api/teacher/:id', function(req, res) {
    app.getTeacherCourses(req.params.id, function(data) {
      res.json(data);
    });
  })
  
  .get('/api/course/:id', function(req, res) {
    app.getCourseLabs(req.params.id, function(data) {
      res.json(data);
    });
  })
  
  .get('/api/group', function(req, res) {
    app.getAllGroups(function(data) {
      res.json(data);
    });
  })
  .get('/api/group/:id', function(req, res) {
    app.getGroupStudents(req.params.id, function(data) {
      res.json(data);
    });
  })
  
  .post('/api/auth', function(req, res) {
    app.performLogin(req.body.login, req.body.hash, req.connection.remoteAddress, function(data) {
      res.json(data);
    });
  })
  .post('/api/auth/check', function(req, res) {
    app.checkAuthorization(req.body.login, req.body.pubkey, function(data) {
      res.json(data);
    });
  })
  
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8080);
}
var express = require('express');

module.exports = function(app) {
  //http server
  var server = express()
  
  .get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
  })
  
  .get('/api/teacher/', function(req, res) {
    app.getAllTeachers(function(data) {
      res.json(data);
    });
  })
  /*.get('/api/teacher/:id', function(req, res) {
    app.getTeacherCourses(req.params.id, function(data) {
      res.json(data);
    });
  })*/
  
  .get('/api/group/', function(req, res) {
    app.getAllGroups(function(data) {
      res.json(data);
    });
  })
  /*.get('/api/group/:id', function(req, res) {
    app.getGroupStudents(id, function(data) {
      res.json(data);
    });
  })*/
  
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8080);
  
  return server;
}
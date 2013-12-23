var express = require('express');

module.exports = function(app) {
  return express()
  .use(express.json())
  
  .get('/', function(req, res){
    res.sendfile(__dirname + '/public/index.html');
  })
  
  .get('/api/teacher', function(req, res) {
    app.getAllTeachers(function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/teacher/:id', function(req, res) {
    app.getTeacherInfo(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/teacher/:id/courses', function(req, res) {
    app.getTeacherCourses(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .get('/api/course/:id', function(req, res) {
    app.getCourseInfo(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/course/:id/labs', function(req, res) {
    app.getCourseLabs(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/course/:id/students', function(req, res) {
    app.getCourseStudents(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .get('/api/group', function(req, res) {
    app.getAllGroups(function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/group/:id', function(req, res) {
    app.getGroupInfo(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/group/:id/courses', function(req, res) {
    app.getGroupCourses(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .get('/api/group/:id/students', function(req, res) {
    app.getGroupStudents(req.params.id, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .post('/api/auth', function(req, res) {
    app.performLogin(req.body.login, req.body.hash, req.connection.remoteAddress, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/auth/check', function(req, res) {
    app.checkAuthorization(req.body.login, req.body.pubkey, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .post('/api/teacher/full', function(req, res) {
    app.getAllTeachersFullInfo(req.body.login, req.body.pubkey, req.connection.remoteAddress, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/teacher/add', function(req, res) {
    app.addNewTeacher(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/teacher/delete', function(req, res) {
    app.deleteTeacher(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/teacher/edit', function(req, res) {
    app.editTeacher(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .post('/api/group/edit', function(req, res) {
    app.editGroup(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/group/add', function(req, res) {
    app.addNewGroup(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/group/delete', function(req, res) {
    app.deleteGroup(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .post('/api/student/add', function(req, res) {
    app.addNewStudent(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/student/edit', function(req, res) {
    app.editStudent(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  .post('/api/student/delete', function(req, res) {
    app.deleteStudent(req.body.login, req.body.pubkey, req.connection.remoteAddress, req.body.data, function(code, data) {
      res.json(code || 200, data);
    });
  })
  
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8080);
}
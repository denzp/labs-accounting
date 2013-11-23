var tester  = require('./helper')(),
    sqlite3 = require('sqlite3').verbose(),
    engine  = require('../js/engine'),
    fs      = require('fs'),
    assert  = require('assert');

var app,
    db;

tester
.test('engine creation', function(next) {
  db = new sqlite3.Database('test_db.sqlite');
  
  engine.createEngine(db, function(newApp) {
    app = newApp;
    if(!app)
      return next('app is undefined!');
    
    next();
  })
})
.test('db fill', function(next) {
  db.serialize(function() {
    try {
      var sql = fs.readFileSync('sql/test_data.sql', { encoding: 'utf-8' });
      db.exec(sql, function() {
        next();
      })
    } catch(e) {
      next(e.message);
    }
  })
})
.test('teachers', function(next) {
  app.getAllTeachers(function(data) {
    try {
      assert.deepEqual(data, [
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
      ], 'getAllTeachers not equals reference value!');
    } catch(e) {
      return next(e.message);
    }
    
    next();
  })
})

module.exports = tester;
function MarksHelper() { }

MarksHelper.prototype.getMarks = function(courseId, callback) {
  var query = [
    'SELECT m.* FROM "Marks" m',
    'INNER JOIN "Labs" l on m."lab" = l."id"',
    'WHERE l."course" = ' + courseId + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.prototype.getTestMarks = function(courseId, callback) {
  var query = [
    'SELECT m.* FROM "TestMarks" m',
    'INNER JOIN "Tests" t on m."test" = t."id"',
    'WHERE t."course" = ' + courseId + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}


MarksHelper.prototype.setMark = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var self = this;
  
  var sql = 'SELECT COUNT(*) as r FROM "Marks" WHERE "lab"=' + data.lab + ' AND "student"=' + data.student + ';';
  self.db.get(sql, function(err, res) {
    if(err)
      throw err;
    
    if(res.r != 0) {
      // exist mark
      var sql = [
        'UPDATE "Marks"',
        'SET "weight"=' + data.weight,
        'WHERE "lab"=' + data.lab + ' AND "student"=' + data.student + ';'
      ];
      
      self.db.exec(sql.join(' '), function(err) {
        if(err)
          throw err;
        
        callback(200, data);
      })
    } else {
      // new mark
      var sql = [
        'INSERT INTO "Marks" ("student", "weight", "lab")',
        'VALUES (' + data.student + ', ' + data.weight + ', ' + data.lab + ');'
      ];
      
      self.db.exec(sql.join(' '), function(err) {
        if(err)
          throw err;
        
        callback(200, data);
      })
    }
  })
}

MarksHelper.prototype.setTestMark = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var self = this;
  
  var sql = 'SELECT COUNT(*) as r FROM "TestMarks" WHERE "test"=' + data.test + ' AND "student"=' + data.student + ';';
  self.db.get(sql, function(err, res) {
    if(err)
      throw err;
    
    if(res.r != 0) {
      // exist mark
      var sql = [
        'UPDATE "TestMarks"',
        'SET "count"=' + data.count,
        'WHERE "test"=' + data.test + ' AND "student"=' + data.student + ';'
      ];
      
      self.db.exec(sql.join(' '), function(err) {
        if(err)
          throw err;
        
        callback(200, data);
      })
    } else {
      // new mark
      var sql = [
        'INSERT INTO "TestMarks" ("student", "count", "test")',
        'VALUES (' + data.student + ', ' + data.count + ', ' + data.test + ');'
      ];
      
      self.db.exec(sql.join(' '), function(err) {
        if(err)
          throw err;
        
        callback(200, data);
      })
    }
  })
}

MarksHelper.prototype.addLab = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'INSERT INTO "Labs" ("course", "refMark", "name")',
    'VALUES (' + data.course + ',' + data.refMark + ',"' + data.name + '");'
  ];
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    this.db.all('SELECT * FROM "Labs" WHERE "name"="' + data.name + '" ORDER BY "id" DESC;', function(err, data) {
      if(err)
        throw err;
      
      callback(200, data);
    })
  }.bind(this))
}

MarksHelper.prototype.deleteLab = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  this.db.exec('DELETE FROM "Labs" WHERE "id"=' + data.id + ';', function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.prototype.editLab = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = ['UPDATE "Labs" SET']
  
  if(data.refMark)
    query.push('"refMark"="' + data.refMark + '"');
  if(data.name)
    query.push('"name"="' + data.name + '"');

  query.push('WHERE "id"=' + data.id + ';');
  
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.prototype.editTest = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'UPDATE "Tests" SET',
    '"name"="' + data.name + '"',
    'WHERE "id"=' + data.id + ';'
  ];
  
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.prototype.addTest = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'INSERT INTO "Tests" ("course", "name")',
    'VALUES (' + data.course + ',"' + data.name + '");'
  ];
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    this.db.all('SELECT * FROM "Tests" WHERE "name"="' + data.name + '" ORDER BY "id" DESC;', function(err, data) {
      if(err)
        throw err;
      
      callback(200, data);
    })
  }.bind(this))
}

MarksHelper.prototype.deleteTest = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  this.db.exec('DELETE FROM "Tests" WHERE "id"=' + data.id + ';', function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.mixin = function(destObject){
  Object.keys(MarksHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = MarksHelper.prototype[property];
  });
}
module.exports = MarksHelper;
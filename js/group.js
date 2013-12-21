function GroupHelper() { }

GroupHelper.prototype.getAllGroups = function(callback) {
  this.db.all('SELECT "id", "name", "isDistanced" FROM "Groups";', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.getGroupInfo = function(id, callback) {
  this.db.all('SELECT "id", "name", "isDistanced" FROM "Groups" WHERE "id"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(404, null);
    
    callback(200, data[0]);
  })
}

GroupHelper.prototype.getGroupCourses = function(id, callback) {
  this.db.all('SELECT "id", "title", "quarter" FROM "Course" WHERE "group"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.getGroupStudents = function(id, callback) {
  this.db.all('SELECT "id", "name", "patronymic", "surname" FROM "Students" WHERE "group"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.addNewStudent = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'INSERT INTO "Students" ("name", "patronymic", "surname", "group")',
    'VALUES ("' + data.name + '", "' + data.patronymic + '", "' + data.surname + '", ' + data.group + ');'
  ];
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    this.db.all('SELECT * FROM "Students" WHERE "name"="' + data.name + '" AND "surname"="' + data.surname + '" AND "group"=' + data.group + ' ORDER BY "id" DESC;', function(err, data) {
      if(err)
        throw err;
      
      callback(200, data);
    })
  }.bind(this))
}

GroupHelper.prototype.addNewGroup = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'INSERT INTO "Groups" ("name", "isDistanced")',
    'VALUES ("' + data.name + '", ' + data.isDistanced + ');'
  ];
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    this.db.all('SELECT * FROM "Groups" WHERE "name"="' + data.name + '" AND "isDistanced"=' + data.isDistanced + ' ORDER BY "id" DESC;', function(err, data) {
      if(err)
        throw err;
      
      callback(200, data);
    })
  }.bind(this))
}

GroupHelper.prototype.deleteGroup = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  this.db.exec('DELETE FROM "Groups" WHERE "id"=' + data.id + ';', function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.editGroup = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = ['UPDATE "Groups" SET']
  
  if(data.name)
    query.push('"name"="' + data.name + '"');
  if(data.isDistanced)
    query.push('"isDistanced"=' + data.isDistanced);
  
  query.push('WHERE "id"=' + data.id + ';');
  
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.editStudent = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = ['UPDATE "Students" SET']
  
  if(data.name)
    query.push('"name"="' + data.name + '"');
  if(data.surname)
    query.push('"surname"="' + data.surname + '"');
  if(data.patronymic)
    query.push('"patronymic"="' + data.patronymic + '"');
  
  query.push('WHERE "id"=' + data.id + ';');
  
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.prototype.deleteStudent = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  this.db.exec('DELETE FROM "Students" WHERE "id"=' + data.id + ';', function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

GroupHelper.mixin = function(destObject){
  Object.keys(GroupHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = GroupHelper.prototype[property];
  });
}
module.exports = GroupHelper;
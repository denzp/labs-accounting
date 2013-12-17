function GroupHelper() { }

GroupHelper.prototype.getAllGroups = function(callback) {
  this.db.all('SELECT "id", "name" FROM "Groups";', function(err, data) {
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

GroupHelper.mixin = function(destObject){
  Object.keys(GroupHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = GroupHelper.prototype[property];
  });
}
module.exports = GroupHelper;
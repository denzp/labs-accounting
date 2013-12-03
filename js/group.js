function GroupHelper() { }

GroupHelper.prototype.getAllGroups = function(callback) {
  this.db.all('SELECT "id", "name" FROM "Groups";', function(err, data) {
    if(err)
      throw err;
    
    callback(data);
  })
}

GroupHelper.prototype.getGroupStudents = function(id, callback) {
  this.db.all('SELECT "id", "name", "patronymic", "surname" FROM "Students" WHERE "group"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(data);
  })
}

GroupHelper.mixin = function(destObject){
  Object.keys(GroupHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = GroupHelper.prototype[property];
  });
}
module.exports = GroupHelper;
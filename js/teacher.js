function TeacherHelper() { }

TeacherHelper.prototype.getAllTeachers = function(callback) {
  this.db.all('SELECT "id", "name", "surname", "patronymic" FROM "Teachers";', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

TeacherHelper.prototype.getTeacherInfo = function(id, callback) {
  this.db.all('SELECT "id", "name", "surname", "patronymic" FROM "Teachers" WHERE "id"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(404, null);
    
    callback(200, data[0]);
  })
}

TeacherHelper.prototype.getTeacherCourses = function(id, callback) {
  var query = [
    'SELECT c."id", "title", "group", g."name" as "groupName", "year" FROM "Course" c',
    'LEFT JOIN "Groups" g on g."id" = c."group"',
    'WHERE c."teacher"=' + id + ';'
  ];
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

TeacherHelper.mixin = function(destObject){
  Object.keys(TeacherHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = TeacherHelper.prototype[property];
  });
}
module.exports = TeacherHelper;
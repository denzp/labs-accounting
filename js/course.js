function CourseHelper() { }

CourseHelper.prototype.getCourseLabs = function(id, callback) {
  this.db.all('SELECT "id", "name", "refMark" FROM "Labs" WHERE "course"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

CourseHelper.prototype.getCourseInfo = function(id, callback) {
  var query = [
    'SELECT c."id", "title", "group", g."name" as "groupName", "quarter" FROM "Course" c',
    'LEFT JOIN "Groups" g on g."id" = c."group"',
    'WHERE c."id"=' + id + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(404, null);
    
    callback(200, data[0]);
  })
}

CourseHelper.prototype.getCourseStudents = function(id, callback) {
  var query = [
    'SELECT s."id", s."name", s."patronymic", s."surname" FROM "Course" c',
    'LEFT JOIN "Students" s on s."group" = c."group"',
    'WHERE c."id"=' + id + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(404, null);
    
    callback(200, data);
  })
}

CourseHelper.mixin = function(destObject){
  Object.keys(CourseHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = CourseHelper.prototype[property];
  });
}
module.exports = CourseHelper;
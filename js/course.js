function CourseHelper() { }

CourseHelper.prototype.getCourseLabs = function(id, callback) {
  this.db.all('SELECT "id", "name", "refMark" FROM "Labs" WHERE "course"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

CourseHelper.prototype.getCourseInfo = function(id, callback) {
  this.db.all('SELECT "id", "title", "group", "year" FROM "Course" WHERE "id"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(404, null);
    
    callback(200, data[0]);
  })
}

CourseHelper.mixin = function(destObject){
  Object.keys(CourseHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = CourseHelper.prototype[property];
  });
}
module.exports = CourseHelper;
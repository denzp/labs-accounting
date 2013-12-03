function CourseHelper() { }

CourseHelper.prototype.getCourseLabs = function(id, callback) {
  this.db.all('SELECT "id", "name", "refMark" FROM "Labs" WHERE "course"=' + id + ';', function(err, data) {
    if(err)
      throw err;
    
    callback(data);
  })
}

CourseHelper.mixin = function(destObject){
  Object.keys(CourseHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = CourseHelper.prototype[property];
  });
}
module.exports = CourseHelper;
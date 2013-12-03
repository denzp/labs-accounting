function TeacherHelper() { +330}

TeacherHelper.prototype.getAllTeachers = function(callback) {
  this.db.all("SELECT id, name, surname, patronymic FROM 'Teachers';", function(err, data) {
    if(err)
      throw err;
    
    callback(data);
  })
}

TeacherHelper.prototype.getTeacherCourses = function(id, callback) {
  this.db.all("SELECT id, title, \"group\", year FROM 'Course' WHERE \"teacher\"=" + id + ";", function(err, data) {
    if(err)
      throw err;
    
    callback(data);
  })
}

TeacherHelper.mixin = function(destObject){
  Object.keys(TeacherHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = TeacherHelper.prototype[property];
  });
}
module.exports = TeacherHelper;
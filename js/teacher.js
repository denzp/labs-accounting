function TeacherHelper() { }

TeacherHelper.prototype.getAllTeachers = function(res) {
  this.db.all("SELECT id, name, surname, patronymic FROM 'Teachers';", function(err, data) {
    if(err)
      throw err;
    
    res.json(data);
  })
}

TeacherHelper.mixin = function(destObject){
  Object.keys(TeacherHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = TeacherHelper.prototype[property];
  });
}
module.exports = TeacherHelper;
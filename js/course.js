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
    'SELECT c."id", "title", "group", g."name" as "groupName", "quarter", t."id" as "teacher" FROM "Course" c',
    'INNER JOIN "Groups" g on g."id" = c."group"',
    'INNER JOIN "Teachers" t on t."id" = c."teacher"',
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
    'INNER JOIN "Students" s on s."group" = c."group"',
    'WHERE c."id"=' + id + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    if(data.length == 0)
      return callback(200, []);
    
    callback(200, data);
  })
}

CourseHelper.prototype.addCourse = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = [
    'INSERT INTO "Course" ("teacher", "title", "group", "quarter")',
    'VALUES (' + data.teacher + ', "' + data.title + '", ' + data.group + ', ' + data.quarter +');'
  ];
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    this.db.all('SELECT * FROM "Course" WHERE "title"="' + data.title + '" ORDER BY "id" DESC;', function(err, data) {
      if(err)
        throw err;
      
      callback(200, data);
    })
  }.bind(this))
}

CourseHelper.prototype.deleteCourse = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  this.db.exec('DELETE FROM "Course" WHERE "id"=' + data.id + ';', function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

CourseHelper.prototype.editCourse = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  var query = ['UPDATE "Course" SET']
  
  if(data.title)
    query.push('"title"="' + data.title + '"');
  if(data.group)
    query.push('"group"="' + data.group + '"');
  if(data.quarter)
    query.push('"quarter"="' + data.quarter + '"');
    
  query.push('WHERE "id"=' + data.id + ';');
  
  this.db.exec(query.join(' '), function(err) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}


CourseHelper.mixin = function(destObject){
  Object.keys(CourseHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = CourseHelper.prototype[property];
  });
}
module.exports = CourseHelper;
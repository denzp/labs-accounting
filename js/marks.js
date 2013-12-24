function MarksHelper() { }

MarksHelper.prototype.getMarks = function(courseId, callback) {
  var query = [
    'SELECT m.* FROM "Marks" m',
    'INNER JOIN "Labs" l on m."lab" = l."id"',
    'WHERE l."course" = ' + courseId + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}

MarksHelper.prototype.getTestMarks = function(courseId, callback) {
  var query = [
    'SELECT m.* FROM "TestMarks" m',
    'INNER JOIN "Tests" t on m."test" = t."id"',
    'WHERE t."course" = ' + courseId + ';'
  ];
  
  this.db.all(query.join(' '), function(err, data) {
    if(err)
      throw err;
    
    callback(200, data);
  })
}


MarksHelper.prototype.setMark = function(login, pubkey, ip, data, callback) {
  // TODO -- security check!
  
  
}

MarksHelper.mixin = function(destObject){
  Object.keys(MarksHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = MarksHelper.prototype[property];
  });
}
module.exports = MarksHelper;
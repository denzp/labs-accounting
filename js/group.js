function GroupHelper() { }

GroupHelper.prototype.getAllGroups = function(res) {
  this.db.all("SELECT id, name FROM 'Groups';", function(err, data) {
    if(err)
      throw err;
    
    res.json(data);
  })
}

GroupHelper.mixin = function(destObject){
  Object.keys(GroupHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = GroupHelper.prototype[property];
  });
}
module.exports = GroupHelper;
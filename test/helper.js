var async = require('async');

function TestHelper() {
  if(!(this instanceof TestHelper))
    return new TestHelper();
  
  this.tests = [];
  this.failedCount = 0;
}

TestHelper.prototype.test = function(name, callback) {
  var self = this;
  
  this.tests.push(function(next) {
    try {
      callback(function(err) {
        if(err !== undefined) {
          console.error('!FAIL "' + name + '":');
          console.error(err + '\n');
          ++self.failedCount;
        }
        else
          console.log('OK "' + name + '"');
        
        next();
      })
    } catch(e) {
      console.error('!FAIL "' + name + '":');
      console.error(e.message + '\n');
      ++self.failedCount;
      
      next();
    }
  })
  
  return this;
}

TestHelper.prototype.invoke = function(test) {
  async.waterfall(this.tests, function(err) {
    console.log('\n-----------------------------------');
    console.log('testing done!');
    console.log('ok tests: ' + Math.round(100 - this.failedCount /  this.tests.length * 100) + '%');
    console.log('failed tests: ' + Math.round(this.failedCount /  this.tests.length * 100) + '%');
  }.bind(this))
}

module.exports = TestHelper;
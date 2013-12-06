var request = require('request'),
    assert  = require('assert');

module.exports.isOk = function isOk(err, response) {
  assert.equal(err, undefined);
  assert.equal(response.statusCode, 200);
}
module.exports.isNotFound = function isNotFound(err, response) {
  assert.equal(err, undefined);
  assert.equal(response.statusCode, 404);
}
module.exports.isError = function isError(err, response) {
  assert.equal(err, undefined);
  assert.equal(response.statusCode, 500);
}

module.exports.get = function get(url) {
  return function() {
    request.get('http://localhost:' + (process.env.PORT || 8080) + url, this.callback);
  }
}
module.exports.post = function post(url, data) {
  return function() {
    request.post('http://localhost:' + (process.env.PORT || 8080) + url, {
      json: data
    }, this.callback);
  }
}
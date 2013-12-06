var crypto  = require('crypto'),
    async   = require('async');

function AuthorizationHelper() { }

AuthorizationHelper.prototype.performLogin = function(login, hash, origin, callback) {
  var error = function(msg) {
    return callback(500, { 'auth': false, 'error': msg });
  }
  
  if(!login && !hash) return error('Empty request!');
  if(!hash) return error('No `hash` specified!');
  if(!login) return error('No `login` specified!');
  
  login = login.replace(/[^\w]+/, '');
  hash  = hash.replace(/[^\w]+/, '');
  
  var self = this;
  this.db.all('SELECT "id" FROM "Teachers" WHERE "login"="' + login + '" AND "hash"="' + hash + '";', function(err, data) {
    if(err) throw err;
    if(data.length != 1) return error('Authorization failed!');
    
    async.waterfall([
      // getting originHash
      function(done) {
        crypto.pbkdf2(origin, '', 50, 8, done);
      },
      
      // storing originHash
      function(originHash, done) {
        var query = 'UPDATE "Teachers" SET "originHash"="' + originHash.toString('hex') + '" WHERE "id"=' + data[0].id + ';';
        self.db.exec(query, function(err) {
          done(err, originHash);
        })
      },
      
      // getting pubkey
      function(originHash, done) {
        crypto.pbkdf2(hash, originHash.toString('hex'), 50, 32, done);
      }
    ], function(err, pubkey) {
      if(err) throw err;
      
      callback(200, {
        'auth': true,
        'id': data[0].id,
        'pubkey': pubkey.toString('hex')
      })
    })
  })
}

AuthorizationHelper.prototype.checkAuthorization = function(login, pubkey, callback) {
  var error = function(msg) {
    return callback(500, { 'auth': false });
  }
  
  if(!login && !pubkey) return error();
  if(!pubkey) return error();
  if(!login) return error();
  
  login = login.replace(/[^\w]+/, '');
  pubkey = pubkey.replace(/[^0-9a-f]+/, '');
  
  if(pubkey.length != 64) return error();
  
  var query = 'SELECT "id", "hash", "originHash" FROM "Teachers" WHERE "login"="' + login + '";';
  this.db.all(query, function(err, data) {
    if(err) throw err;
    if(data.length != 1) return error();
    
    crypto.pbkdf2(data[0].hash, data[0].originHash, 50, 32, function(err, refPubkey) {
      if(err) throw err;
      
      if(refPubkey.toString('hex') == pubkey)
         callback(200, {
          'auth': true,
          'id': data[0].id
        })
      else
        error();
    })
    
  })
}

AuthorizationHelper.mixin = function(destObject){
  Object.keys(AuthorizationHelper.prototype).forEach(function(property) {
    destObject.prototype[property] = AuthorizationHelper.prototype[property];
  });
}
module.exports = AuthorizationHelper;
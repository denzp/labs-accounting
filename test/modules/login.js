var utils = require('../utils'),
    assert  = require('assert');

var tests = [
  {
    'when we trying to authorize with right credentials': {
      topic: utils.post('/api/auth', {
        login: 'test1',
        hash: 'test1SecretPw',
      }),
      
      'response have 200 OK': utils.isOk,
      'we should successfully login': function(err, response, body) {
        assert.equal(body.error, undefined);
        assert.equal(body.id, 2);
        assert.equal(body.pubkey.length, 64);
        assert.equal(body.auth, true);
      }
    },
    
    'when we trying to authorize with wrong credentials': {
      topic: utils.post('/api/auth', {
        login: 'test1',
        hash: 'testSecretPw',
      }),
      
      'response have 500 Error': utils.isError,
      'we shouldn\'t login': function(err, response, body) {
        assert.equal(body.id, undefined);
        assert.equal(body.pubkey, undefined);
        assert.equal(body.error, 'Authorization failed!');
        assert.equal(body.auth, false);
      }
    },
    
    'when we trying to authorize with no `login` field': {
      topic: utils.post('/api/auth', {
        hash: 'testSecretPw',
      }),
      
      'response have 500 Error': utils.isError,
      'we shouldn\'t login': function(err, response, body) {
        assert.equal(body.id, undefined);
        assert.equal(body.pubkey, undefined);
        assert.equal(body.error, 'No `login` specified!');
        assert.equal(body.auth, false);
      }
    },
    
    'when we trying to authorize with no `hash` field': {
      topic: utils.post('/api/auth', {
        login: 'test1',
      }),
      
      'response have 500 Error': utils.isError,
      'we shouldn\'t login': function(err, response, body) {
        assert.equal(body.id, undefined);
        assert.equal(body.pubkey, undefined);
        assert.equal(body.error, 'No `hash` specified!');
        assert.equal(body.auth, false);
      }
    },
    
    'when we trying to authorize with no credentials': {
      topic: utils.post('/api/auth', { }),
      
      'response have 500 Error': utils.isError,
      'we shouldn\'t login': function(err, response, body) {
        assert.equal(body.id, undefined);
        assert.equal(body.pubkey, undefined);
        assert.equal(body.error, 'Empty request!');
        assert.equal(body.auth, false);
      }
    }
  },{
    'when we authorizing': {
      topic: utils.post('/api/auth', {
        login: 'test1',
        hash: 'test1SecretPw',
      }),
      
      'and then we checking right `pubkey`': {
        topic: function(_1, auth) {
          utils.post('/api/auth/check', {
            login: 'test1',
            pubkey: auth.pubkey,
          }).call(this);
        },
        
        'response have 200 OK': utils.isOk,
        'it should be ok': function(err, response, body) {
          assert.equal(body.id, 2);
          assert.equal(body.auth, true);
        }
      },
      
      'and then we checking wrong `pubkey`': {
        topic: function(_1, auth) {
          utils.post('/api/auth/check', {
            login: 'test1',
            pubkey: auth.pubkey.substr(1) + 'f',
          }).call(this);
        },
        
        'response have 500 Error': utils.isError,
        'it should be ok': function(err, response, body) {
          assert.equal(body.id, undefined);
          assert.equal(body.auth, false);
        }
      },
      
      'and then we checking wrong `login`': {
        topic: function(_1, auth) {
          utils.post('/api/auth/check', {
            login: 'test2',
            pubkey: auth.pubkey,
          }).call(this);
        },
        
        'response have 500 Error': utils.isError,
        'it should be ok': function(err, response, body) {
          assert.equal(body.id, undefined);
          assert.equal(body.auth, false);
        }
      },
      
      'and then we checking no `login` field': {
        topic: function(_1, auth) {
          utils.post('/api/auth/check', {
            pubkey: auth.pubkey,
          }).call(this);
        },
        
        'response have 500 Error': utils.isError,
        'it should be ok': function(err, response, body) {
          assert.equal(body.id, undefined);
          assert.equal(body.auth, false);
        }
      },
      
      'and then we checking no `pubkey` field': {
        topic: function(_1, auth) {
          utils.post('/api/auth/check', {
            login: 'test1'
          }).call(this);
        },
        
        'response have 500 Error': utils.isError,
        'it should be ok': function(err, response, body) {
          assert.equal(body.id, undefined);
          assert.equal(body.auth, false);
        }
      }
    }
  }
]

module.exports = function(vows) {
  for(var i = 0; i < tests.length; ++i)
    vows.addBatch(tests[i]);
  
  return vows;
}
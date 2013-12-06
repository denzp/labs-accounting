var vows    = require('vows'),
    fs      = require('fs');

try {
  fs.unlinkSync('test_db.sqlite');
} catch(e) { }

var server = undefined;

var instance = vows
  .describe('Labs Accounting application');

instance = require('./modules/db')(instance, function(serverInstance) {
  server = serverInstance;
});

instance = require('./modules/teacher')(instance);
instance = require('./modules/group')(instance);
instance = require('./modules/course')(instance);
instance = require('./modules/login')(instance);

instance.addBatch({
  'when we closing test app': {
    'we close the server': function() {
      server.close();
    }
  }
})
.run();
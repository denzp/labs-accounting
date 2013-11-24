var fs        = require('fs');

try {
  fs.unlinkSync('test_db.sqlite');
} catch(e) { }

require('./tests.js').invoke();

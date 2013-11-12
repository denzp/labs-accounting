var express = require('express');

express()

.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
})

.use(express.static(__dirname + '/public'))

.listen(8080);

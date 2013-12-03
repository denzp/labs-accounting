var express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    engine  = require('./js/engine');

var db = new sqlite3.Database('test_db.sqlite');
engine.createEngine(db, require('./http_handler'));
'use strict';

var jsonServer = require('json-server');
var gutil = require('gulp-util');

module.exports = function(options) {
  var server = jsonServer.create();
  var router = jsonServer.router(options.router);
  server.use(jsonServer.defaults);
  server.use(router);
  server.listen(options.port);
  gutil.log('JSON server started at', gutil.colors.cyan('http://localhost:' + options.port));
};

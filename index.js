'use strict';

var jsonServer = require('json-server');
var gutil = require('gulp-util');

module.exports = function(options) {
	if (!options) {
		throw new gutil.PluginError('gulp-json-server', 'Missing options.');
	}
	var server = jsonServer.create();
	var router = jsonServer.router(options.source);
	server.use(jsonServer.defaults);
	server.use(router);
	server.listen(options.port, options.hostname);
	gutil.log('JSON server started at', gutil.colors.cyan('http://' + options.hostname + ':' + options.port));
};

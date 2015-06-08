'use strict';

var jsonServer = require('json-server');
var gutil = require('gulp-util');
var extend = require('extend-shallow');

module.exports = function(options) {
	if (!options) {
		throw new gutil.PluginError('gulp-json-server', 'Missing options.');
	}
	if (!options.source) {
		throw new gutil.PluginError('gulp-json-server', 'Missing source option.');
	}
	options = extend({
		hostname: 'localhost',
		port: 3000
	}, options);
	var server = jsonServer.create();
	server.use(jsonServer.defaults)
		.use(jsonServer.router(options.source))
		.listen(options.port, options.hostname)
		.on('listening', function() {
			gutil.log('JSON server started at', gutil.colors.cyan('http://' + options.hostname + ':' + options.port));
		})
		.on('error', function(err) {
			if (err.code === 'EADDRINUSE') {
				throw new gutil.PluginError('gulp-json-server', 'Port ' + options.port + ' is already in use by another process.');
			} else {
				throw new gutil.PluginError('gulp-json-server', err);
			}
		});
};

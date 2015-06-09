'use strict';

var extend = require('extend-shallow');
var gutil = require('gulp-util');
var jsonServer = require('json-server');
var through = require('through2');

module.exports = function(options) {

	options = extend({
		hostname: 'localhost',
		port: 3000
	}, (options || {}));

	var stream = through.obj(function(file, enc, callback) {

		var server = jsonServer.create();

		server.use(jsonServer.defaults)
			.use(jsonServer.router(file.path))
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

		this.push(file);
		callback();
	});

	return stream;
};

'use strict';

var extend = require('extend-shallow');
var fs = require('fs');
var gutil = require('gulp-util');
var jsonServer = require('json-server');
var through = require('through2');

module.exports = function(options) {

	options = extend({
		hostname: 'localhost',
		port: 3000,
		watch: false
	}, (options || {}));

	var stream = through.obj(function(file, enc, callback) {

		var server = jsonServer.create();
		var router = jsonServer.router(file.path);

		if (options.watch) {
			fs.watch(file.path, function (event, changedFile) {
				if (event === 'change') {
					gutil.log(gutil.colors.magenta(file.path), 'has changed, reloading json-server database');
					try {
						router.db.object = JSON.parse(fs.readFileSync(file.path));
					} catch (err) {
						gutil.log('Unable to parse', gutil.colors.magenta(file.path));
						gutil.log(err);
					}
				}
			});
			gutil.log('Watching', gutil.colors.magenta(file.path));
	  }

		server.use(jsonServer.defaults)
			.use(router)
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

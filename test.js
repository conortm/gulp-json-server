'use strict';

var request = require('supertest');
var jsonServer = require('./');
var File = require('gulp-util').File;

describe('gulp-json-server', function() {

	var stream;

	var dbFile = new File({
		path: __dirname + '/fixtures/db.json'
	});

	afterEach(function() {
		stream.emit('kill');
	});

	it('should work with default options', function(done) {

		stream = jsonServer();

		stream.write(dbFile);

		request('http://localhost:3000')
			.get('/posts/1')
			.expect(200, '{\n  "id": 1,\n  "title": "json-server",\n  "author": "typicode"\n}')
			.end(function(err) {
				if (err) { return done(err); }
				done(err);
			});

	});
});

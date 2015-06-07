'use strict';

var request = require('supertest');
var jsonServer = require('./');

describe('gulp-json-server', function() {

	it('should work', function(done) {

		jsonServer({
			router: 'fixtures/db.json',
			port: 3000
		});

		request('http://localhost:3000')
			.get('/posts/1')
			.expect(200, '{\n  "id": 1,\n  "title": "json-server",\n  "author": "typicode"\n}')
			.end(function(err) {
				if (err) { return done(err); }
				done(err);
			});

	});
});

module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 7777,
					middleware: function (connect) {
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest
						return [
							proxy,
							connect.static("app")// Serve static files.
						];
					}
				},
				proxies: [
					{
						context: '/context',// change context
						host: 'www.domain.fr' // specify domain or ip
					}
				]
			}
		},
		watch: {
			js: {
				files: [
					'./*.js'
				],
				options: {
					interrupt: true
				}
			}
		}
	});

	grunt.task.registerTask('proxy', 'Start reverse proxy', function () {
		grunt.task.run(['configureProxies:server', 'connect:server', 'watch']);
	});
}
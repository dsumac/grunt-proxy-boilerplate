module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 7777,
					keepalive: true,
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
		}
	});

	grunt.task.registerTask('proxy', 'Start reverse proxy', function () {
		grunt.task.run(['configureProxies:server', 'connect:server']);
	});
}
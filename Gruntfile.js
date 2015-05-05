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
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
						return [
							proxy
						];
					}
				},
				proxies: [
					{
						context: '/turfInfo',// change context
						host: 'www.pmu.fr' // specify domain or ip
					}
				]
			}
		}
	});

	grunt.task.registerTask('proxy', 'Start reverse proxy', function () {
		grunt.task.run(['configureProxies:server', 'connect:server']);
	});
}
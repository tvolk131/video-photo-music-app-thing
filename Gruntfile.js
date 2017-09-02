const config = require('config')['knex'];

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/server/*.js', 'test/database/*.js']
      }
    },

    run: {
      commands: {
        exec: 'npm run-script test-client'
      }
    },

    pgcreatedb: {
      default: {
        connection: {
          user: config.connection.user,
          password: config.connection.password,
          host: config.connection.host,
          port: config.connection.port,
          database: 'template1'
        },
        name: config.connection.database
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest', 'run']);
};

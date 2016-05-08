var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mind'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mind'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mind'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mind'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mind'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mind'
  }
};

module.exports = config[env];

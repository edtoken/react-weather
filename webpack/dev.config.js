var LiveReloadPlugin = require("webpack-livereload-plugin");
var config = require('./default.config');

config.plugins.push(new LiveReloadPlugin({port: 35731}));

module.exports = config;
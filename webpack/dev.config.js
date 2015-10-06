var LiveReloadPlugin = require("webpack-livereload-plugin");
var config = require('./default.config');

config.plugins.push(new LiveReloadPlugin({port: 35729}));

module.exports = config;
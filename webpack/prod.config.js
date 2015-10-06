var webpack = require('webpack');
var config = require('./dev.config');

config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, compress: { warnings: true } }));

module.exports = config;
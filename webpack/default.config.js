var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require("webpack-livereload-plugin");
var writeStats = require('./utils/writeStats');

var coreDir = path.join(__dirname, '../');
var assetsPath = path.join(coreDir, './build');

module.exports = {

	entry: {
		main: './src/main'
	},

	output: {
		path: assetsPath,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[hash].js',
		publicPath: '/'
	},

	module: {
		loaders: [
			{ test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?experimental&optional=runtime"},
			{test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader?experimental&optional=runtime"},
			{ test: /\.json$/, loader: 'json-loader' },
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style',
					'css?modules&importLoaders=2' +
					'!autoprefixer?browsers=last 2 version' +
					'!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
			},
			{ test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader" },
			{ test: /\.eot$/,    loader: "file-loader" },
			{ test: /\.svg$/,    loader: "file-loader" }
		]
	},

	progress: true,
	resolve: {

		root: path.resolve(coreDir, './src'),
		modulesDirectories: [
			'js',
			'node_modules'
		],
		extensions: ['', '.json', '.js', '.jsx'],

		alias: {
			src:path.join(coreDir, './src'),
			app:path.join(coreDir, './src/app'),
			actions:path.join(coreDir, './src/app/actions'),
			controllers:path.join(coreDir, './src/app/controllers'),
			api:path.join(coreDir, './src/app/api'),
			components:path.join(coreDir, './src/app/components'),
			core:path.join(coreDir, './src/app/core'),
			helpers:path.join(coreDir, './src/app/helpers'),
			storages:path.join(coreDir, './src/app/storages'),
			config:path.join(coreDir, './src/config'),
			extensions:path.join(coreDir, './src/extensions')
		}
	},

	plugins:[
		new CleanPlugin([assetsPath]),
		new webpack.WatchIgnorePlugin([/\.json$/]),
		function () {
			this.plugin('done', function(stats) {
				writeStats.call(this, stats, 'prod');
			});
		}
	]

};
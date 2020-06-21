const path = require('path');
const webpack = require('webpack');
const babelPolyfill = require('babel-polyfill');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/client/index.js'],
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						'presets': [
							['@babel/preset-env', {'targets': { 'node': 'current' }}]
						]
					},
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html'
		}),
		new WorkboxWebpackPlugin.GenerateSW()
	]
};

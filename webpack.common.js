const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: ['./src/client/index.js'],
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	node: {
		fs: 'empty'
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
		new Dotenv({
			safe: './.env_sample',
		}),
		// new WorkboxWebpackPlugin.GenerateSW()
	]
};

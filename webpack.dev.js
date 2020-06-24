const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				],
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: true, // Simulate the removal of files
			verbose: true, // Write Logs to Console
			cleanStaleWebpackAssets: true, // Automatically remove all unused webpack assets on rebuild
			protectWebpackAssets: false, // Do not allow removal of current webpack assets
		}),
	]
});
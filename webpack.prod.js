const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin({}),
			new TerserPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [ 
					MiniCssExtractPlugin.loader, 
					'css-loader', 
					'sass-loader' 
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
});
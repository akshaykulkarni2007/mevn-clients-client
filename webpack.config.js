const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
// const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './src/main.js',
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devServer: {
		open: true,
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new Dotenv(),
		new webpack.DefinePlugin({
			// 'process.env': {
			// 	VUE_APP_API_BASE_URL: JSON.stringify(process.env.VUE_APP_API_BASE_URL),
			// },
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.VUE_APP_API_BASE_URL': JSON.stringify(
				process.env.VUE_APP_API_BASE_URL
			),
		}),
	],
}

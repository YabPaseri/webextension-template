import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import sass from 'sass';
import { Configuration } from 'webpack';

export const common_config: Configuration = {
	mode: 'none',
	node: {
		__dirname: false,
		__filename: false,
	},
	// src以下のtsファイルで、import時にチルダを使えるようにする。チルダはsrcのパスに置き換わる。
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
		extensions: ['.js', '.ts'],
	},
	// backgroundとcontent-scriptしか使わないので、とりあえず。
	entry: {
		background: './src/background/index.ts',
		'content-script': './src/content-script/index.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{ targets: { chrome: '55', firefox: '52' }, useBuiltIns: 'usage', corejs: 3, modules: false },
							],
							'@babel/preset-typescript',
						],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				test: /\.scss/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'sass-loader',
						options: {
							implementation: sass,
							sassOptions: { fiber: false },
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/images', to: path.resolve(__dirname, 'dist', 'images') },
				{ from: './src/manifest.json', to: path.resolve(__dirname, 'dist', 'manifest.json') },
			],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	stats: 'errors-only',
	performance: { hints: false },
	optimization: {
		splitChunks: {
			name: 'common',
			chunks: 'initial',
		},
	},
};

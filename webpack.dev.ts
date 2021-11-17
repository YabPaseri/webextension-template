import { merge } from 'webpack-merge';
import { common_config } from './webpack.common';

const config = merge(common_config, {
	mode: 'development',
	optimization: { minimize: false },
	devtool: 'inline-source-map',
});
console.log(config);
export default config;

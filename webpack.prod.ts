import { merge } from 'webpack-merge';
import { common_config } from './webpack.common';

export default merge(common_config, {
	mode: 'production',
	optimization: { minimize: true },
	devtool: undefined,
});

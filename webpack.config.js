const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );

const additionalScripts = {};

const { modernize, moduleConfig, scriptConfig } = require( './webpack.utils' );

module.exports = [
	modernize( scriptConfig, additionalScripts, [
		// we only need to fork one copy of ts-checker off here in these webpack exports
		new ForkTsCheckerWebpackPlugin(),
	] ),
	modernize( moduleConfig ),
];

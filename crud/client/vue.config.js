module.exports = {
	productionSourceMap: false, // NOTE: this is default
	configureWebpack: {
		devtool: 'source-map',
	},
	
	publicPath: '',

	// Req to "/users" will now proxy to "http://localhost:5000/api" //
	devServer: {
		proxy: {
			'^/users': {
				target: 'http://localhost:5000',
				ws: true,
					changeOrigin: true
			},
			'^/api': {
				target: 'http://localhost:5000',
				ws: true,
					changeOrigin: true
			}
		}
	}
}
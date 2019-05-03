const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const resolve = function(dir){
	return path.join(__dirname,'..',dir)
}

/**
 webpack|webpack-dev-server CLI:
 -d : --debug --devtool eval-cheap-module-source-map --output-pathinfo
 -p : --optimize-minimize --define process.env.NODE_ENV="production", see building for production
 */
module.exports = (options ={} )=>({
	// context: path.resolve(__dirname, '../'),
	//打包源代码 ，发生异常可追溯源文件配置
	devtool: "source-map",
	entry:{
		main:path.resolve(__dirname,'../src/main.js'),
		//引入的第三方库的文件，例如 lodash 或 react,用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版
		thirdLibrary:['vue','element-ui']
	},
	output: {
		filename: "[name].bundle.js",
		path:path.resolve(__dirname,'../dist')
	},
	//导入文件关键字配置
	resolve: {
		//文件后缀格式
		extensions: ['.js','.vue','.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@':resolve('src'),
			'~':resolve('node_modules')
		}
	},
	//声明环境依赖模块，如果本项目成为一个library包的话，将要求引用项目中引入已经依赖的包
	externals: {
		//key可以再本项目代码中映射到对应的包（libraryName）暴露变量,进而利用key可以使用包内的方法
		//相当于import key from libraryName
		// "key":"libraryName"
		//如果配置了key 可以配置{{key}}Target:""指明这个包要在何种环境中使用

	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test:/\.css$/,
				use:['css-loader','postcss-loader']
			},
			{
				test:/\.less$/,
				use:['style-loader']
			},
			{
				test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader:'url-loader',
				options: {
					limit:10000
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}
		]
	},
	plugins: [
		//定义全局可替换变量，可根据此参数配置不同环境配置
		new webpack.DefinePlugin({
			NODE_ENV:JSON.stringify(options.product?'prod':(options.beta?'beta':'test')),

		}),
		new HtmlWebPackPlugin({template:'index.html',filename:'index.html'}),
		/* webpakc-dev-server 的 --hot配置项自动配置HotModuleReplacementPlugin以及设置热替换模式*/
		// new webpack.HotModuleReplacementPlugin()

		// new webpack.optimize.UglifyJsPlugin({
		// 	beautify: false,
		// 	mangle: {
		// 		screw_ie8: true,
		// 		keep_fnames: true
		// 	},
		// 	compress: {
		// 		screw_ie8: true
		// 	},
		// 	comments: false
		// }),
		/**
		 * CommonsChunkPlugin 通用代码块划分,output需要设置
		 * output:{
		 *    filename:"[name].**.js"
		 *  }
		 * */
		new webpack.optimize.CommonsChunkPlugin({
			name:"thirdLibrary"
		})
	],
	devServer: {
		contentBase:resolve('dist'),
		// hot:true
	}
})


'use strict'
const webpack = require('webpack')
const path = require('path')
const chokidar = require('chokidar');
const fs = require('fs');
const merge = require('webpack-merge')
const mockerAPI = require('mocker-api');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const {createNotifierCallback, resolve} = require('./utils')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    // rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // historyApiFallback: true,
    // hot: true,
    // host: process.env.HOST || config.dev.host,
    // port: process.env.PORT || config.dev.port,
    // open: config.dev.autoOpenBrowser,
    // show Error in Browser
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    // publicPath: config.dev.assetsPublicPath,
    // proxy: config.dev.proxyTable,
    after(app) {
      const mockPath = resolve('mock');
      const mock = () => {
        const mocks = [];
        const files = fs.readdirSync(mockPath);
        files.forEach(file => {
          const filePath = path.resolve(mockPath, file);
          mocks.push(filePath);
        });
        mockerAPI(app, mocks);
      };

      const watcher = chokidar.watch(mockPath, { persistent: true });
      watcher.on('add', mock).on('unlink', mock);
      mock();
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename:'./css/[name].css',
      // chunkFilename: './css/[id].css' // chunk文件
      // allChunks: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

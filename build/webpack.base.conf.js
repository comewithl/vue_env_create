'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const config = require('../config')
const getEntries = require('./webpack.entries')

function resolve(dir){
  return path.join(__dirname, '../', dir)
}

const { entry, plugins } = getEntries()

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 多页面入口
  entry: {
    app: './src/main.js',
    ...entry
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@store': path.resolve('src/store'),
      '@components': path.resolve('src/components'),
      '@constants': path.resolve('src/constants'),
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'node_modules')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:10].css')
    }),
    new HtmlWebpackPlugin({
      template: config.dev.htmlTemplate.index,
      filename: config.dev.htmlFileName.index,
      chunks: ['app'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
  ].concat(plugins),
  module: {
    rules: [
      ...(isDev ? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          quiet: true
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: process.env.NODE_ENV === 'development'
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV == 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
}

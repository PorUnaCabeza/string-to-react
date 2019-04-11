const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: './example/index.tsx',
  output: {
    filename: 'bundle.[hash].js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        enforce: 'pre',
        use: {
          loader: 'source-map-loader'
        },
        include: [resolve('src'), resolve('test')]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './example/index.html' })],
  devServer: {
    contentBase: './dist'
  }
})

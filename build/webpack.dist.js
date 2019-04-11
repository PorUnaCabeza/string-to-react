const merge = require('webpack-merge')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(baseWebpackConfig, {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.ts',
  output: {
    filename: isDev ? 'string-to-react.js' : 'string-to-react.min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'StringToReact',
    libraryTarget: 'umd'
  },
  devtool: isDev ? 'source-map' : false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
})

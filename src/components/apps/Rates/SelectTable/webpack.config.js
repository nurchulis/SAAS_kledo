const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  devtool: 'eval',
  mode: env,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-selectable-fast.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
}

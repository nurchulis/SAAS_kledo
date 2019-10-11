const path = require('path')
const webpack = require('webpack')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const env = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  mode: env,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'react-selectable-fast.js',
    library: 'React-Selectable-Fast',
    libraryTarget: 'umd',
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

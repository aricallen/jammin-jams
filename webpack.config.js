const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    open: false,
    historyApiFallback: true,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  externals: {
    request: 'request',
    'aws-sdk': 'aws-sdk',
    require: 'require',
    'node-pre-gyp': 'node-pre-gyp',
    'worker-farm': 'worker-farm',
    'loader-runner': 'loader-runner',
    fsevents: 'fsevents',
    'terser-webpack-plugin': 'terser-webpack-plugin'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js|jsx$/,
        loader: 'source-map-loader',
        exclude: [path.join(process.cwd(), 'node_modules')],
      },

      // other misc files
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

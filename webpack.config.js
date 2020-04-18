require('dotenv').config();
require('babel-polyfill');
const fs = require('fs');
const path = require('path');
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEnvPath = () => {
  const envPath = `.env.${process.env.TARGET_ENV}`;
  if (fs.existsSync(path.join(__dirname, envPath))) {
    return envPath;
  }
  return '.env';
};

const envPath = getEnvPath();

const apiProxyPath = `http://localhost:${process.env.API_PORT}`;
if (process.env.TARGET_ENV !== 'production') {
  console.log(`proxying api requests to ${apiProxyPath}`);
  console.log(`loaded env file ${envPath}`);
}

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    open: false,
    historyApiFallback: true,
    port: process.env.PORT,
    proxy: {
      '/api': apiProxyPath,
    },
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },

      // css and styles
      {
        test: /\.scss$/,
        use: [
          // js -> style nodes
          { loader: 'style-loader' },

          // css -> commonjs
          { loader: 'css-loader' },

          // resolves relative paths for url(...)
          { loader: 'resolve-url-loader' },

          // scss -> css
          { loader: 'sass-loader' },
        ],
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
        test: /\.(jpg|jpeg|png|gif|mp3)$/,
        loaders: ['file-loader'],
      },
    ],
  },

  plugins: [
    new DotEnv({ path: envPath }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

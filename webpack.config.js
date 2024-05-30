const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');
const { EsbuildPlugin } = require('esbuild-loader');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

const { assetsHost, assetsKey: version, bugsnag } = require('./lib/config');

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  entry: {
    app: './public/js/app/entry.jsx',
  },

  devtool: mode === 'development' ? 'eval-source-map' : 'source-map',

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    liveReload: false,
    port: 8080,
  },

  mode,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  optimization: {
    minimizer: [
      (mode === 'staging' || mode === 'production') &&
        new EsbuildPlugin({
          css: true,
          target: 'es2015',
        }),
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        // `terserOptions` options will be passed to `uglify-js`
        // Link to options - https://github.com/mishoo/UglifyJS#minify-options
        terserOptions: {},
      }),
    ],
  },

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:
      mode === 'development' ? 'http://localhost:8080/' : `${assetsHost}/`,
  },

  plugins: [
    mode === 'development' && new ReactRefreshWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    new MomentLocalesPlugin({
      localesToKeep: ['en-gb'],
    }),

    (mode === 'staging' || mode === 'production') &&
      new BugsnagSourceMapUploaderPlugin({
        apiKey: bugsnag.apiKey,
        appVersion: String(version),
      }),

    new RetryChunkLoadPlugin({
      maxRetries: 5,
      retryDelay: 3000,
    }),
  ],

  resolve: {
    alias: {
      features: `${__dirname}/public/js/features`,
      mocking: `${__dirname}/mocking`,
      'pusher-local': `${__dirname}/public/js/lib/pusher.js`,
    },
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
    },
  },

  stats: 'minimal',

  watchOptions: {
    ignored: /node_modules/,
  },
};

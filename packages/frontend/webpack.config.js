/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/camelcase */
const { join } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { getLastCommit } = require('@nest-react/lib');
const babelConfig = require('./.babelrc.js');

// CONSTANT definitions
const WEBPACK_DEV_SERVER_PORT = 8000;
const ASSETS_MAX_INLINE_SIZE = 5000;

// Define the environment
const developmentBuild = process.env.NODE_ENV === 'development';

module.exports = async () => {
  let buildId;

  if (!developmentBuild) {
    // get commit information to identify the build
    let lastCommit;
    try {
      lastCommit = await getLastCommit();
      buildId = lastCommit.shortHash;
      if (lastCommit.branch !== 'master') {
        buildId += `@${lastCommit.branch}`;
      }
    } catch (err) {
      console.log(err);
      buildId = 'no-git';
    }
  }

  const config = {
    context: __dirname,
    devServer: {
      contentBase: join(__dirname, 'public'),
      staticOptions: {
        redirect: true,
      },
      historyApiFallback: true,
      compress: true,
      port: WEBPACK_DEV_SERVER_PORT,
      overlay: {
        errors: true,
      },
      watchContentBase: true,
    },
    mode: developmentBuild ? 'development' : 'production',
    devtool: developmentBuild ? 'cheap-module-eval-source-map' : false,
    entry: join(__dirname, 'src', 'index.tsx'),
    output: {
      path: join(__dirname, 'dist'),
      filename: developmentBuild
        ? 'dist.js'
        : `dist.${buildId}.[contenthash:8].js`,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: join(__dirname, 'tsconfig.json'),
        }),
      ],
    },
    plugins: [
      new ExtraWatchWebpackPlugin({
        dirs: [join('..', 'domain', 'dist'), join('..', 'lib', 'dist')],
      }),
      new HtmlWebpackPlugin({
        template: join(__dirname, 'public', 'index.html'),
        minify: !developmentBuild,
      }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: join(__dirname, '.eslintrc'),
            failOnError: !developmentBuild,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/proposal-object-rest-spread'],
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelConfig,
        },
        {
          test: /\.(svg|png|jpg|jpeg)$/,
          loader: 'url-loader',
          options: {
            limit: ASSETS_MAX_INLINE_SIZE,
            name: '[path][name].[ext]',
          },
        },
      ],
    },
    performance: {
      hints: false,
    },
  };

  if (!developmentBuild) {
    config.plugins.push(new CleanWebpackPlugin());
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: true,
            keep_fnames: false,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          sourceMap: true,
        }),
      ],
    };
  }

  return config;
};

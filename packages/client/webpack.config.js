/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/camelcase */
const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const { getLastCommit } = require('@nest-react/lib');

// Constants definitions
const ASSETS_MAX_INLINE_SIZE = 5000;
const WEBPACK_DEV_SERVER_PORT = 8000;

// Environment definition
const isDev = process.env.NODE_ENV !== 'production';

// Commit information to identify the build
async function getBuildId() {
  try {
    const lastCommit = await getLastCommit();
    if (lastCommit.branch !== 'master') {
      return `${lastCommit.shortHash}@${lastCommit.branch}`;
    }
    return lastCommit.shortHash;
  } catch (err) {
    console.log(err);
    return 'no-git';
  }
}

module.exports = async () => {
  /**
   *  Common configuration (dev + prod)
   */
  const config = {
    context: __dirname,
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : false,
    entry: join(__dirname, 'src', 'index.tsx'),
    output: {
      path: join(__dirname, 'dist'),
      filename: isDev
        ? 'dist.js'
        : `dist.${await getBuildId()}.[contenthash:8].js`,
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
      new HtmlWebpackPlugin({
        template: join(__dirname, 'public', 'index.html'),
        minify: !isDev,
      }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: join(__dirname, '.eslintrc'),
            failOnError: !isDev,
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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

  if (isDev) {
    // development specific config
    config.devServer = {
      compress: true,
      contentBase: join(__dirname, 'public'),
      historyApiFallback: true,
      hot: true,
      overlay: {
        errors: true,
      },
      port: WEBPACK_DEV_SERVER_PORT,
      staticOptions: {
        redirect: true,
      },
      watchContentBase: true,
    };
    config.plugins.push(
      new ExtraWatchWebpackPlugin({
        dirs: [join('..', 'domain', 'dist'), join('..', 'lib', 'dist')],
      }),
      new ReactRefreshWebpackPlugin()
    );
  } else {
    // production specific config
    config.plugins.push(
      new CopyWebpackPlugin([{ from: 'public', ignore: ['index.html'] }]),
      new CleanWebpackPlugin()
    );
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

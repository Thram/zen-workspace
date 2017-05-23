/**
 * Created by thram on 18/01/17.
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { optimize, LoaderOptionsPlugin, DefinePlugin } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';

const INDEX_HTML_SETUP = {
  template: 'node_modules/html-webpack-template/index.ejs',
  title: 'Starter Kit React',
  appMountId: 'app',
  meta: [
    {
      name: 'viewport',
      content: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1',
    },
  ],
  links: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
  inject: false,
};

const plugins = [
  new ProgressBarPlugin(),
  new optimize.CommonsChunkPlugin({
    name: 'vendor',
    // this assumes your vendor imports exist in the node_modules directory
    minChunks: module =>
      module.context && module.context.indexOf('node_modules') !== -1,
  }),
  new optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
  new optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 4,
  }),
  new HtmlwebpackPlugin({
    ...INDEX_HTML_SETUP,
    inject: false,
    chunks: ['vendor', 'manifest', 'app'],
    filename: `${__dirname}/dist/index.html`,
  }),
  new ExtractTextPlugin('styles.css'),
];

if (isProd) {
  plugins.push(
    /**
     * Options to pass to all loaders
     */
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    /**
     * Minify JS
     */
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  );
}

export default function (env = {}) {
  if (env.compress) {
    plugins.push(
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  }
  if (env.analyze) plugins.push(new BundleAnalyzerPlugin());
  return {
    cache: true,
    entry: {
      app: `${__dirname}/src/index`,
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: !isProd && 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: isProd,
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: 'file-loader?name=images/[name].[ext]',
        },
        { test: /\.(mp3)$/i, use: 'file-loader?name=audio/[name].[ext]' },
        { test: /\.(otf)$/i, use: 'file-loader?name=fonts/[name].[ext]' },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { modules: true, sourceMap: !isProd },
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: !isProd },
              },
            ],
          }),
        },
      ],
    },
    plugins,
    performance: {
      hints: false,
    },
  };
}

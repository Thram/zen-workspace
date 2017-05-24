import { resolve } from 'path';
import { assign } from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const include = [
  resolve(__dirname, '../src'),
  resolve(__dirname, '../stories'),
];
const exclude = [resolve(__dirname, '../node_modules/')];

const getRule = (test, use) => ({
  test,
  use,
  include,
  exclude,
});

export default (storybookBaseConfig, configType) => ({
  ...storybookBaseConfig,
  devtool: 'source-map',
  module: {
    rules: [
      getRule(/\.jsx?$/, [
        {
          loader: 'babel-loader',
          options: {
            compact: isProd,
            cacheDirectory: true,
          },
        },
      ]),
      getRule(
        /\.(jpe?g|png|gif|svg|webp)$/i,
        'file-loader?name=images/[name].[ext]',
      ),
      getRule(/\.(mp4|webm|ogv)$/i, 'file-loader?name=video/[name].[ext]'),
      getRule(/\.(mp3|ogg|wav)$/i, 'file-loader?name=audio/[name].[ext]'),
      getRule(
        /\.(eot|otf|ttf|woff|woff2)$/i,
        'file-loader?name=fonts/[name].[ext]',
      ),
      getRule(
        /\.css$/i,
        isProd
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          })
          : ['style-loader', 'css-loader'],
      ),
      getRule(
        /\.scss$/i,
        isProd
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules', 'sass-loader'],
          })
          : [
            'style-loader',
            {
              loader: 'css-loader',
              options: { modules: true, sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
      ),
    ],
  },
  plugins: (storybookBaseConfig.plugins || [])
    .concat(isProd ? new ExtractTextPlugin('[name].css') : []),
  performance: {
    hints: false,
  },
});

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = (storybookBaseConfig, configType) =>
  Object.assign({}, storybookBaseConfig, {
    devtool: isProd ? 'eval' : 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: false,
                cacheDirectory: true,
              },
            },
          ],
          exclude: [`${__dirname}/node_modules/`],
          include: path.resolve(__dirname, '../'),
        },
        {
          test: /\.scss$/,
          use: isProd
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
          include: path.resolve(__dirname, '../'),
        },
      ],
    },
    plugins: (storybookBaseConfig.plugins || [])
      .concat(isProd ? new ExtractTextPlugin('styles.css') : []),
  });

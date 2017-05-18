const path = require('path');

module.exports = (storybookBaseConfig, configType) =>
  Object.assign({}, storybookBaseConfig, {
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  });

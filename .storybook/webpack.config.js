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
                cacheDirectory: true,
              },
            },
          ],
          exclude: [`${__dirname}/node_modules/`],
          include: path.resolve(__dirname, '../'),
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { modules: true },
            },
            'sass-loader',
          ],
          include: path.resolve(__dirname, '../'),
        },
      ],
    },
  });

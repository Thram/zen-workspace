/**
 * Created by thram on 18/01/17.
 */
import HtmlwebpackPlugin from "html-webpack-plugin";
import { optimize } from "webpack";

const INDEX_HTML_SETUP = {
  template: "node_modules/html-webpack-template/index.ejs",
  title: "Starter Kit React",
  appMountId: "app",
  meta: [
    {
      name: "viewport",
      content: "user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
    }
  ],
  links: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
  inject: false
};

export default {
  cache: true,
  entry: {
    app: `${__dirname}/src/index`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader?cacheDirectory=true",
        exclude: [`${__dirname}/node_modules/`]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader?name=images/[name].[ext]"
      },
      { test: /\.(mp3)$/i, use: "file-loader?name=audio/[name].[ext]" },
      { test: /\.(otf)$/i, use: "file-loader?name=fonts/[name].[ext]" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new optimize.CommonsChunkPlugin({
      name: "vendor",
      // this assumes your vendor imports exist in the node_modules directory
      minChunks: module =>
        module.context && module.context.indexOf("node_modules") !== -1
    }),
    new HtmlwebpackPlugin({
      ...INDEX_HTML_SETUP,
      inject: false,
      chunks: ["vendor", "app"],
      filename: `${__dirname}/dist/index.html`
    })
  ],
  performance: {
    hints: false
  }
};

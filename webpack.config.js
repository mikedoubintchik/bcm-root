const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

module.exports = () => ({
  entry: path.resolve(__dirname, "src/root-config"),
  output: {
    filename: "polyglot-mf-root-config.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "www"),
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.html$/,
        use: "raw-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.ejs",
      templateParameters: {
        isLegacy: env.activeDev === "legacy",
        isReact: env.activeDev === "react",
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(
      Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {})
    ),
  ],
  externals: ["single-spa", /^@polyglot-mf\/.+$/],
});

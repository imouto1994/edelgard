const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "../build/"),
    hot: true,
    port: 9000,
  },
  entry: {
    main: path.resolve(__dirname, "../src/index.js"),
  },
  mode: "development",
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "../node_modules/")],
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        include: [path.resolve(__dirname, "../src/")],
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]___[hash:base64:5]",
                context: path.resolve(__dirname, "../src"),
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        include: [path.resolve(__dirname, "../src/")],
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      // {
      //   include: [path.resolve(__dirname, "../json/")],
      //   test: /\.json$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //     },
      //   ],
      // },
    ],
  },
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
    path: path.resolve(__dirname, "../build/"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Edelgard",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  target: "web",
};

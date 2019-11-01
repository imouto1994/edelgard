const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "../build/"),
    historyApiFallback: true,
    hot: true,
    port: 9000,
  },
  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  mode: "development",
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "../node_modules/")],
        test: /\.(ts|js)x?$/,
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
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "",
              publicPath: "/",
            },
          },
        ],
      },
      {
        include: [path.resolve(__dirname, "../src/")],
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 25000,
            },
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
    path: path.resolve(__dirname, "../build/"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Edelgard",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ASSETS_VERSION = 3;

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
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/images/"),
        to: path.resolve(__dirname, "../build"),
        transformPath(targetPath, absolutePath) {
          const [fileName, fileExtension] = targetPath.split(".");
          return `${fileName}-${ASSETS_VERSION}.${fileExtension}`;
        },
      },
      {
        from: path.resolve(__dirname, "../src/json/"),
        to: path.resolve(__dirname, "../build"),
        transformPath(targetPath, absolutePath) {
          const [fileName, fileExtension] = targetPath.split(".");
          return `${fileName}-${ASSETS_VERSION}.${fileExtension}`;
        },
      },
      {
        from: path.resolve(__dirname, "../src/icons/"),
        to: path.resolve(__dirname, "../build/"),
      },
      {
        from: path.resolve(__dirname, "../src/fonts/"),
        to: path.resolve(__dirname, "../build"),
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.ASSETS_VERSION": `${ASSETS_VERSION}`,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};

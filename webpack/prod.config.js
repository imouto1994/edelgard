const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "hidden-source-map",
  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  mode: "production",
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
          MiniCssExtractPlugin.loader,
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
            options: {
              outputPath: "",
              publicPath: "/Edelgard/",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    namedChunks: true,
    namedModules: true,
    runtimeChunk: {
      name: "runtime",
    },
  },
  output: {
    chunkFilename: "[name]-[chunkhash].js",
    filename: "[name]-[chunkhash].js",
    path: path.resolve(__dirname, "../build/"),
    publicPath: "/Edelgard/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Edelgard",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: `${
        process.env.CHUNK_NAME ? "[name]-" : ""
      }[contenthash].min.css`,
      filename: "style-[contenthash].min.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};

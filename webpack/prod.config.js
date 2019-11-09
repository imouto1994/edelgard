const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const ASSETS_VERSION = 1;

module.exports = {
  devtool: undefined,
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
                localIdentName: "[hash:base64]",
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        canPrint: false,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
    moduleIds: "hashed",
    chunkIds: "named",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          enforce: true,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: "all",
    },
  },
  output: {
    chunkFilename: "[name]-[contenthash:10].js",
    filename: "[name]-[contenthash:10].js",
    jsonpFunction: "loadedChunks",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/images/"),
        to: path.resolve(__dirname, "../build/"),
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
        from: path.resolve(__dirname, "../src/json/"),
        to: path.resolve(__dirname, "../build/"),
        transformPath(targetPath, absolutePath) {
          const [fileName, fileExtension] = targetPath.split(".");
          return `${fileName}-${ASSETS_VERSION}.${fileExtension}`;
        },
      },
      {
        from: path.resolve(__dirname, "../src/fonts/"),
        to: path.resolve(__dirname, "../build/"),
      },
      {
        from: path.resolve(__dirname, "../src/app-manifest.json"),
        to: path.resolve(__dirname, "../build/"),
      },
      {
        from: path.resolve(__dirname, "../src/robots.txt"),
        to: path.resolve(__dirname, "../build/"),
      },
    ]),
    new MiniCssExtractPlugin({
      chunkFilename: "[name]-[contenthash:10].min.css",
      filename: "[name]-[contenthash:10].min.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.ASSETS_VERSION": `${ASSETS_VERSION}`,
    }),
    ...(process.env.WBA ? [new BundleAnalyzerPlugin()] : []),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
};

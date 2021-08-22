const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); //for scss
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === "production" ? "production" : "development" 

module.exports = {
  mode,
  entry:{
    main:"./src/index.ts"
  },
  output:{
    filename:"[name].js",
    path:path.resolve("dist")
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        use:'ts-loader',
        exclude:'/node_modules'
      },
      {
        test: /\.css$/i,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
          // publicPath:"images"
        }
      },
    ]
  },
  resolve:{
    extensions:['.ts','.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })]
  },
  plugins:[
    new webpack.BannerPlugin({
      banner: `빌드 날짜: ${new Date().toLocaleString()}`
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify: true
    }),
    new CopyPlugin({
      patterns:[
        {from:"src/images", to:"image"}
      ]
    })
  ],
  optimization: {
    minimizer: mode === "production" ? [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거한다
          },
        },
      })
    ] : [],
  },
}

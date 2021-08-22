const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); //for scss
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")


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
        test:/\.(png|jpeg)/i,
        loader:'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
        }
      },
      {
        test:/\.(png|jpeg)/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]',
            publicPath: './dist/',
            limit: 10000 // 10kb
          }
        }
      }
    ]
  },
  resolve:{
    extensions:['.ts','.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })]
  },
  plugins:[
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify: true
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

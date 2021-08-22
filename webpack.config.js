const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
      }
    ]
  },
  resolve:{
    extensions:['.ts','.js']
  },
  plugins:[
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}

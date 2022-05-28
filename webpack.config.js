const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = process.env.NODE_ENV === 'development';
const filename = (ext) => isDev ? `assets/${ext}/[name].${ext}` : `assets/${ext}/[name].[contenthash].${ext}`

module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, 'src/assets/js/main.js'),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'app'),
    assetModuleFilename: "assets/img/[name][ext][query]",
    clean: true
  },
  devtool: isDev && 'source-map',
  devServer: {
    port: 3000,
    static: './',
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new HtmlWebpackPlugin({
    template: "./src/index.html"
  })],
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: [
          "html-loader"
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
    ]
  }
}

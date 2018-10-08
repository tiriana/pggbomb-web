const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.global.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /^http/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.woff2$/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: "url-loader"
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  }
};

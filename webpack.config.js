const webpack = require("webpack");

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
        test: /\.scss$/,
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
        test: /\^http/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000
          }
        }
      },
      {
        test: /\.woff2$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  }
};

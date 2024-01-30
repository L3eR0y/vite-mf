const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
  }
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          // 'sass-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "@/assets/styles/scss/index.scss";
              `
            }
          }
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'hostRemoteEntry.entry.js',
      exposes: {},
      shared: {
          vue: {
              singleton: true
          },
          "vue-router": {
              singleton: true
          }
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    historyApiFallback: true,
      compress: true,
      port: 3030,
      hot: true,
    }
}

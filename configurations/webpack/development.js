const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

const path = require('path')

module.exports = {
    mode: 'development',
    cache: false,
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    target: 'web',
    entry: path.resolve(__dirname, '../../src/index.js'),
    output: {
        publicPath: 'auto',
        clean: true,
    },
    resolve: {
        extensions: ['.vue', '.ts', '.tsx', '.jsx', '.js', '.json' ],
        alias: {
            "@": path.resolve(__dirname, "../../src/"),
            "@components": path.resolve(__dirname, "../../src/components"),
            "@views": path.resolve(__dirname, "../../src/views")
        }
    },
    module: {
        rules: [
            // Vue
            {
                test: /\.vue?$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
             // CSS, PostCSS, Sass
             {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                  },
                  'sass-loader'
                ]
            },
            // PUG
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            // TypeScript
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // fonts and SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
           
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'main',
            remotes: {
                app2: "app2@http://localhost:5050/app2.entry.js"
            },
            exposes: {},
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../src/index.html'),
        }),
        new VueLoaderPlugin()        
    ],
    devServer: {
        static: {
          directory: path.join(__dirname),
        },
        compress: true,
        port: 3030,
        hot: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
}
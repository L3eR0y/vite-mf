const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../../src/main.ts')
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        module: true,
        clean: true,
        environment: {
            arrowFunction: true,
            forOf: true,
            destructuring: true,
            const: true,
        }
    },
    experiments: {
        outputModule: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].[name].css'
        }),
        new HtmlWebpackPlugin({
            template: `src/index.html`,
            filename: 'index.html'
        }),
    ],
    module: {
        rules: [
            // Vue
            {
                test: /\.vue?$/,
                loader: 'vue-loader',
                exclude: /node_modules/
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
            // CSS, PostCSS, Sass
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: { importLoaders: 1 }
                    },
                    'sass-loader'
                  ]
            },
        ]
    }
}
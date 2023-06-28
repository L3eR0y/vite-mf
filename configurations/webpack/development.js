const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../../dist')
        },
        open: false,
        compress: true,
        hot: true,
        port: 3030
    },
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
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
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
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `src/index.html`,
            filename: 'index.html'
        }),
        new ModuleFederationPlugin({
            name: 'main',
            filename: 'main.mf.js',
            remotes: {
                AppOne: "AppOne@http://localhost:3031/appOne.entry.js"
            },
            exposes: {}
        })
    ],
}
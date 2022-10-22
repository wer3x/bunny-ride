const path = require('path');
const webpack = require('webpack');
// const PACKAGE = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// // Library output details
// var FILE_NAME = "game";
// var LIBRARY_NAME = PACKAGE.name;
//
// // Build, source, etc paths
// var PATHS = {
//     entryPoint: path.resolve(__dirname, 'src/index.ts'),
//     dist: path.resolve(__dirname, 'dist/lib')
// }

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        usedExports: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        // We need this plugin to generate separate CSS files to the dist folder
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        // Чистим dist
        new CleanWebpackPlugin(),
        // Забираем темплейт для генрации index.html
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // Проверика типизации как отдельный процесс, повышение скорости сборки
        new ForkTsCheckerWebpackPlugin(),
        // Копируем ассеты
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                // Копируем PixiJs
                // { from: 'node_modules/pixi.js/dist/pixi.min.js', to: 'libs' }
            ]
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.js'],
            exclude: 'node_modules'
        }),
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        })
    ]
};

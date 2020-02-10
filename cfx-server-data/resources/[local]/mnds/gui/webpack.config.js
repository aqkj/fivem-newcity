/**
 * webpack配置
 */
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
module.exports = (env, args) => {
    const isDevelopment = env === 'dev'
    const config = merge({
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            main: './src/main.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            },{
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },{
                test: /\.less$/,
                use: [
                    isDevelopment ? 'style-loader' : miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },{
                test: /\.css$/,
                use: [
                    isDevelopment ? 'style-loader' : miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.(png|gif|jpg|ttf|eot|svg|woff|woff2)$/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 1000,
                        name: '[name].[ext]'
                    }
                }
            }]
        },
        resolve: {
            extensions: ['.vue', '.js', '.json']
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, './public/index.html')
            })
        ]
    })
    if (isDevelopment) {
        config.devServer = {
            host: '127.0.0.1',
            port: 27382,
            open: true,
            quiet: true,
            progress: true,
            hot: true
        }
    } else {
        config.plugins = config.plugins.concat(
            new miniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].css'
            })
        )
    }
    return config
}
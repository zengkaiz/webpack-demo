const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // 环境
    mode: 'development',
    // 入口文件
    entry: './src/index.js',
    // 开发服务器配置
    devServer: {
        port: 8000,
        progress: true,
        contentBase: './dist',
        compress: true,
        hot: true // 启用热更新
    },
    // 出口文件
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),   // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin()  // 热更新插件

    ],
    // 模块
    module: {
        rules: [
            {  
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                            '@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-transform-runtime']
                        ]
                    }
                },
                exclude: /node_modules/

            }
        ]
    }
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 环境
    mode: 'development',
    // 入口文件
    entry: './src/index.js',
    // 开发服务器配置
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
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
        })
    ],
    // 模块
    module: {
        rules: [
            {  
                test: /\.js$/,  // mormal 普通的loader
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
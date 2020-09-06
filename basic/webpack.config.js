const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');   // 使用了它js不压缩了，得使用下uglify-webpack-plugin
// const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // 环境
    mode: 'development',
    // 入口文件
    entry: './src/index.js',
    // 优化项
    optimization: {
        minimizer: [
            new optimizeCss(),
            // new uglifyjsWebpackPlugin({
            //     cache: true,
            //     sourceMap: true,
            //     parallel: true
            // })
        ]
    },
    // 开发服务器配置
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    // 出口文件
    output: {
        filename: '[name].js', // 产出的带hash文件名，如果文件有改动可以保证每次打包生成新的文件
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://zengkaiz.com'
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // 在每个模块中注入jquery
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'doc/hello.txt'}
            ]})
    ],
    // 明确这个模块是外部引入的，不需要打包
    externals: {
        jquery: '$'
    },
    // 模块
    module: {
        rules: [
            // eslint校验
            // {
            //     test: /\.js/,
            //     use: {
            //         loader: 'eslint-loader',
            //     },
            //     enforce: 'pre'// 强制先执行的loader 
            // },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,    // html-webpack-plugin  和  html-withimg-loader 冲突加的
                        limit: 1,
                        outputPath: '/img/',
                        publicPath: 'http://zengkaiz.com'
                    }
                }
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
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

            },
            // css-loader 处理@import这种引入语法的
            // style-loader 处理将css插入到head标签中
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options: {
                    //         insert: 'head'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader, // 将注释的代码替换为MiniCssExtractPlugin.loader抽离出css为mian.css文件
                    'css-loader'
                ]
            },
            // 可以处理less文件
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            
        ]
    }
};
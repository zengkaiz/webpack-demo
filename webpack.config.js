const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')  // 压缩js代码的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 将HTML引用路径和构件结果关联起来
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 单独将CSS文件分离出来,目前不支持webpack4,须使用npm install extract-text-webpack-plugin@next
module.exports = {
    /**
     * entry-入口
     * 1.单个入口；2.多个入口：在entry里面写多个键值对或者使用数组对多个文件进行打包
     */
    entry: {
        main: './src/index.js'
    },
    /**
     * output-输出
     * desc:webpack 最终构建出来的静态文件
     */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    /**
     * loader-转换器
     * desc:负责把某种文件格式的内容转换成 webpack 可以支持打包的模块
     */
    module: {
        rules:[
            {
                test: /\.jsx?/, // 支持 js 和 jsx
                include: [
                  path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname,'src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // options: {
                        //     limit: 1024,                            // limit: 转换成最大编码后的字节数
                        //     name:'[name].[ext]',                    // name：表示输出的文件名规则
                        //     outputPath: 'images/',                  // outputPath: 输出文件路径前缀。打包到指定的输出文件夹下
                        //     publicPath: '../dist/images/'           // publicPath: 打包文件中引用文件的路径前缀
                        // }
                    }
                ]
            }
        ]
    },
    /**
     * plugins-插件
     * desc:用于处理除了代码转换以外的其他构件任务
     */
    plugins: [
        new UglifyPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'src/index.html', // 配置文件模板
        }),
        new ExtractTextPlugin('index.css')
    ],
    /**
     * resolve-解析
     * desc:设置模块如何被解析
     */
    resolve: {
        alias: {
            utils$: path.resolve(__dirname, 'src/untils')
        },
        mainFiles: ['index'], // 可以配置其他默认使用的文件
        modules: ['node_modules'],
        mainFields: ['browser', 'module', 'main']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),      // 告诉服务器从哪里提供内容
        compress: true,     // 一切服务都启用gzip 压缩
        port: 9000,
        proxy: {
            '/api': {
                target: "http://localhost:3000",    // 将URL中带有/api的请求代理到本地的3000端口服务商
                pathRewrite: {'^/api': ''}      // 将URL中path部分的'api'移除掉
            }
        }
    }
}
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')  // 压缩js代码的插件
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
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src')
                ]
            }
        ]
    },
    /**
     * plugins-插件
     * desc:用于处理除了代码转换以外的其他构件任务
     */
    plugins: [
        new UglifyPlugin()
    ]
}
const fs = require('fs')
const path = require('path')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
    // alias: {
    //   loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
    // }
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // {
      //   test: /\.png$/,
      //   use: "file-loader", // 目的就是根据图片生成一个md5发射到dist目录下，file-loader还会返回当前图片路径
      // },
      // {
      //   test: /\.png$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       limit: 200*1024
      //     }
      //   },
      // },
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "增凯",
            filename: path.resolve(__dirname, "banner.js"),
          },
        },
      },
      // {
      //   test:/\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //         presets: ['@babel/preset-env']
      //     }
      //   },
      //   // enforce: 'pre'
      // },
      // {
      //   test:/\.js$/,
      //   use: {
      //     loader: 'loader1'
      //   },
      //   // enforce: 'pre'
      // },
      // {
      //   test:/\.js$/,
      //   use: {
      //     loader: 'loader2'
      //   }
      // },
      // {
      //   test:/\.js$/,
      //   use: {
      //     loader: 'loader3'
      //   }
      // },
      // {
      //   test:/\.js$/,
      //   use: ['loader3','loader2','loader1']
      // }
    ],
  },
};
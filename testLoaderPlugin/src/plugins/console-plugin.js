/**
 * d这个插件的作用是：控制台打印项目中所用到的plugin
 */

class ConsolePlugin {
  // 1. 在构造函数中获取用户给该插件传入的配置
  constructor(options) {
    this.show = options.show
    if (this.show === false) {
      console.log('===================start===================')
      console.log('constructor.options=', options)
    }
  }
  // 2. Webpack 会调用 ConsolePlugin 实例 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    let plugins = compiler.options.plugins
    plugins.forEach((plugin, index) => {
      if(this.show === false) console.log(index + ') plugin =', plugin)
    })
    if(this.show === false) console.log('==============end===============')
  }
}
module.exports = ConsolePlugin

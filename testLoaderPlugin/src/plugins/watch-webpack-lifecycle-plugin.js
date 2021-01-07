/**
 * 这个插件的作用：监控 Webpack 构建的声明周期的 plugin
 */
class WebpackLifeCyclePlugin {
  constructor(options) {}
  apply(compiler) {
    let MyPlugin = 'WebpackLifeCyclePlugin'
    compiler.hooks.entryOption.tap(MyPlugin, (context, entry) => {
      console.log('==============entry-option==============')
    })
    compiler.hooks.watchRun.tapAsync(MyPlugin, (watching, callback) => {
      console.log('==============watch-run==================')
      callback()
    })
    compiler.hooks.afterCompile.tap(MyPlugin, (watching, callback) => {
      console.log('==============after-run==================')
    })
    // 确定好要输出哪些文件，执行文件输出，可以在这里获取和修改输出内容
    compiler.hooks.emit.tapAsync(MyPlugin, (compilation, callback) => {
      console.log('============emit===============')
      callback()
    })
    // 完成一次构建任务
    compiler.hooks.done.tap(MyPlugin, (stats) => {
      console.log('===========done===========')
    })
    // 构建失败
    compiler.hooks.failed.tap(MyPlugin, (err) => {
      console.log('==========failed============')
    })
  }
}
module.exports = WebpackLifeCyclePlugin
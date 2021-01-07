const fs = require('fs')
const path = require('path')
const parser = require("@babel/parser")
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator1 = require('@babel/generator').default
const ejs = require('ejs')
const tapable = require('tapable')

// @babel/parser 主要把源码转换成ast
// @babel/traverse
// @babel/types
// @babel/generator

class Compiler {
  constructor(config) {
    // entry output
    this.config = config
    // 1. 需要保存入口文件的路径
    this.entryId
    // 2.需要保存所有的模块的依赖
    this.modules = {}
    // 入口路径
    this.entry = config.entry
    // 工作路径
    this.root = process.cwd() // 当前npx webpack的工作路径
    // 生命周期
    this.hooks = {
      entryOption: new tapable.SyncHook(),
      compile: new tapable.SyncHook(),
      afterCompile: new tapable.SyncHook(),
      afterPlugins: new tapable.SyncHook(),
      run: new tapable.SyncHook(),
      emit: new tapable.SyncHook(),
      done: new tapable.SyncHook()
    }
    // 如果传递了plugins
    let plugins = this.config.plugins
    if(Array.isArray(plugins)){
      plugins.forEach((plugin)=>{
        plugin.apply(this)
      })
    }
    console.log('afterPlugins')
    this.hooks.afterPlugins.call()
  }

  getSource(modulePath){
    let content = fs.readFileSync(modulePath, 'utf8')
    let rules = this.config.module.rules
    for(let i=0; i < rules.length; i++){
      let {test, use} = rules[i]
      let len = use.length - 1
      if(test.test(modulePath)){  
        function normalLoader(){
          let loader = require(use[len--])
          content = loader(content)
          if(len >= 0){
            normalLoader()
          }
        }
        normalLoader()
      }
    }
    return content
  }
  // 解析源码  
  parse(source, parentPath){
    let ast = parser.parse(source)  // astexplorer.net
    let dependencies = [] // 依赖的数组
    traverse(ast,{
      CallExpression(p){
        let node = p.node
        if( node.callee.name === 'require'){
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value    // 取到的就是引用名字
          moduleName = moduleName + (path.extname(moduleName)? '': '.js')
          moduleName = './' + path.join(parentPath, moduleName) 
          dependencies.push(moduleName)
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator1(ast).code
    return {sourceCode, dependencies}

  }

  // 构建模块
  buildModule(modulePath, isEntry){
    // 拿到模块的内容
    let source  = this.getSource(modulePath)
    // 模块id modulePath - this.root 相对路径
    let moduleName = './' + path.relative(this.root, modulePath)
    // 保存入口的名字
    if(isEntry){
      this.entryId = moduleName
    }
    // 解析需要把source源码进行改造 返回一个依赖列表
    let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)) // ./src/index
    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode

    dependencies.forEach(dep=>{  // 附模块的加载 递归加载
      this.buildModule(path.join(this.root, dep), false)
    })
  }

  emitFile(){
    // 用数据 渲染模板
    // 输出到输出的目录下
    let main = path.join(this.config.output.path, this.config.output.filename)
    // 读取模板
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'))
    let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules})

    this.assets = {}
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
  }

  run(){
    this.hooks.compile.call()
    // 执行 并且创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true)
    this.hooks.afterCompile.call()
    // console.log(this.modules, this.entryId)
    // 发射一个文件 打包后的文件
    this.emitFile()
    console.log('emit')
    this.hooks.emit.call()
    this.hooks.done.call()
  }
}

module.exports = Compiler
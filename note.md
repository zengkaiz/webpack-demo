1> expose-loader 暴露到window上
2> providerPlugin 给每个模块提供一个
3> 引入不打包



webpack打包图片：
1. 在js中创建图片引入
2. 在css中引入 background('url')
3. <img src="">

// file-loader 默认生成一张图片 到build目录下 将图片名字返回



tapable:    

注册方法： tap 同步注册 tapAsync(cb) 异步注册 tapPromise() 注册promise

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，Tapable有点类似nodejs的events库，核心原理也是依赖发布订阅模式。
1. Sync 同步方法
SyncHook
SyncBailHook
SyncWaterfallHook
SyncLoopHook: 同步遇到某个不返回undifined的监听函数会多次执行

2. 异步

同时发送多个请求

异步的钩子 a:串行 b:并行 等待所有并发的异步事件执行后再执行回调的方法

异步并行：
1. AsyncParallelHook
2. AsyncParallelBailHook

异步串行：
1. AsyncSeries



#### loader 分类
1. pre 在前面的
2. normal  正常的
3. inline  行内
4. post 在后面的

loader顺序  从右向左  从下到上

loader的特点：
1. 第一个loader一定要返回一个js脚本
2. 每个loader只做一件内容，为了使loader在更多场景链式调用
3. 每一个loader都是一个模块
4. 每个loader都是无状态的，确保loader在不通模块的


loader的api：
1. 

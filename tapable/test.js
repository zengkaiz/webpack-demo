const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");


class Lesson {
  constructor(){
    this.index = 0
    this.hooks = {
      arch: new SyncLoopHook(['name']),
    }
  }
    // 注册监听函数
  tap(){
    this.hooks.arch.tap('vue',(name)=>{
      console.log('vue', name)
      return ++this.index === 3? undefined : '继续学'
    })
    this.hooks.arch.tap('react',(name)=>{
      console.log('react', name)
    })
  }
  start(){
    this.hooks.arch.call('zengkaiz')
  }
}

let l = new Lesson();
// 发布订阅模式。
l.tap() // 注册事件
l.start() //启钩子
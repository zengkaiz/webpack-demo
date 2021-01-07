class SyncBailHook { // 钩子是同步的
  constructor(args) { // args =》 ['name']
    this.tasks = []
  }
  tap(name, task){
    this.tasks.push(task)
  }
  call(...args){
    let ret // 当前这个函数的返回值
    let index = 0
    do {
      ret = this.tasks[index++](...args)
    } while(ret === undefined && index < this.tasks.length)
  }
}

let hook = new SyncBailHook(['name'])
hook.tap('vue',(name)=>{
  console.log('vue', name)
  return '停止执行'
})
hook.tap('react',(name)=>{
  console.log('react', name)
})
hook.call('zengkaiz1')
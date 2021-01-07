class SyncWaterfallHook { // 钩子是同步的
  constructor(args) { // args =》 ['name']
    this.args = args
    this.tasks = []
  }
  tap(name, task){
    this.tasks.push(task)
  }
  call(...args) {
    args = args.slice(0, this.args.length)
    let [first, ...others] = this.tasks
    return others.reduce((ret,task) => task(ret), first(...args))
  }
}

let hook = new SyncWaterfallHook(['name'])
hook.tap('vue',(name)=>{
  console.log('vue', name)
  return 'vue ok'
})
hook.tap('react',(name)=>{
  console.log('react', name)
  return 'react ok'
})
hook.tap('webpack',(name)=>{
  console.log('webpack', name)
  return 'webpack ok'
})
let ret = hook.call('zengkaiz1')
console.log('call', ret)
class SyncHook { // 钩子是同步的
  constructor(args) { // args =》 ['name']
    this.tasks = []
  }
  tap(name, task){
    this.tasks.push(task)
  }
  call(...args){
    this.tasks.forEach((task)=>{
      task(...args)
    })
  }
}

let hook = new SyncHook(['name'])
hook.tap('vue',(name)=>{
  console.log('vue', name)
})
hook.tap('react',(name)=>{
  console.log('react', name)
})
hook.call('zengkaiz1')
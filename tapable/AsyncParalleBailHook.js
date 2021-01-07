class AsyncParalleBailHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    args = args.slice(0, this.args.length)
    let finalCallback = args.pop()
    let index = 0
    let ret 
    let done = () => {
      if (index === this.tasks.length) {
        finalCallback()
      }
    }
    do {
      ret = this.tasks[index++](...args, done)
    } while(ret === undefined && index < this.tasks.length)
  }
}

let callhook = new AsyncParalleBailHook(['name'])
callhook.tapAsync('vue',(name, cb)=>{
  setTimeout(()=>{
    console.log('vue', name)
    cb()
  },1000)
})
callhook.tapAsync('react',(name, cb)=>{
  setTimeout(()=>{
    console.log('react', name)
    cb()
  },1000)
})
callhook.callAsync('zengkaiz1', ()=>{
  console.log('end')
})
class AsyncSeriesWaterfallHook { 
  constructor(args) {
    this.args = args
    this.tasks = []
  }
  tapAsync(name, task){
    this.tasks.push(task)
  }
  callAsync(...args){
    let finalCallback = args.pop()
    let index = 0
    let next = (err, data)=>{
      let task = this.tasks[index]
      if(!task){
        return finalCallback()
      }
      if(index == 0){
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}

let hook = new AsyncSeriesWaterfallHook(['name'])
hook.tapAsync('vue',(name, cb)=>{
  setTimeout(()=>{
    console.log('vue', name)
    cb(null, '结果')
  },500)
})
hook.tapAsync('react',(data, cb)=>{
  setTimeout(()=>{
    console.log('react', data)
    cb(null)
  },1000)
})
hook.callAsync('zengkaiz1', ()=>{
  console.log('end')
})
class AsyncParallelHook { 
  constructor(args) {
    this.tasks = []
  }
  // tapAsync/callAsync
  tapAsync(name, task){
    this.tasks.push(task)
  }
  callAsync(...args){
    let finalCallback = args.pop()
    let index = 0
    let done=()=>{
      index++
      if(index == this.tasks.length){
        finalCallback()
      }
    }
    this.tasks.forEach((task)=>{
      task(...args,done)
    })
  }
  // tapPromise/promise
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    return Promise.all(this.tasks.map(task => task(...args)))
  }
}

let callhook = new AsyncParallelHook(['name'])
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


let promiseHook = new AsyncParallelHook(['name'])
promiseHook.tapPromise('1', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1', name, new Date())
      resolve('1')
    }, 1000)
  })
})

promiseHook.tapPromise('2', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2', name, new Date())
      resolve('2')
    }, 1000)
  })
})

promiseHook.promise('promise').then(ret => { console.log(ret) })
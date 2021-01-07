class AsyncSeriesHook { 
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
    let next = () => {
      if(this.tasks.length === index)return finalCallback()
      let task = this.tasks[index++]
      task(...args, next)
    }
    next()
  }
  // tapPromise/promise
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    let [first, ...others] = this.tasks
    return others.reduce((promise, task) => { // redux源码
      return promise.then(() => task(...args))
    }, first(...args) )
  }
}

let callHook = new AsyncSeriesHook(['name'])
callHook.tapAsync('vue',(name, cb)=>{
  setTimeout(()=>{
    console.log('vue', name)
    cb()
  },1000)
})
callHook.tapAsync('react',(name, cb)=>{
  setTimeout(()=>{
    console.log('react', name)
    cb()
  },1000)
})
callHook.callAsync('zengkaiz1', ()=>{
  console.log('end')
})

let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
console.time("time");
asyncSeriesHook.tapPromise("1", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1", name, age, new Date());
            resolve("1");
        }, 1000);
    });
});

asyncSeriesHook.tapPromise("2", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2", name, age, new Date());
            resolve("2");
        }, 2000);
    });
});

// 触发事件，让监听函数执行
asyncSeriesHook.promise("zengkaiz", 18).then(ret => {
    console.log(ret);
});
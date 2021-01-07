let button = document.createElement('button')
button.innerHTML = 'hello'

button.addEventListener('click', function(){
  // vue react懒加载的实现原理  实际生成两个文件 调用其中一个文件
  import('./source.js').then(data=>{
      console.log(data.default)
  })
})

document.body.appendChild(button)
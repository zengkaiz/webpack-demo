// import $ from 'jquery'

// console.log($)
// console.log('$$$$')



require('./index.css')
require('./index.less')
require('./a.js')
function init(){
    console.log('hello, webpack')
}
let fn = ()=>{
    console.log('fn')
}
fn()

@log
class A {
    a = 1
}
function log(target){
    console.log(target+'1111111')
}
let a = new A()
console.log(a)

import img  from './img/timg.jpeg'
let image  = new Image()
image.src = img
document.body.appendChild(image)


let button = document.createElement('button')
button.innerHTML = 'hello'

button.addEventListener('click', function(){
  import('./source.js').then(data=>{
      console.log(data.default)
  })
})

document.body.appendChild(button)
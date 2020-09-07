class Log{
  constructor(){
    console.log('出错22222wwww1111了')
  }
}

let log = new Log()

let url = ''
if(DEV === 'dev'){
  url='dev'
} else {
  url='pro'
}
console.log(DEV)
console.log(url)
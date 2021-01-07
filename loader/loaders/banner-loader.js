let loaderUtils = require('loader-utils')
let validate = require('schema-utils') 
let fs = require('fs')
function loader(source){
  console.log(Object.keys(this))
  this.cacheable && this.cacheable()  // loader 缓存
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        },
        filename: {
          type: 'string'
        }
      }
    }
    validate(schema, options, 'banner-loader')
    if(options.filename){
      this.addDependency(options.filename)
      fs.readFile(options.filename,'utf8', function(err, data){
        cb(err, `/**${data}**/ ${source}`)
      })
    } else {
      cb(null, `/**${options.text}**/ ${source}`)
    }
}

module.exports = loader
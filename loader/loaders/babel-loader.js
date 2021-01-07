let babel = require('@babel/core')
let babelUtils = require('loader-utils')
function loader(source){
  // console.log(Object.keys(this))
  let options = babelUtils.getOptions(this)
  let cb = this.async()
  babel.transform(source, {
    ...options,
    sourceMaps: true,
    filename: this.resourcePath.split('/').pop()
  },function(err, result){
    cb(err, result.code, result.map)
  })
  return source
}

module.exports = loader
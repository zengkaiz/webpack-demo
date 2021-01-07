let loaderUtils = require('loader-utils')
function loader(source) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML =  ${JSON.stringify(source)};
    document.head.appendChild(style)
  `;
  return str;
}
// 在style-loader上写了pitch 后面的都不走了
// style-loader   less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) {
  console.log(remainingRequest);
  let str = `
    let style = document.createElement('style');
    style.innerHTML =  require(${loaderUtils.stringifyRequest(
      this,
      "!!" + remainingRequest
    )});
    document.head.appendChild(style)
  `;
  return str;
}
module.exports = loader;

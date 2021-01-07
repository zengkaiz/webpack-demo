let less = require("less");
let babelUtils = require("loader-utils");
function loader(source) {
  let css
  less.render(source, function (err, r) { // r.css
    css = r.css
  })
  return css;
}

module.exports = loader;

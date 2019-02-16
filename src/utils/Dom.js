// getStyle
const SPECIAL_CHARS_REGEXP = /([:-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
export const camelCase = name => {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// 获取element元素样式的值
export const getStyle = (element, styleName) => {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '') // Window.getComputedStyle() 方法给出应用活动样式表后的元素的所有CSS属性的值，并解析这些值可能包含的任何基本计算。
    // 返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
    // 从getComputedStyle返回的对象是只读的，可以用于检查元素的样式，elt.style对象应用于在特定元素上设置样式
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}
// 在获取所有 Node.ELEMENT_NODE 的子元素
export const allChild = parentEle => {
  let a = []
  let childNodes = parentEle.childNodes
  for (var i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType === 1) {
      a.push(childNodes[i])
    }
  }
  // Array.from(parentEle.childNodes).filter(d => d.nodeType === 1)
  return a
}

// 获取页面元素中最大的z-index
export const getPageElMaxZIndex = () => {
  let numArray = Array.from(document.querySelectorAll('body *')).map(el => Number(getStyle(el, 'z-index'))).filter(z => !Number.isNaN(z))
  return Math.max.apply(
    null,
    numArray.length ? numArray : [0]
  )
}

// 获取子元素中最大的z-index
export const getChildNodeElMaxZIndex = parentEle => {
  let numArray = Array.from(allChild(parentEle)).map(el => Number(getStyle(el, 'z-index'))).filter(z => !Number.isNaN(z))
  return Math.max.apply(
    null,
    numArray.length ? numArray : [0]
  )
}

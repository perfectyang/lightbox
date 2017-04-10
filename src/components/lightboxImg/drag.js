module.exports = {
  getCss (o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
  },
  move (bar, target, callback, params) {
    console.log('params', params)
    bar.onmousedown = (event) => {
      params.flag = true
      if (!event) {
        event = window.event
        bar.onselectstart = () => {
          return false
        }
      }
      const e = event
      params.currentX = e.clientX
      params.currentY = e.clientY
      target.style.cursor = 'pointer'
      e.preventDefault()
      e.stopPropagation()
    }
    document.onmouseup = (e) => {
      params.flag = false
      if (this.getCss(target, 'left') !== 'auto') {
        params.left = this.getCss(target, 'left')
      }
      if (this.getCss(target, 'top') !== 'auto') {
        params.top = this.getCss(target, 'top')
      }
      target.style.cursor = 'default'
      e.preventDefault()
      e.stopPropagation()
    }
    document.onmousemove = (event) => {
      var e = event || window.event
      if (params.flag) {
        var nowX = e.clientX
        var nowY = e.clientY
        var disX = nowX - params.currentX
        var disY = nowY - params.currentY
        target.style.position = 'absolute'
        target.style.left = parseInt(params.left) + disX + 'px'
        target.style.top = parseInt(params.top) + disY + 'px'
        target.style.cursor = 'pointer'
      }
      e.preventDefault()
      e.stopPropagation()
      if (typeof callback === 'function') {
        callback(parseInt(params.left) + disX, parseInt(params.top) + disY)
      }
    }
  },
  eventCompat (event) {
    var direction = 1
    if (event.wheelDelta) { // 判断浏览器IE，谷歌滑轮事
      if (event.wheelDelta > 0) { // 当滑轮向上滚动时
        direction = 1
      }
      if (event.wheelDelta < 0) { // 当滑轮向下滚动时
        direction = -1
      }
    } else if (event.detail) { // Firefox滑轮事件
      if (event.detail > 0) { // 当滑轮向上滚动时
        direction = 1
      }
      if (event.detail < 0) { // 当滑轮向下滚动时
        direction = -1
      }
    }
    if (event.srcElement && !event.target) {
      event.target = event.srcElement
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
      event.preventDefault = function () {
        event.returnValue = false
      }
    }
    event.direction = direction
    return event
  }
}

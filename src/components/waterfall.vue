<script>
  export default {
    props: [
      'moduleStyle',
      'id',
      'xiuList',
      'maxWidth',
      'gapWidth',
      'gapHeight',
      'height',
      'item',
      'index',
      'uniqueId',
      'cols',
      'mark',
      'url',
      'resize'
    ],
    data () {
      return {
        style: {}
      }
    },
    mounted () {
      const image = new window.Image()
      image.onload = () => {
        this.src = this.url
        this.initStyle(...this.initData())
      }
      image.src = this.url
      this.initStyle(...this.initData())
      this.resize && window.addEventListener('resize', () => {
        this.resizeEvt(() => {
          this.initStyle(...this.initData())
        })
      })
    },
    methods: {
      resizeEvt: function (callback) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId)
        }
        this.timeoutId = setTimeout(() => {
          callback()
        }, 500)
        return this.timeoutId
      },
      initData: function () {
        const parentWidth = parseFloat(window.getComputedStyle(this.$el.parentElement).width)
        const newCols = Math.ceil(parentWidth / ((+this.maxWidth) + (+this.gapWidth)))
        const newWidth = (parentWidth - (newCols - 1) * this.gapWidth) / newCols
        return [newCols, newWidth]
      },
      initStyle: function (cols, width) {
        let uid = 'phonePanelHeights_' + this.uniqueId || 'init'
        if (this.index === 0) {
          this.$root[uid] = []
        }

        const itemWidth = width || +this.width
        const height = +this.height
        const gapWidth = +this.gapWidth
        const gapHeight = +this.gapHeight
        const index = +this.index - 1
        const heights = this.$root[uid]
        const colIndex = (index + 1) % cols
        let top = 0
        let left = colIndex * (itemWidth + gapWidth)
        console.log('heights', heights)
        console.log('cols', cols)
        if (heights.length < cols) {
          heights[heights.length] = {left: left, top: top + height + gapHeight}
        } else if (heights.length === Number(cols)) {
          let topList = []
          heights.forEach(function (val) {
            topList.push(val.top)
          })
          const topMax = Math.min(...topList)
          for (let index in heights) {
            if (heights[index].top === topMax) {
              top += heights[index].top
              left = heights[index].left
              heights[index] = {left: heights[index].left, top: top + height + gapHeight}
              break
            }
          }
        }
        this.style = {
          height: height + 'px',
          position: 'absolute',
          width: itemWidth + 'px',
          left: left + 'px',
          top: top + 'px'
        }
      }
    }
  }
</script>

<template>
  <div @click.stop class="show-area" ref="area">
    <div class="area-position J_box"  style="z-index: 2000">
      <div v-if="loading" class="lightbox__loading"></div>
        <div ref="box" :style="{'width': style.width, position: 'absolute', 'height': style.height, 'left': style.left, 'top': style.top, 'z-index': 5000}">
        <img
          :src="src"
          class="lightbox__image"
          :style="[{'width': style.width, 'height': style.height}]"
          :key="src"
          />
        </div>
    </div>
    
  </div>
</template>
<style lang="less" scoped>
  .show-area {
    position: absolute;
    left: 50%;
    width: 80%;
    height: 78%;
    overflow: hidden;
    margin-left: -40%;
    bottom: 135px;
    border: 1px solid #ccc;
  }
  .area-position {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import store from './lightboxStore'
  import drag from './drag'
  export default {
    props: {
      image: String
    },
    data () {
      return {
        state: store.state,
        loading: true,
        src: false,
        style: {
          flag: false,
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          zIndex: 4000
        },
        params: {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
      }
    },
    methods: {
      resizeImage (image) {
        let width = image.width
        let height = image.height
        let target = window.getComputedStyle(this.$refs.area)
        let areaWidth = parseInt(target.width)
        let areaHeight = parseInt(target.height)
        let wW = areaWidth
        let wH = areaHeight
        if (width > wW || height > wH) {
          const ratio = width / height
          const windowRatio = wW / wH
          if (ratio > windowRatio) {
            width = wW
            height = width / ratio
          } else {
            height = wH
            width = height * ratio
          }
        }
        width *= this.state.proportionValue
        height *= this.state.proportionValue
        this.style = {
          width: width + 'px',
          height: height + 'px',
          position: 'absolute',
          left: (areaWidth - width) * 0.5 + 'px',
          top: (areaHeight - height) * 0.5 + 'px'
        }
        const rotateStyle = {
          '-ms-transform': `rotate(${this.state.rotateValue}deg)`, /* IE 9 */
          '-moz-transform': `rotate(${this.state.rotateValue}deg)`, /* Firefox */
          '-webkit-transform': `rotate(${this.state.rotateValue}deg)`, /* Safari and Chrome */
          '-o-transform': `rotate(${this.state.rotateValue}deg)`, /* Opera */
          'transform': `rotate(${this.state.rotateValue}deg)`
        }
        this.style = Object.assign({}, this.style, rotateStyle)
        drag.move(this.$refs.box, this.$refs.box, (x, y) => {}, this.style)
      },
      // 图片放大缩小
      mouseZoom () {
        const fn = (e) => {
          var res = drag.eventCompat(e)
          if (res.direction < 0) {
            store.narrow()
            window.onresize()
          } else {
            store.enlarge()
            window.onresize()
          }
        }
        if (document.addEventListener) {
          document.addEventListener('DOMMouseScroll', fn, false)
        }
        this.$refs.area.onmousewheel = fn
      },
      initImage () {
        const image = new window.Image()
        image.onload = () => {
          this.loading = false
          this.src = this.image
          this.resizeImage(image)
        }
        this.resizeEvent = () => {
          this.resizeImage(image)
        }
        image.src = this.image
        window.addEventListener('resize', this.resizeEvent)
        window.onresize = this.resizeEvent
      }
    },
    mounted () {
      this.initImage()
      this.mouseZoom()
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeEvent)
    }
  }

</script>

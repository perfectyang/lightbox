<template>
  <div @click.stop class="show-area" ref="area">
    <div class="area-position J_box" ref="box" @mouseup="onmouseUp" @mousemove="onmouseMove">
      <div v-if="loading" class="lightbox__loading"></div>
      <img
        @mousedown.stop="onmouseDown"
        ref="hookImg"
        :src="src"
        class="lightbox__image J_lightbox"
        :style="style"
        :key="src"
        >
    </div>
    
  </div>
</template>
<style lang="less" scoped>
  .show-area {
    position: absolute;
    left: 50%;
    width: 80%;
    height: 80%;
    overflow: hidden;
    margin-left: -40%;
    top: 40px;
    border: 1px solid #ccc;
  }
  .area-position {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<script>
  import store from './lightboxStore'
  export default {
    props: {
      image: String
    },
    data () {
      return {
        state: store.state,
        loading: true,
        src: false,
        style: {},
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
        // let originWidth = image.width
        let target = window.getComputedStyle(this.$refs.area)
        let areaWidth = parseInt(target.width)
        let areaHeight = parseInt(target.height)
        // let wW = window.innerWidth
        // let wH = window.innerHeight - 200
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
      },
      // 图片放大缩小
      mouseZoom () {
        const eventCompat = (event) => {
          const type = event.type
          if (type === 'DOMMouseScroll' || type === 'mousewheel') {
            console.log('event.wheelDelta', event.wheelDelta)
            console.log('event.detail', event.detail)
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3
          }
          if (event.srcElement && !event.target) {
            event.target = event.srcElement
          }
          if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
              event.returnValue = false
            }
          }
          return event
        }
        this.$refs.area.onmousewheel = this.$refs.area.onmousewheel = (e) => {
          var res = eventCompat(e)
          if (res.delta < 0) {
            store.narrow()
            window.onresize()
          } else {
            store.enlarge()
            window.onresize()
          }
        }
      },
      drag (e) {
        console.log('mouse----', e)
        console.log('el', e.offsetX)
        console.log('el---Y', e.offsetY)
        const el = this.$el.getElementsByClassName('J_box')
        this.style.left = el.pageX
        this.style.top = el.pageY
      },
      onmouseUp (e) {
        this.params.flag = false
        console.log('mouse----', e)
        console.log('el', e.offsetX)
        console.log('el---Y', e.offsetY)
        const el = this.$refs.box.getBoundingClientRect()
        console.log('box---element', el)
      },
      onmouseMove (e) {
        if (this.params.flag) {
          const nowX = e.clientX
          const nowY = e.clientY
          const disX = nowX - this.params.currentX
          const disY = nowY - this.params.currentY
          this.style.left = parseInt(this.params.left) + disX + 'px'
          this.style.top = parseInt(this.params.top) + disY + 'px'
        }
      },
      onmouseDown (e) {
        this.params.flag = true
        this.params.currentX = e.clientX
        this.params.currentY = e.clientY
      },
      imgMove (e) {
        console.log('e', e)
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
      console.log('img', this.$refs.hookImg.getBoundingClientRect())
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeEvent)
    }
  }

</script>

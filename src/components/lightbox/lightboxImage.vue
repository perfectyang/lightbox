<template>
  <div @click.stop class="show-area" ref="area">
    <div class="area-position J_box" ref="box">
      <div v-if="loading" class="lightbox__loading"></div>
     <!--  <img
        @mousedown.stop="onmouseDown"
        ref="hookImg"
        :src="src"
        class="lightbox__image J_lightbox"
        :style="style"
        :key="src"
        > -->
        <div
          :style="style"
          ref="J_iframe"
          class="mask"
          >
          <iframe
           frameborder='0'
           scrolling="no"
           align="middle"
           :src="image.imageUrl"
           :key="image.imageUrl"
           :width="image.width"
           :height="image.height"
          ></iframe>
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mask {
    position: absolute;
  }
  .mask:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
<script>
  import store from './lightboxStore'
  import drag from './drag'
  export default {
    props: {
      image: Object
    },
    data () {
      return {
        state: store.state,
        loading: true,
        src: false,
        style: {},
        scale: 0,
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
      initView () {
        let width = this.image.width
        let height = this.image.height
        let target = getComputedStyle(this.$refs.area)
        let areaWidth = parseInt(target.width)
        let areaHeight = parseInt(target.height)
        let scaleX = areaWidth / width
        let scaleY = areaHeight / height
        if (scaleX > scaleY) {
          this.style = {
            transform: `scale(${scaleY}`
          }
          this.scale = scaleY
        } else {
          this.style = {
            transform: `scale(${scaleX}`
          }
          this.scale = scaleX
        }
        this.params = {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
        drag.move(this.$refs.J_iframe, this.$refs.J_iframe, (x, y) => {}, this.params)
        this.loading = false
      },
      // 图片放大缩小
      mouseZoom () {
        const fn = (e) => {
          var res = drag.eventCompat(e)
          if (res.direction < 0) {
            this.scale += 0.1
            if (this.scale >= 4) {
              this.scale = 4
            }
          } else {
            this.scale -= 0.1
            if (this.scale <= 0.1) {
              this.scale = 0.1
            }
          }
          this.style = {
            transform: `scale(${this.scale}`
          }
        }
        if (document.addEventListener) {
          this.$refs.J_iframe.addEventListener('DOMMouseScroll', fn, false)
        }
        this.$refs.J_iframe.onmousewheel = this.$refs.box.onmousewheel = this.$refs.area.onmousewheel = fn
      }
    },
    mounted () {
      this.initView()
      this.mouseZoom()
      window.onresize = this.initView
    },
    destroyed () {
      window.removeEventListener('resize', this.initView)
    }
  }

</script>

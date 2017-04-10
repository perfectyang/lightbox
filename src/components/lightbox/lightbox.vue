<style src="./lightbox.less" lang="less"></style>
<template>
  <div class="lightbox" v-if="image" @click="!isNoBgClick && close()">
    <lightbox-image :image="image" :key="image"></lightbox-image>
    <div class="pic-list">
       <span class="view-operate view-l" v-if="imgs.length > 8" @click="beforePage">left</span>
       <span class="view-operate view-r" v-if="imgs.length > 8" @click="afterPage">right</span>
       <div class="view-window">
          <div class="view-list" :style="[imgs.length <= 8  ? {'display':  'flex', 'justify-content': 'center', 'width': '100%'} : {'left': scrolLeft + 'px'}]">
            <ul class="view-list-ul" :style="{'width': 92 * imgs.length + 'px'}">
              <li
                :data="index"
                :class="{'item': true, 'on': index == state.index}"
                v-for="(img, index) in imgs"
                :key="index"
                @click="showCurrent(index)"
                ref="li">
                <div class="thumbnail-container"
                  :style="{
                    'width': '82px',
                    'height': '82px',
                    'position': 'relative'
                  }"
                >
                  <div class="view-img"
                   :style="{
                      'width': `${img.width}px`,
                      'height': `${img.height}px`,
                      '-ms-zoom': `${80/img.width}`,
                      '-moz-transform': `scale(${80/img.width}) translate(-50%, -50%)`,
                      '-moz-transform-origin': '0 0',
                      '-o-transform': `scale(${80/img.width}) translate(-50%, -50%)`,
                      '-o-transform-origin': '0 0',
                      'transform': `scale(${80/img.width}) translate(-50%, -50%)`,
                      'transform-origin': '0 0',
                      'position': 'absolute',
                      'top': '50%',
                      'left': '50%'
                    }
                    ">
                      <iframe
                        class="lazyframe"
                        :src="img.imageUrl"
                        frameborder='0'
                        scrolling="no"
                        align="middle"
                        :width="img.width"
                        :height="img.height"
                        ></iframe>
                  </div>
                </div>
              </li>
            </ul>
          </div>
       </div>
    </div>
    <div class="lightbox__close" @click="close">X</div>
    <!-- <div class="lightbox__operation">
      <button @click="enlarge">放大</button>
      <button @click="narrow">缩小</button>
      <button @click="rotate">旋转</button>
    </div> -->
    <div class="lightbox__btn prev" @click.stop.prevent="prev">上一张</div>
    <div class="lightbox__btn next" @click.stop.prevent="next">下一张</div>
  </div>
</template>
<style lang="less" scoped>
  ul, li {
    margin: 0;
    padding: 0;
  }
  .pic-list {
    position: absolute;
    bottom: 20px;
    left:50%;
    width: 728px;
    margin-left:-364px;
    z-index: 4000;
  }
  .item {
    border: 1px solid #ccc;
    margin-right: 10px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    float: left;
    display: flex; 
    justify-content: center;
    align-items: center
  }
  .on {
    border:1px solid #ff6161;
  }
  .view-window {
    width: 728px;
    height: 110px;
    border: 1px solid #fff;
    position: relative;
    overflow: hidden;
  }
  .view-list {
    position: absolute;
    transition: all 0.8s ease;
    left: 0;
  }
  .view-list-ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
  }
  .view-img {
    position: relative;
    overflow: hidden;
  }
  .view-img:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
  .view-operate {
    position: absolute;
    width: 50px;
    height: 112px;
    line-height: 112px;
    background: red;
    cursor: pointer;
  }
  .view-l {
    left: -55px;
  }
  .view-r {
    right: -55px;
  }
</style>
<script>
import './lightboxDirective'
import store from './lightboxStore'
import lightboxImage from './lightboxImage'
import lazyframe from 'lazyframe'
export default {
  props: {
    imgs: Array,
    imgName: String,
    indexKey: [String, Number]
  },
  name: 'lightbox',
  components: {
    lightboxImage
  },
  data () {
    return {
      state: store.state,
      isNoBgClick: true,
      currentPage: 1,
      totalPage: Math.ceil(this.imgs.length / 8),
      scrolLeft: 0
    }
  },
  created () {
    this.imgs.length && this.imgs.forEach((item) => {
      store.addImage(item, this.imgName)
    })
    this.totalPage = Math.ceil(this.imgs.length / 8)
  },
  mounted () {
    window.addEventListener('scroll', this.resizeEvent)
    let elements = document.querySelectorAll('.lazyframe')
    lazyframe(elements)
  },
  watch: {
    state: {
      handler (val, oldVal) {
        console.log('val', val)
        console.log('oldVal', oldVal)
      },
      deep: true
    },
    indexKey (val) {
      store.open(val, this.imgName)
      let temCurrentPage = Math.ceil((Number(val) + 1) / 8)
      if (temCurrentPage > this.totalPage || temCurrentPage === 0) {
        temCurrentPage = 1
      }
      this.currentPage = temCurrentPage
      this.moveScroll()
    }
  },
  methods: {
    setIndex () {
      this.state.index = ((this.currentPage - 1) * 8)
    },
    beforePage () {
      if (Number(this.currentPage) === 1) {
        this.currentPage = this.totalPage
      } else {
        this.currentPage--
      }
      this.setIndex()
      this.moveScroll()
    },
    afterPage () {
      if (Number(this.currentPage) >= this.totalPage) {
        this.currentPage = 1
      } else {
        this.currentPage++
      }
      this.setIndex()
      this.moveScroll()
    },
    close () {
      store.close()
      console.log('this', this)
      // this.$emit('outClose')
      this.state.index = false
    },
    next () {
      store.next()
      this.setThundmail()
    },
    prev () {
      store.prev()
      this.setThundmail()
    },
    showCurrent (index) {
      store.showCurrent(index)
    },
    setThundmail () {
      console.log('this.state.index', this.state.index)
      this.currentPage = Math.ceil((this.state.index + 1) / 8)
      if (Number(this.currentPage) === 0) {
        this.currentPage = 1
      }
      this.moveScroll()
    },
    moveScroll () {
      this.scrolLeft = ((this.currentPage - 1) * 8) * (-92)
    }
  },
  updated () {},
  computed: {
    image () {
      if (this.state.index !== false) {
        return this.state.images[this.state.group][this.state.index]
      }
    },
    currentImag () {
      if (this.state.index !== false) {
        return this.state.images[this.state.group]
      }
    }
  }
}
</script>

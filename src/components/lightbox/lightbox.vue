<style src="./lightbox.less" lang="less"></style>
<template>
  <div class="lightbox" v-if="image" @click="!isNoBgClick && close()">
    <lightbox-image :image="image" :key="image"></lightbox-image>
    <div class="pic-list">
       <span class="view-operate view-l" @click="beforePage">left</span>
       <span class="view-operate view-r" @click="afterPage">right</span>
       <div class="view-window">
          <div class="view-list" :style="[imgs.length <= 8  ? {'display':  'flex', 'justify-content': 'center', 'width': '100%'} : {'left': scrolLeft + 'px'}]">
            <ul class="view-list-ul">
              <li :data="index" :class="{'item': true, 'on': index == state.index}" v-for="(img, index) in imgs" :key="index" @click="showCurrent(index)">
              <div class="view-img">
                  <img :src="img.imageUrl" style="max-height: 100%; max-width: 100%;">
              </div>
              </li>
            </ul>
          </div>
       </div>
    </div>
    <div class="lightbox__close" @click="close">X</div>
    <div class="lightbox__operation">
      <button @click="enlarge">放大</button>
      <button @click="narrow">缩小</button>
      <button @click="rotate">旋转</button>
    </div>
    <div class="lightbox__btn prev" @click.stop.prevent="prev">上一张</div>
    <div class="lightbox__btn next" @click.stop.prevent="next">下一张</div>
  </div>
</template>
<style scoped>
  .pic-list {
    position: absolute;
    bottom: 20px;
    left:50%;
    width: 800px;
    margin-left:-400px;
    right: 200px;
    z-index: 4000;
  }
  .item {
    border: 1px solid #ccc;
    margin-right: 10px;
    cursor: pointer;
    display: flex; justify-content: center;align-items: center
  }
  .on {
    border:1px solid #ff6161;
  }
  .view-window {
    width: 800px;
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
    display:flex;
    list-style: none;
    justify-content: center;
  }
  .view-img {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
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
// import _ from 'lodash'
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
      store.addImage(item.imageUrl, this.imgName)
    })
    this.totalPage = Math.floor(this.imgs.length / 8)
  },
  mounted () {
  },
  watch: {
    state: {
      handler (val, oldVal) {
      },
      deep: true
    },
    indexKey (val) {
      store.open(val, this.imgName)
      let temCurrentPage = Math.ceil(Number(val) / 8)
      console.log('temCurrentPage', temCurrentPage)
      if (temCurrentPage > this.totalPage || temCurrentPage === 0) {
        temCurrentPage = 1
      }
      this.scrolLeft = (temCurrentPage) * 8 * -82
      console.log('this.scrolLeft', this.scrolLeft)
    }
  },
  methods: {
    setPagePisiton (index) {
      // const arr = _.chunk(this.imgs, 8)
    },
    beforePage () {
      if (Number(this.currentPage) === 1) {
        this.currentPage = this.totalPage
      } else {
        this.currentPage--
      }
      this.scrolLeft = ((this.currentPage - 1) * 8) * 82
    },
    afterPage () {
      console.log(this.currentPage)
      console.log('this.totalPage', this.totalPage)
      if (Number(this.currentPage) > this.totalPage) {
        this.currentPage = 1
      } else {
        this.currentPage++
      }
      this.scrolLeft = ((this.currentPage - 1) * 8) * (-82)
      console.log('afterPage', this.currentPage)
    },
    close () {
      store.close()
      this.$emit('outClose')
    },
    next () { store.next() },
    prev () { store.prev() },
    showCurrent (index) { store.showCurrent(index) },
    enlarge () {
      store.enlarge()
      window.onresize()
    },
    narrow () {
      store.narrow()
      window.onresize()
    },
    rotate () {
      store.rotate()
      window.onresize()
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
    },
    countLeft () {
      return Number(this.state.index) * (-100) + 'px'
    }
  }
}
</script>

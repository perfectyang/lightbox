<template>
  <div class="hello">
    <div class="">
        <!-- <waterfall :line-gap="200" :watch="items">
          <waterfall-slot
            v-for="(item, index) in items"
            :width="item.width"
            :height="item.height"
            :order="index"
            :key="item.id"
          >
          </waterfall-slot>
        </waterfall> -->
        <!-- <vue-images :imgs="images"
                    :modalclose="modalclose"
                    :keyinput="keyinput"
                    :mousescroll="mousescroll"
                    :showclosebutton="showclosebutton"
                    :showcaption="showcaption"
                    :imagecountseparator="imagecountseparator"
                    :showimagecount="showimagecount"
                    :showthumbnails="showthumbnails">
        </vue-images> -->
      <!--   <lightbox
          :imgs='images'
          :modalclose='modalclose'
          :keyinput='keyinput'
          :mousescroll='mousescroll'
          :showclosebutton='showclosebutton'
          :showcaption='showcaption'
          :imagecountseparator='imagecountseparator'
          :showimagecount='showimagecount'
          :showthumbnails='showthumbnails'
        /> -->
        <!-- <lightbox 
          :imgs="images"
          :modalclose="modalclose"
          :keyinput="keyinput"
          :mousescroll="mousescroll"
          :showclosebutton="showclosebutton"
          :showcaption="showcaption"
          :imagecountseparator="imagecountseparator"
          :showimagecount="showimagecount"
          :showthumbnails="showthumbnails"
          /> -->
         <!--  <waterfall v-for="(item,index) in images"
                   :maxWidth='item.width'
                   :gapWidth='20'
                   :gapHeight='20'
                   :resize="true"
                   :height='item.height'
                   :item="item"
                   :index="index"
                   :key="index"
                   :url="item.imageUrl"
                   :mark="`h-${index}`"
                   uniqueId="xyx"
                   inline-template>
            <div :ref="mark" class="img" :style="style">
                <img :src="item.imageUrl">
            </div>
        </waterfall> -->
    </div>
     <a href="javascript:;" v-for="(n, index) in images" :data="index" @click="show(index)">
      <img :src="n.imageUrl" width="40" height="40">
    </a>
    <lightbox 
     :imgs="images"
     :img-name="'imgName'"
     :index-key="index"
     @outClose="close"
    />
    <!--  <lightbox :imgs="images"
                    :modalclose="modalclose"
                    :keyinput="keyinput"
                    :mousescroll="mousescroll"
                    :showclosebutton="showclosebutton"
                    :showcaption="showcaption"
                    :imagecountseparator="imagecountseparator"
                    :showimagecount="showimagecount"
                    :showthumbnails="showthumbnails">
        </lightbox> -->
  </div>
</template>

<style>
  .gallery .wrapper img{
    display: block;
    height: 100px;
    width: auto;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    overflow: hidden;
}
</style>

<script>
import waterfall from './waterfall.vue'
// import { Waterfall, WaterfallSlot } from 'vue-waterfall'
import lightbox from './lightbox/lightbox'
export default {
  components: {
    waterfall,
    // WaterfallSlot,
    lightbox
  },
  name: 'hello',
  methods: {
    show (index) {
      alert(index)
      this.index = index
    },
    close () {
      this.index = ''
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index: '',
      items: [
        {
          width: Math.floor(Math.random() * (200 - 100) + 100),
          height: Math.floor(Math.random() * (500 - 300) + 300),
          id: 1
        },
        {
          width: Math.floor(Math.random() * (200 - 100) + 100),
          height: Math.floor(Math.random() * (500 - 300) + 300),
          id: 2
        },
        {
          width: Math.floor(Math.random() * (200 - 100) + 100),
          height: Math.floor(Math.random() * (500 - 300) + 300),
          id: 3
        }
      ],
      style: {
        background: 'red'
      },
      images: [
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/24411d02-86f5-49e4-8322-dca9d3858c92.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/2a9fcecf-3bc3-4ad8-98b9-1d0f6407daf2.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/24411d02-86f5-49e4-8322-dca9d3858c92.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/2a9fcecf-3bc3-4ad8-98b9-1d0f6407daf2.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/24411d02-86f5-49e4-8322-dca9d3858c92.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/2a9fcecf-3bc3-4ad8-98b9-1d0f6407daf2.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/22f4898c-992d-42d5-beee-9777c0f94888.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/24411d02-86f5-49e4-8322-dca9d3858c92.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        },
        {
          imageUrl: 'http://www.soouya.com/upload/flower/2a9fcecf-3bc3-4ad8-98b9-1d0f6407daf2.jpg',
          caption: 'Photo by 1',
          width: 320,
          height: 50
        }
        // {
        //   imageUrl: 'http://www.soouya.com/upload/flower/4a3d07ff-9ba0-4ec6-bce6-a2d766b7aae0.jpg',
        //   caption: 'Photo by 1',
        //   width: 320,
        //   height: 50
        // }
      ],
      modalclose: false,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: false,
      imagecountseparator: 'of',
      showimagecount: true,
      showthumbnails: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


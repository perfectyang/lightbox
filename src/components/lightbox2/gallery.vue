<template>
  <div class="gallery">
    <div class="wrapper" v-for="(item, index) in images">
      <img :src="item.imageUrl" class="lazyload" @click="setActive(index)">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      images: Array
    },
    methods: {
      setActive (idx) {
        this.$emit('changeIndex', idx)
      }
    }
  }
</script>

<style lang="less" scoped>
  .galleryd {
    display: flex;
    .wrapper {
      flex: 1;
      box-sizing: border-box;
      padding: 2px 1px;
      img {
        display: block;
        height: 100px;
        width: auto;
        border: 0px;
        border-radius: 2px;
        cursor: pointer;
        overflow: hidden;
      }
    } 
  }
    
</style>

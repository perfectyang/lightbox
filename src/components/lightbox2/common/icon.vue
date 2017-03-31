<template>
  <div v-html="icon"></div>
</template>

<script>
  import icons from '../icons'
  export default {
    props: {
      type: String,
      color: String
    },
    computed: {
      icon () {
        if (!icons[this.type]) {
          console.log('Icon render error -- type not exist')
          return ''
        }
        return icons[this.type].default(this.color)
      }
    }
  }
</script>

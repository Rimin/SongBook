<template>
   <transition name="slide">
     <detail-playlist></detail-playlist>
   </transition>
</template>

<script>
import DetailPlaylist from 'components/detail-playlist/detail-playlist'
import {getSingerSongList} from 'api/singer'
export default {
  components:{
      DetailPlaylist
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .4s;
}
.slide-enter, .slide-leave-to {
  transform: translate(100%,0);
  -ms-transform: translate(100%,0);		
  -webkit-transform: translate(100%,0);	
  -o-transform: translate(100%,0);	
  -moz-transform: translate(100%,0);	
}
</style>

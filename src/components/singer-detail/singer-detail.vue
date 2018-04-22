<template>
   <transition name="slide">
     <detail-playlist :data="songlist"></detail-playlist>
   </transition>
</template>

<script>
import DetailPlaylist from 'components/detail-playlist/detail-playlist'
import {getSingerSongList} from 'api/singer'
import { mapGetters } from 'vuex'
import {ERR_OK} from 'api/config'

export default {
  components:{
      DetailPlaylist
  },
  computed: {
      ...mapGetters([
        'getSinger'
      ])
  },
  created() {
    this._getSonglist()
  },
  methods:{
    ...mapGetters([
      'getSinger'
    ]),
    _getSonglist(){
      getSingerSongList(this.getSinger.id).then((res) =>{
        console.log(res)
      })
    }
  },
  data() {
    return{
       songlist: []
    }
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

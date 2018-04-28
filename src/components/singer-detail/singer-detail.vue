<template>
   <transition name="slide">
     <detail-playlist :data="songlist"></detail-playlist>
   </transition>
</template>

<script>
import DetailPlaylist from 'components/detail-playlist/detail-playlist'
import {getSingerSongList} from 'api/singer'
import { mapGetters } from 'vuex'
import {Song} from 'common/js/singer.js'
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
    _getSonglist(){
      getSingerSongList(this.getSinger.id).then((res) =>{
        if(res.code===ERR_OK){
          this.songlist = this.normalizedata(res.data)
         }
        console.log(res)
      })
    },
    normalizedata (data) {
      let song = {
        list:[],
        singer_name:'',
        imgurl: ''
      }
      song.imgurl = this.getSinger.imgurl
      song.singer_name  = data.singer_name
      data.list.forEach((item, index) => {
        song.list.push(new Song(item.musicData.songname,item.musicData.songmid, data.singer_name, item.musicData.albumname))
      });
      return song
    }
  },
  data() {
    return{
       songlist: {}
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

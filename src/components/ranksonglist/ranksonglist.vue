<template>
<transition name="slide">
    <detail-playlist :data="ranksonglist" :rank=true></detail-playlist>
</transition>
</template>

<script>
import DetailPlaylist from 'components/detail-playlist/detail-playlist'
import {getRankSongList} from 'api/rank'
import { mapGetters } from 'vuex'
import {Song} from 'common/js/singer.js'
import {ERR_OK} from 'api/config'

export default {
  components: {
      DetailPlaylist
  },
  computed: {
      ...mapGetters([
        'getRank'
      ])
  },
  created() {
      this._getRankSongList()
  },
  methods:{
      _getRankSongList() {
        getRankSongList(this.getRank.id).then((res) => {
         if(res.code===ERR_OK){
             this.ranksonglist = this.normalizedata(res)
            }
        })
      },
      normalizedata (data) {
        let rank = {
          list:[],
          rank_name:'',
          imgurl:''
        }
        rank.rank_name = data.topinfo.ListName
        rank.imgurl = data.topinfo.pic_v12
        data.songlist.forEach((item, index) => {
            if(index>30) return false
            rank.list.push(new Song(item.data.songname, item.data.songmid, item.data.singer[0].name, item.data.albumname))
        });
        return rank
      }
  },
  data(){
      return {
          ranksonglist: {}
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


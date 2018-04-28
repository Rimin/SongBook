<template>
<transition name="slide">
  <div class="ranksonglist"></div>
</transition>
</template>

<script>
import DetailPlaylist from 'components/detail-playlist/detail-playlist'
import {getRankSongList} from 'api/rank'
import { mapGetters } from 'vuex'
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
          //  if(res.code===ERR_OK){
              console.log(res)
          //   }
        })
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
@import url('../../common/less/base.less');
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
.ranksonglist{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: @bgcolor;
}
</style>


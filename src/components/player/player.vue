<template>
  <div class="player" v-show="playList.length>0">
      <div class="full-player" v-show="showPlayer">
        <div class="background">
          <img style="width=100%; height=100%">
        </div>
      </div>
      <div class="mini-player" v-show="!showPlayer"></div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getLyric} from 'api/song'
import { mapGetters, mapMutations, mapActions  } from 'vuex'
export default {
    components:{
      Scroll
    },
    computed: {
      ...mapGetters([
         'playList',
         'showPlayer',
         'getCurrSongindex'
      ])
    },
    data() {
      return {
        song: {},
        lyric:'',
        showplay: false
      }
    },
    created() {
    },
    methods:{
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      _getSong () {
        this.song =  this.getPlayList[this.getCurrSongindex]
      //  console.log(this.song)
      },
      _getLyric () {
        getLyric(this.song.id).then((res) =>{
          console.log(res)
        }) 
      }
    },
    watch: {
      
    }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.full-player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background: @bgcolor;
}
.background{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.6;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}

</style>

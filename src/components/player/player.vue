<template>
  <div class="player" v-show="playList.length>0">
      <div class="full-player" v-show="showPlayer">
        <div class="background">
          <img :src="currentSong.imgurl">
        </div>
        <div class="player-top">
            <div class="back" @click="back()">
              <i class="fa fa-chevron-down"></i>
            </div>
            <p>{{currentSong.name}}</p>
            <span>{{currentSong.singer}}</span>
        </div>
        <div class="player-middle">
            <div class="middle-l">
              <div class="cd-wrapper">
                <div class="cd rotate" :class="{'pause':!isPlaying}">
                  <img :src="currentSong.imgurl">
                </div>
              </div>
              <div class="curret-lyric">
                也代表我已走远
              </div>
            </div>
            <div class="middle-r"></div>
        </div>
        <div class="player-bottom">
          <div class="drag-dot">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="play-control">
            <progress-bar></progress-bar>
            <div class="operators">
              <div class="op-btn btn-left">
                <i class="fa fa-retweet"></i>
              </div>
              <div class="op-btn btn-left">
                <i class="fa fa-backward"></i>
              </div>
              <div class="op-btn btn-center" @click="stop">
                <i class="fa" :class="[{'fa-pause': isPlaying},{'fa-play': !isPlaying}]" ></i>
              </div>
              <div class="op-btn btn-right">
                <i class="fa fa-forward"></i>
              </div>
              <div class="op-btn btn-right">
                <i class="fa fa-heart-o"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mini-player" v-show="!showPlayer"></div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getLyric} from 'api/song'
import { mapGetters, mapMutations, mapActions  } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
export default {
    components:{
      Scroll,
      ProgressBar
    },
    computed: {
      ...mapGetters([
         'showPlayer',
         'playList',
         'currentSong',
         'isPlaying'
      ])
    },
    data() {
      return {
        lyric:''
      }
    },
    created() {
    },
    methods:{
      ...mapActions({
        
      }),
      ...mapMutations({
         setPlaystate: 'SET_PLAYINGSTATE'
      }),
      back(){

      },
      stop(){
        this.isPlaying === true ? this.setPlaystate(false):this.setPlaystate(true)
      },
      formatt(num){
        // 格式化时间
      },
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
  background: #222222;
}
.background{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}
.background > img{
  width: 100%;
  height: 100%;
}
.back{
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.back > i{
    display: block;
    padding: 9px;
    font-size: 22px;
    color: @maincolor;
}
.player-top{
  text-align: center;
  position: relative;
  margin-bottom: 25px;
}
.player-top >p {
  width: 70%;
  margin:  0 auto;
  .textcut();
  .font(@color: #ffffff;@lineheight: 40px;@fontsize: 1.1rem);
}
.player-top > span{
  .textcut();
  .font(@color: #ffffff;@lineheight: normal;@fontsize: .9rem);
}
.player-middle{
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
}
.middle-l{
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
}
.cd-wrapper{
    position: absolute;
    left: 10%;
    top: 0;
    width: 80%;
    height: 100%;
}
.cd{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(255,255,255,0.1);
  border-radius: 50%;
}
.cd > img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.rotate{
  animation: rotate 20s linear infinite;
}
.pause{
  animation-play-state:paused;
}
.curret-lyric{
  width: 80%;
  margin: 30px auto 0 auto;
  overflow: hidden;
  text-align: center;
 .font(@color:rgba(255,255,255,0.5);@lineheight: 20px;@fontsize: 1rem);
}
 @keyframes rotate {
   0%{transform: rotate(0);}
   100%{transform: rotate(360deg);}
 }
 .drag-dot{
   text-align: center;
 }
 .dot{
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
 }
 .active{
  width: 20px;
  border-radius: 5px;
  background: rgba(255,255,255,0.8);
 }
 .player-bottom{
  position: absolute;
  bottom: 50px;
  width: 100%;
 }
.operators{
  display: flex;
  align-items: center;
}
.op-btn{
  flex:1;
  .font(@color: @maincolor; @lineheight: normal;@fontsize: 2.1rem);
}
.btn-left{text-align: right;}
.btn-right{text-align: left;}
.btn-center{text-align: center;}
// fa fa-random  fa fa-retweet
// fa fa-backward  fa fa-forward
// fa fa-heart fa fa-heart-o
</style>

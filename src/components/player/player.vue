<template>
  <div class="player" v-show="playList.length>0">
    <transition name="full"
           @enter="enter"
           @after-enter="afterEnter"
           @leave="leave"
           @after-leave="afterLeave"
    >
      <div class="full-player" v-show="showPlayer">
        <div class="background">
          <img :src="currentSong.imgurl">
        </div>
        <div class="player-top top">
            <div class="back" @click="_changeShow">
              <i class="fa fa-chevron-down"></i>
            </div>
            <p>{{currentSong.name}}</p>
            <span>{{currentSong.singer}}</span>
        </div>
        <div class="player-middle">
            <div class="middle-l">
              <div class="cd-wrapper" ref="cdWrap" >
                <div class="cd rotate" :class="{'pause':!isPlaying}">
                  <img :src="currentSong.imgurl">
                </div>
              </div>
              <div class="curret-lyric">
                也代表我已走远
              </div>
            </div>
            <div class="middle-r">

            </div>
        </div>
        <div class="player-bottom bottom">
          <div class="drag-dot">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="play-control">
            <progress-bar :duration="formatt(currentSong.duration)"></progress-bar>
            <div class="operators">
              <div class="op-btn btn-left">
                <i class="fa" :class="iconMode" @click="changeMode" ></i>
              </div>
              <div class="op-btn btn-left" @click="backward">
                <i class="fa fa-backward"></i>
              </div>
              <div class="op-btn btn-center" @click="toggle">
                <i class="fa" :class="[{'fa-pause': isPlaying},{'fa-play': !isPlaying}]" ></i>
              </div>
              <div class="op-btn btn-right" @click="forward">
                <i class="fa fa-forward"></i>
              </div>
              <div class="op-btn btn-right" @click="collect">
                <i class="fa fa-heart-o"></i>
              </div>
            </div>
          </div>
        </div>
       </div>
    </transition>
      <div class="mini-player" v-show="!showPlayer" @click="_changeShow">
        <div class="mini-cd">
          <img :src="currentSong.imgurl" class="rotate" :class="{'pause':!isPlaying}">
        </div>
        <div class="song-infor">
          <p>{{currentSong.name}}</p>
          <span>{{currentSong.singer}}</span>
        </div>
        <div class="mini-operate">
          <div @click.stop="toggle" class="op-btn">
                <i class="fa" :class="[{'fa-pause-circle-o': isPlaying},{'fa-play-circle-o': !isPlaying}]" ></i>
          </div>
        </div>
        <div class="mini-operate">
            <div class="mini-op-btn">
              <i class="fa fa-bars"></i>
            </div>
        </div>
      </div>
      <audio ref="audio" @play="ready" @error="error">
         <source :src="currentSong.url" type="audio/mpeg">
      </audio>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getLyric} from 'api/song'
import { mapGetters, mapMutations, mapActions  } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
import animations from 'create-keyframe-animation'
import {playmode} from 'common/js/config'
import Lyric from 'lyric-parser'
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
         'isPlaying',
         'getMode',
         'getCurrSongindex'
      ]),
      iconMode(){
        return this.getMode === playmode.sequence ? 'fa-retweet' : 'fa-random'
      },
    },
    data() {
      return {
        lyric: {},
        songReady: false,
        isCollected: false
      }
    },
    created() {
    },
    methods:{
      ...mapActions({

      }),
      ...mapMutations({
        setPlaystate: 'SET_PLAYINGSTATE',
        changeShow: 'CHANGE_SHOWPLAYER',
        setPlayMode: 'SET_PLAYMODE',
        changeIndex: 'RECORD_CURRSONGINDEX'
      }),
      _changeShow(){
        this.showPlayer === true ? this.changeShow(false): this.changeShow(true)
      },
      toggle(){
        this.isPlaying === true ? this.setPlaystate(false):this.setPlaystate(true)
      },
      formatt(num){
        let time_arr = ((num/60).toFixed(2)).toString().split('.')
        return time_arr[0] + ':' +time_arr[1]
      },
      changeMode(){
        this.getMode === playmode.sequence ? this.setPlayMode(playmode.random) : this.setPlayMode(playmode.sequence)
      },
      collect(){
        
      },
      backward(){
        if (!this.songReady) {
          return
        }
        let index = this.getCurrSongindex - 1
        if (index < 0) {
          index = this.playList.length - 1
        }
        this.changeIndex(index)
        if (!this.isPlaying) {this.toggle()}  // 添加判断songready是否为true以阻止快速点击
        this.songReady = false
      },
      forward(){
        if (!this.songReady) {
          return
        }
        let index = this.getCurrSongindex + 1
        if(index === this.playList.length) {
            index = 0
        }
        this.changeIndex(index)
        if(!this.isPlaying) {this.toggle()}
        this.songReady = false
      },
      ready(){
        this.songReady = true
      },
      error(){
        this.songReady = true
      },
      enter(el, done){
        const {x,y,scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100:{
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdWrap, 'move', done)
      },
      afterEnter(){
        animations.unregisterAnimation('move')
        this.$refs.cdWrap.style.animation = ''
      },
      leave(el,done){
        this.$refs.cdWrap.style.transition = 'all 0.4s'
        const {x,y,scale} = this._getPosAndScale()
        this.$refs.cdWrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrap.addEventListener('transitionend', done)
      },
      afterLeave(){
        this.$refs.cdWrap.style.transition = ''
        this.$refs.cdWrap.style.transform = ''
      },
      _getPosAndScale(){
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const cdwidth = window.innerWidth * 0.8
        const scale = targetWidth / cdwidth
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - cdwidth / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      _getLyric () {
        this.currentSong.getLyric().then((lyric) => {
          this.lyric = new Lyric(lyric)
          console.log(this.lyric)
        })
      }
    },
    watch:{
        currentSong(newSong, oldSong){
          if(newSong.id === oldSong.id) {
            return
          }
          this.$nextTick(() => {
            this.$refs.audio.play()
            this._getLyric()
          })
        },
        isPlaying(newState){
          const audio = this.$refs.audio
          this.$nextTick(() => {
             newState ? audio.play() : audio.pause()
          })
        },

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
// fa fa-heart fa fa-heart-o
.mini-player{
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
  background: #ffffff;
}
.mini-cd{
  flex: 0 0 40px;
  width: 40px;
  padding: 0 10px 0 20px;
}
.mini-cd > img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.song-infor{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.song-infor > p {
  .font(@color: @fontcolor; @lineheight: normal;@fontsize: .9rem);
  .textcut();
  margin-bottom: 4px;
}
.song-infor > span{
  .font(@color: @lingtfontcolor; @lineheight: normal;@fontsize: .8rem);
  .textcut();
}
.mini-operate{
  width: 30px;
  padding: 0 10px;
}
.mini-op-btn{
  .font(@color: @maincolor; @lineheight: normal;@fontsize: 1.8rem);
}
.full-enter-active, .full-leave-active{
   transition: all 0.4s
}
.full-enter-active >  .top, .bottom{
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
}
.full-enter {opacity :1 }
.full-leave-to{
  opacity: 0;
}
.full-enter >  .top{
  transform: translate3d(0, -100px, 0)
}
.full-enter > .bottom{
  transform: translate3d(0, 100px, 0)
}



</style>

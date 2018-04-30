<template>
  <div class="detail-playlist" ref="page">
     <div class="singer-name">
        <span class="fa fa-chevron-left back" @click="back"></span>
        <span v-if="!rank">{{data.singer_name}}</span>
        <span v-if="rank">{{data.rank_name}}</span>
     </div>
     <div class="singer-avatar" :style="bgimg">
        <div class="fliter" ref="fliter"></div>
        <div class="play"><span class="fa fa-play-circle-o"></span> 播放全部</div>
     </div>
     <div class="layer" ref="layer">
     <scroll @scroll="scroll"
             :data="data.list"
             :listen-scroll="listenScroll"
             :probe-type="probeType" 
             ref="list" 
             class="list">
            <div class="contain">
              <div class="singer-song" v-for="(item,index) in data.list">
                  <div v-show="rank" class="ranking" :class="{'top3':index<3}">{{index+1}}</div>
                  <div class="song">
                    <h3>{{item.name}}</h3>
                    <span>{{item.singer}}</span>
                    <span v-if="!rank">{{item.album}}</span>
                  </div>
              </div>
            </div>
     </scroll>
    </div>
     <div class="loading-wrapper" v-show="!data">
        <loading></loading>
     </div>
  </div>
</template>


<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const TOP_HEIGHT = 38
export default {
  components:{
        Scroll,
        Loading,
    },
  props: {
      data: { 
        type: Object,
        default: {}
      },
      rank:{
        type: Boolean,
        default:false
      }
    },
  data (){
      return{
        scrollY:-1,
        up: false,
        diff: 0
      }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  computed: {
    bgimg() {
      return `background-image:url(${this.data.imgurl})`
      }
    },
  mounted() {
     this.diff = this.$refs.fliter.clientHeight - TOP_HEIGHT
  },
  methods: {
      back() {
        this.$router.back()
      },
      scroll(position) {
        this.scrollY = position.y
      }
    },
  watch: {
      scrollY(newY) {
        const diffHeight = -this.diff
        if(newY<0 && newY>diffHeight){
           this.$refs.layer.style.transform = `translate3d(0,${newY}px,0)`
        }
        else {
          return
          }
      }
  }
}
</script>


<style lang="less" scoped>
@import url('../../common/less/base.less');
@fliter: rgba(0,0,0,.20);
.position(@position;@top;@left;@z-index){
    position: @position;
    top: @top;
    left: @left;
    z-index: @z-index;
}
.layer{
  position: relative;
  z-index: 0;
  height: 100%;
}
.list{
   background: @bgcolor;
   height: 90vh;
   overflow:hidden;
}
.detail-playlist{
  .position(@position:fixed;@top:0;@left:0;@z-index:100);
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: @bgcolor;
}
.singer-name{
  .position(@position:absolute;@top:0;@left:0;@z-index:9999);
  width: 100%;
  height: 40px;
  background: @fliter;
  .font(@color: @maincolor;@lineheight: 40px;@fontsize: 1.1rem);
  text-align: center;
}
.singer-avatar{
  position: relative;
  z-index: 0;
  width: 100%;  
  height: 0;
  padding-top: 70%;
  background-size: cover;
}
.fliter{
  .position(@position:absolute;@top:0;@left:0;@z-index:99);
  width: 100%;
  height: 100%;
  background: @fliter;
}
.back{
  .position(@position:absolute;@top:50%;@left:20px;@z-index:999);
  transform: translate(-50%, -50%);
}
.singer-song{
  padding: 10px 16px;
  .flex(@direction :row);
  .textcut();
}
.song{
  display: inline-block;
}
.song>h3{
  .textcut();
  .font(@color: @fontcolor;@lineheight: 30px;@fontsize: 1rem);
  font-weight: normal;
}
.song>span{
  .font(@color: @lingtfontcolor;@lineheight: 20px;@fontsize: .8rem);
  padding-right: 6px;
}
.play{
  .position(@position:absolute;@top:88%;@left:50%;@z-index:99);
  transform: translate(-50%, -50%);
  background: @maincolor;
  width: 120px;
  padding: 6px 12px;
  border-radius: 20px;
  text-align: center;
  .font(@color: #ffffff;@lineheight: normal;@fontsize: .9rem);
}
.play>span{
  font-size: 1.0rem;
  padding-right: 4px;
}
.ranking{
  padding: 3px 10px 0 0;
  display: inline-block;
  .font(@color: @fontcolor;@lineheight: normal;@fontsize: 1.1rem);
}
.top3{
  color:@maincolor;
}

</style>

<template>
    <div class="recomend">
        <scroll ref="scroll" class="recommend-content" :data="dissdata">
            <div class="contain">
                <div v-if="sliderdata.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                            <div v-for="item in sliderdata" class="slider-item">
                                <a :href="item.linkUrl">
                                    <img :src="item.picUrl">
                                </a>
                            </div> 
                    </slider>
                </div>
                <div class="diss-wrapper clrfix" v-if="dissdata.length">
                    <p class="diss_title">热门歌单推荐</p>
                    <div class="diss-item" v-for="item in dissdata">
                        <div class="img_wrap">
                            <img v-lazy="item.imgurl">
                        </div>
                        <div class="intro_wrap">
                            <p class="dissname">{{item.dissname}}</p>
                            <p class="name">{{item.creator.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading-wrapper" v-show="!dissdata.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getSliderdata, getDissdata} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
    components:{
        Slider,
        Scroll,
        Loading
    },
    data() {
       return {
           sliderdata: [],
           dissdata: []
       }
    },
    created() {
      this._getSliderdata()
      this._getDissdata()
    },
    methods: {

      _getSliderdata () {
        getSliderdata().then((res) => {
                if(res.code == ERR_OK) {
                 this.sliderdata = res.data.slider
            }
          })
      }, 
      _getDissdata () {
          getDissdata().then((res) => {
           if(res.code == ERR_OK) {
                 this.dissdata = res.data.list
            } 
        })   
      }
    }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
 .diss_title{
     .font(@color: @fontcolor;@lineheight: 40px;@fontsize: 1rem);
     height: 40px;
     text-align: center;
 }
 .diss-item{
    float: left;
    width: calc(50% - 10px);
    margin: 0 5px;
    margin-bottom:  10px;
    background-color: #ffffff;
 }
 img{ 
    width: 100%;
 }
 .intro_wrap{
    padding: 0 8px 5px;

 }
 .dissname{
    .font(@color: @fontcolor;@lineheight: 20px;@fontsize: .9rem);
    .textcut();
    margin: 0;
    padding: 4px 0;
 }
 
 .name{
    .font(@color: @lingtfontcolor;@lineheight: 10px;@fontsize: .8rem);
    .textcut();
    margin: 0;
    padding: 4px 0;
 }


</style>
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
                <div class="diss-wrapper" v-if="dissdata.length">
                    <p class="diss_title">热门歌单推荐</p>
                    <div class="diss-item" v-for="item in dissdata">
                        <div class="img_wrap">
                            <img :src="item.imgurl">
                        </div>
                        <div class="intro_wrap">
                            <span class="dissname">{{item.dissname}}</span>
                            <span class="name">{{item.creator.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import {getSliderdata, getDissdata} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
    components:{
        Slider,
        Scroll
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
     .font(@color: @fontcolor;@lineheight: 50px;@fontsize: 1rem);
     height: 50px;
     text-align: center;
 }
 .diss-item{
    .flex(@direction:row);
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 20px 20px 20px;
 }
 img{ 
    flex: 0 0 60px;
    -ms-flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
 }
 .intro_wrap{
    .flex(@direction:column);
    justify-content: center;
     align-content:center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    .font(@color: @fontcolor;@lineheight: 20px;@fontsize: .9rem);
 }
 .name{
    .font(@color: @lingtfontcolor;@lineheight: 36px;@fontsize: .8rem)
 }


</style>
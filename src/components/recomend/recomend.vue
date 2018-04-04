<template>
    <div class="recomend">
        <div class="wrapper">
            <div class="content"> 
               <div v-if="sliderdata.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                            <div v-for="item in sliderdata" class="slider-item" >
                                <a :href="item.linkUrl">
                                    <img :src="item.picUrl">
                                </a>
                            </div> 
                    </slider>
               </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>

</style>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getSliderdata} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
    components:{
        Slider
    },
    data() {
       return {
           sliderdata: []
       }
    },
    created() {
      this._getSliderdata()
    },
    methods: {
      _getSliderdata () {
        getSliderdata().then((res) => {
                if(res.code == ERR_OK) {
                 this.sliderdata = res.data.slider
            }
          })
      }
    }
}
</script>

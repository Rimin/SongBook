<template>
   <div class="singer">
       <singerlist></singerlist>
   </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Singerlist from 'base/singerlist/singerlist'
import {ERR_OK} from 'api/config'
import {getSinger} from 'api/singer'
const HOT_SINGER = 10
export default {
    components:{
        Singerlist,

    },
    data() {
        singer: []
    },
     created() {
     
    },
    methods: {
        _getSinger () {
            getSinger().then((res) => {
                if(res.code === ERR_OK) {
                    this.normalizedata(res.data.list)
                }
            })
        },
        normalizedata (data) {
            let reg = '^[A-Z]+$',
                map = {
                    hot: {
                        index: '热门',
                        group: []
                    }
                }
                arr1 = [],
                arr2 = [];
            data.forEach(function(item){
               if(reg.test(item.Findex)){
                   if(!map[item.Findex]){
                       map[item.Findex] = {
                           index: item.Findex,
                           group: []
                       };
                       map[item.Findex].group.push(new Singer({

                       }))
                   }
               }
               else return
           })

        },
    }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');

</style>

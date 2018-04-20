<template>
   <div class="singer">
       <singerlist :data ="singer" @select="selectSinger" ref="list"></singerlist>
       <router-view></router-view>
   </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Singerlist from 'base/list/list'
import {ERR_OK} from 'api/config'
import {getSinger} from 'api/singer'
import Singer from 'common/js/singer.js'
const HOT_SINGER = 10
const HOT = '热门'
export default {
    components:{
        Singerlist,

    },
    data() {
        return{
            singer: []
        }
    },
     created() {
         this._getSinger()
    },
    methods: {
        selectSinger (item){
            this.$router.push({ path: `/singer/${item.id}`})  
        },
        _getSinger () {
            getSinger().then((res) => {
                if(res.code === ERR_OK) {
                    this.singer =  this.normalizedata(res.data.list)
                }
            })
        },
        normalizedata (data) {
             let  map = {
                    'hot': {
                        index: HOT,
                        group: []
                    }
                },
                arr1 = [],
                arr2 = [];
            data.forEach(function(item, index){
               if(/^[A-Z]+$/.test(item.Findex)){
                   if(!map[item.Findex]){
                       map[item.Findex] = {
                           index: item.Findex,
                           group: []
                       };
                       map[item.Findex].group.push(new Singer(item.Fsinger_name, item.Fsinger_mid))
                   }
                   else { map[item.Findex].group.push(new Singer(item.Fsinger_name, item.Fsinger_mid)) }
               }
               if(index < HOT_SINGER){
                   map['hot'].group.push(new Singer(item.Fsinger_name, item.Fsinger_mid))
               }
           })
            for(let key in map){
                if(/^[A-Z]+$/.test(key)) {arr2.push(map[key])}
            }
            arr2.sort(function(a,b){return a.index.charCodeAt(0) - b.index.charCodeAt(0) })
            arr1.push(map['hot'])
            return  arr1.concat(arr2)
        },
    }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');

</style>

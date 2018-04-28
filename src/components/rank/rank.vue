<template>
  <div class="rank">
    <scroll class="list">
       <div class="contain">
           <div class="rank-list" v-for="item in rank" @click="selectRank(item)">
               <div class="rank-item">
                   <img v-lazy='item.picUrl'>
                   <div class="rank-preview" >
                       <span v-for="(song, index) in item.songList">{{index+1}}.{{song.songname}}-{{song.singername}}</span>
                   </div>
               </div>
           </div>
        </div> 
    </scroll>
    <div class="loading-wrapper" v-show="!rank.length">
        <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {ERR_OK} from 'api/config'
import {getRankList} from 'api/rank'
import { mapMutations } from 'vuex'

export default {
  components:{
      Scroll,
      Loading
  },
  created() {
      this._getRankList()
  },
  data() {
      return {
          rank: []
      }
  },
  methods: {
       ...mapMutations({
            storeRank: 'STORE_RANK'
        }),
      _getRankList() {
        getRankList().then((res) => {
            if(res.code === ERR_OK){
                console.log(res.data.topList.slice(0,11))
                this.rank = res.data.topList.slice(0,11)
            }
        })
      },
      selectRank(item){
          this.$router.push({path: `/rank/${item.id}`})
          this.storeRank(item)
      }
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');

.rank-item{
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
}
.rank-item > img{
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
}
.rank-preview{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    height: 100px;
    overflow: hidden;
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: .9rem);
    background: #ffffff;
}
.rank-preview > span{
     .textcut()
}

</style>

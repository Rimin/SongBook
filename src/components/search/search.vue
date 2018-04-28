<template>
  <div class="search">
      <div class="search-box">
          <i class="fa fa-search"></i>
          <input placeholder="搜索歌曲、歌手" v-model="search_value">
          <i class="empty fa fa-close" v-show="search_value" @click="empty"></i>
      </div>
      <div class="search-hot" >
         <h3>热门搜索</h3>
         <span v-for="item in hotkey" @click="hotsearch(item.k)">{{item.k}}</span>
      </div>
      <div class="search-history"></div>
      <search-list></search-list>
  </div>
</template>

<script>
import SearchList from 'base/search-list/search-list'
import {getHotKey, getSearchResult} from 'api/search'
import {ERR_OK} from 'api/config'
export default {
  components:{
    SearchList
  },
  data() {
      return {
          search_value: '',
          hotkey: []
      }
  },
  created() {
      this._getHotKey()
  },
  methods: {
      empty (){
          this.search_value = ''
      },
      _getHotKey() {
          getHotKey().then((res) => {
              if(res.code === ERR_OK) {
                 this.hotkey = res.data.hotkey.slice(0, 12)
              }
          })
      },
      hotsearch(key) {
          this.search_value = key
      }
  }

}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.search-box{
    .flex(@direction:row);
    margin: 10px 30px;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    .font(@color: @lingtfontcolor;@lineheight: 60px;@fontsize: 1.2rem);
}
.search-box > input{
    height: 30px;
    line-height: 30px;
    padding: 4px;
    width: 80%;
    border: none;
    -webkit-appearance: none;
    font-size: 14px;
}
.search-box > i{
   color: #7a7a7a99;
   padding: 0 8px;
}
.search-hot{
    margin: 20px 30px;
}
.search-hot>h3{
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: 1rem);
     padding-bottom: 16px;
}
.search-hot>span{
    display: inline-block;
    padding: 5px 12px;
    margin: 0 8px 10px 0;
    border-radius: 99px;
    background: #ffffff;
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: .9rem);
}
</style>

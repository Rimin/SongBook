<template>
  <div class="search">
      <div class="search-box" ref="search_box">
          <i class="fa fa-search"></i>
          <input placeholder="搜索歌曲、歌手" v-model="search_value">
          <i class="empty fa fa-close" v-show="search_value" @click="empty"></i>
      </div>
      <div class="search-hot" >
         <h3>热门搜索</h3>
         <span v-for="item in hotkey" @click="hotsearch(item.k)">{{item.k}}</span>
      </div>
      <div class="search-history" v-show="history.length!=0">
          <h3>搜索历史<i class="fa fa-trash-o" @click="deletHistory()"></i></h3>
          <p v-for="item in history">{{item}}<i class="fa fa-close" @click="deletHistory(item)"></i></p>
      </div>
      <search-list :query="search_value" v-show="search_value!=''" @setHistory="setHistory"></search-list>
  </div>
</template>

<script>
import SearchList from 'components/search-list/search-list'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
const SEARCH_HISTORY = 'SEARCH_HISTORY'
export default {
  components:{
    SearchList
  },
  data() {
      return {
          search_value: '',
          hotkey: [],
          history: []
      }
  },
  created() {
      this._getHotKey()
      this.getHistory()
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
    },
    setHistory(name) {
        let flag = true
        this.history.forEach(function(el){
            if(el===name)  { 
                flag = false
                return false
            } 
        });
        flag && this.history.push(name) && localStorage.setItem(SEARCH_HISTORY, JSON.stringify(this.history))
    },
    getHistory() {
        let history =  JSON.parse(localStorage.getItem(SEARCH_HISTORY))
        this.history = history ? history : []  
    },
    deletHistory(item){
        if(item){
            this.history.forEach((el,i) => { // 箭头函数的this指向
                if(el === item){
                    this.history.splice(i, 1)
                    console.log(this.history)
                    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(this.history))
                    return
                }
            })
        }
        else{
              this.history = [] 
              localStorage.removeItem(SEARCH_HISTORY); 
            }
    }
  }

}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
@iconcolor: rgba(0,0,0,.3);
.search-box{
    .flex(@direction:row);
    margin: 10px @searchmargin;
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
   color: @iconcolor;
   padding: 0 8px;
}
.search-hot, .search-history{
    margin: 20px @searchmargin;
}
.search-hot>h3, .search-history>h3{
    .font(@color: @fontcolor;@lineheight: normal;@fontsize: 1rem);
    font-weight: normal;
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
.search-history h3 > i{
    float: right;
}
.search-history > p{
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: .9rem);
    padding-bottom: 2px;
}
.search-history p > i{
    .font(@color: @iconcolor;@lineheight: normal;@fontsize: .9rem);
    float: right ;
}
</style>

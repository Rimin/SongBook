<template>
 <div class="search-list" ref="search_list">
    <scroll  @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType" 
            ref="list" 
            class="list"
            @data="result"> 
        <div class="contain result-list">
            <div class="result-item" v-for="item in result">
                <i :class="[{'fa fa-user-o': !item.singer}, {'fa fa-music': item.singer}]"></i>
                <span v-if="item.singer">{{item.name}}-{{item.singer}}</span>
                <span v-if="!item.singer">{{item.name}}</span>
            </div>
            <loading v-show="!noresult&&currentpage<totalpage"></loading>
        </div>
    </scroll>
    <div v-show="noresult" class="noresult"><i class="fa fa-search"></i>没有搜索到相关匹配结果</div>
</div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getSearchResult} from 'api/search'
import {ERR_OK} from 'api/config'
import {Singer, Song} from 'common/js/singer.js'
const QUERY_ERR = 'query error'

export default {
    components: {
        Scroll,
        Loading
    },
    data() {
        return{
            currentpage: 1,
            totalpage: 0,
          //  finishload: false,
            fistload: true,
            noresult: false,
            scrollY: -1,
            result: []
        }
    },
    props: {
        query:{
            type:String,
            default:''
        }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    methods: {
        scroll(position) {
            this.scrollY = position.y
        },
        _getSearchResult(){
            getSearchResult(this.query, this.currentpage).then((res) => {
                if(res.code === ERR_OK && res.message != QUERY_ERR){
                    this.normalizedata(res.data)
                    this.noresult = false
                    console.log(this.result)
                }
                else if(res.code === ERR_OK && res.message === QUERY_ERR) {
                     this.result = []
                     this.noresult = true
                }
            })
        },
        normalizedata(data){
            let res = []
            if(data.zhida.type === 2 && this.fistload === true){
                res.push(new Singer(data.zhida.singername, data.zhida.singermid))
            }
            if(data.song.list.length!=0){
                let singer = ''
               data.song.list.forEach((item, index) => {
                   if(item.singer.length>1) {
                       singer = ''
                       item.singer.forEach((el,n) => {
                           singer += n>0 ? `/${el.name}` : el.name 
                       })
                   }
                   else if(item.singer.length==1) singer = item.singer[0].name
                   res.push(new Song(item.songname, item.songmid, singer, item.albumname))
               });
            }
            if(this.fistload === true) {
                this.totalpage = data.song.totalnum > 20 ? Math.ceil(data.song.totalnum / 20) : 1
                this.finishload = false
                this.result = res
            }
            else this.result.push(res)
        }
    },
    watch:{
       query(newQuery) {
           if(newQuery!=''){
               this.currentpage = 1
               this.fistload = true
               this._getSearchResult()
            }
            else{
                this.result = []
                this.noresult = false
                return
            }
       },
       scrollY(newY){
         //  console.log(this.$refs.search_list.clientHeight+'&&'+newY)
       }

    },
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.search-list{
    position: fixed;
    width: 100%;
    top: @searchlisttop;
    bottom: 0;
    z-index: 999;
    background: @bgcolor;
}
.result-list{
    margin: 0 @searchmargin;
}
.result-item{
    padding-bottom: 20px;
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: .9rem);
    .textcut();
}
.result-item > i{
    padding-right: 8px;
}
.noresult{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    .font(@color: @lingtfontcolor;@lineheight: normal;@fontsize: .9rem);
}
</style>

<template>
 <div class="search-list" ref="search_list">
    <scroll  @scrollToEnd="scrollToEnd"
            :listen-scroll="listenScroll"
            :probe-type="probeType" 
            :pullup="pullup"
            ref="wrapper" 
            class="list"
            @data="result"> 
        <div class="contain result-list" ref="result_list">
            <div class="result-item" v-for="item in result">
                <i :class="[{'fa fa-user-o': !item.singer}, {'fa fa-music': item.singer}]"></i>
                <span v-if="item.singer" @click="selectSong(item)">{{item.name}}-{{item.singer}}</span>
                <span v-if="!item.singer" @click="selectSinger(item)">{{item.name}}</span>
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
import {Singer} from 'common/js/singer.js'
import {Song, getSingerName} from 'common/js/song.js'
import { mapMutations } from 'vuex'
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
            noresult: false,
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
        this.pullup = true
    },
    methods: {
         ...mapMutations({
            storeSinger: 'STORE_SINGER'
        }),
        scrollToEnd() {
            if(this.currentpage < this.totalpage){
                this.currentpage += 1 
                this._getSearchResult()
            }
            else return
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
            if(data.zhida.type === 2 && this.currentpage === 1){
                res.push(new Singer(data.zhida.singername, data.zhida.singermid))
            }
            if(data.song.list.length!=0){
               data.song.list.forEach((item, index) => {
                   res.push(new Song(item.songname, item.songmid, getSingerName(item.singer), item.albumname, item.albummid, item.interval))
               });
            }
            if(this.currentpage === 1) {
                this.totalpage = data.song.totalnum > 20 ? Math.ceil(data.song.totalnum / 20) : 1
                this.result = res
            }
            else if(this.currentpage > 1){
               this.result = this.result.concat(res)
            }
        },
        selectSinger(item) {
            this.$router.push({ path: `/singer/${item.id}`})
            this.storeSinger(item)
            this.$emit('setHistory', item.name)
        },
        selectSong(item) {
            this.$emit('setHistory', item.name)
        }
    },
    watch:{
       query(newQuery) {
           if(newQuery!=''){
               this.currentpage = 1
               this._getSearchResult()
            }
            else{
                this.result = []
                this.noresult = false
                return
            }
       },

    },
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.list{
    height: 78vh !important;
}
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

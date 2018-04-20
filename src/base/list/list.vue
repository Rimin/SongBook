<template>
    <scroll  @scroll="scroll"
            class="list-content" 
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="data" 
            ref="list">
            <div class="contain">
                <div class="list-group" v-for="gruops in data" ref="listGroup"> 
                    <h3 class="list-tag">{{gruops.index}}</h3>
                    <div  @click="selectItem(item)" class="list-item" v-for="item in gruops.group">
                        <img class="avatar" v-lazy='item.imgurl'>
                        <span class="name">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="fix-tag" ref="fixtag" v-show="fixTag">{{fixTag}}</div>
            <div class="fix-shotcut" @touchstart.stop.prevent="shotcutTouchStart"  @touchmove.stop.prevent="shortcutTouchMove">
                <div class="shotcut-item" v-for="(item,index) in shotcutdata" :data-index="index" :class="{'current':currentIndex===index}">{{item}}</div>
            </div>
             <div class="loading-wrapper" v-show="!data.length">
                <loading></loading>
            </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getData} from 'common/js/dom'

const ITEM_HEIGHT = 18
const TAG_HEIGHT = 30
export default {
    components:{
        Scroll,
        Loading,
    },
    props: {
      data: {  // 传递给子组件
        type: Array,
        default: []
      }
    },
    data (){
        return{
            currentIndex: 0,
            scrollY: -1,
            diff: -1
        }
    },
    computed: {
        shotcutdata() {
            return this.data.map((item) => {
                return item.index.substr(0,1)
            }) 
        },
         fixTag() {
            if(this.scrollY > 0) return ''  // 顶部返回空
            return this.data[this.currentIndex] ? this.data[this.currentIndex].index:''
        },
    },
    created() {  // 不需监听其变化，可以在created里绑定
        this.probeType = 3
        this.listenScroll = true
        this.touch = {}  
        this.listHeight = []
    },
    methods:{
        selectItem(item) {
            this.$emit('select',item)
        },
        refresh() {
            this.$refs.list.refresh()
        },
        scroll(position) {
            this.scrollY = position.y
        },
        shotcutTouchStart (e){
            let touchindex = getData(e.target, 'index')   
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.touchindex  = touchindex
          
           this._scrollTo(touchindex)
        },
        shortcutTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let diff = Math.floor((this.touch.y2 - this.touch.y1) / ITEM_HEIGHT)
            let touchindex = parseInt(this.touch.touchindex) + diff
            this._scrollTo(touchindex)
        },
        _scrollTo(index) {
             if(!index && index != 0) return // 点击无字母或文字区域
             if(index < 0 ) index = 0
             else if(index > this.listHeight.length -2)  index = this.listHeight.length - 2
            this.scrollY = -this.listHeight[index] // scrollY也随之变化
            this.$refs.list.scrollToElement(this.$refs.listGroup[index], 0)
        },
        _calculateHeight() {
            this.listHeight = []
            let height = 0
            let group = this.$refs.listGroup
            this.listHeight.push(height)
            for(let i=0;i<group.length;i++){
                height += group[i].clientHeight 
                this.listHeight.push(height)
            }
        }
    },
    watch:{
        data() { // 监听当数据变化时，重新计算高度
            setTimeout(() => {
                this._calculateHeight()
            },20)
        },
        scrollY(newY) { // 间接监听滚动，滚动使scrollY变化
            const listHeight = this.listHeight
            let height1
            let height2
            if(newY > 0) {
                this.currentIndex = 0 
                return 
            }
        
            for(let i=0;i<listHeight.length-1;i++){
                height1 = listHeight[i]
                height2 = listHeight[i+1]
                if(-newY >= height1 && -newY <height2){
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
        this.currentIndex = listHeight.length - 2  // 滚动到底部
    
        },
        diff(newDiff) {
            let offset = (newDiff >0 && newDiff < TAG_HEIGHT)? newDiff - TAG_HEIGHT :0
            if(this.offset === offset) return // 避免无用的DOM操作
            this.offset = offset
            this.$refs.fixtag.style.transform = `translate3d(0,${offset}px,0)`
        }
    }

    
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.list-content{
    position: relative;
}
.list-group{
    padding-bottom: 30px;
}
.list-tag{
    height: 30px;
    padding-left: 20px;
    background: @deepbgcolor;
     .font(@color: @lingtfontcolor;@lineheight: 30px;@fontsize: .9rem);
     font-weight: normal;
}
.fix-tag{
    .list-tag();
    position: absolute;
    top: 0;
    left: 0;
    width: 100%
}
.list-item{
    .flex(@direction: row);
     padding: 20px 0 0 30px
}
.avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.name{
    margin-left: 20px;
    .font(@color: @fontcolor;@lineheight: 50px;@fontsize: 1rem);
}
.fix-shotcut{
    position: absolute;
    z-index: 30;
    right: 0;
    top: 55%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: @deepbgcolor;
    font-family: Helvetica;
     .font(@color: @lingtfontcolor;@lineheight: 19px;@fontsize: .8rem);
}
.current{
    color: @maincolor;
}
</style>

<template>
    <scroll  @scroll="scroll"
            class="list-content"  
            :data="data" 
            ref="list">
            <div class="contain">
                <div class="list-group" v-for="gruops in data"> 
                    <h3 class="list-tag">{{gruops.index}}</h3>
                    <div class="list-item" v-for="item in gruops.group">
                        <img class="avatar" v-lazy = 'item.imgurl'>
                        <span class="name">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="fix-tag">热门</div>
            <div class="fix-shotcut">
                <div class="shotcut-item" v-for="gruops in data">{{gruops.index}}</div>
            </div>
             <div class="loading-wrapper" v-show="!data.length">
                <loading></loading>
            </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
    components:{
        Scroll,
        Loading,
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },

    
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.list-content{
    position: relative;
}
.list-group{
    margin-bottom: 30px;
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

</style>

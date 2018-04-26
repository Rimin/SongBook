<template>
    <nav>
        <router-link to="/recomend">推荐</router-link>
        <router-link to="/singer">歌手</router-link>
        <router-link to="/rank">排行榜</router-link>
        <router-link to="/seach">搜索</router-link>
    </nav>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
@navheight: 40px;
nav{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    background: #fff;
}
nav a{
    flex-grow: 1;
    display: block;
    position: relative;
    height: @navheight;
    text-align: center;
    .font(@color:@lingtfontcolor; @lineheight: @navheight; @fontsize: 1rem);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

}
.router-link-active{
   color: @maincolor;
}
.router-link-active::after{
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: @maincolor;
}

</style>

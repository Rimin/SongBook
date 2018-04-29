<template>
    <div class="head" ref="head">
        <i class="logo">SongBook</i>
        <router-link to="/user">
            <i class="user fa fa-user"></i>
        </router-link>
    </div>
</template>

<script>
export default {
}
</script>


<style lang="less" scoped>
@import url('../../common/less/base.less');

 .head{
    height: @headheight;
    background: @maincolor;
 }
.logo{
    float: left;
    display: block;
    height: @headheight;
    background-image: url("@{imgurl}logo.png");
    background-size:  @headheight;
    background-repeat: no-repeat;
    .font(@color: #ffffff; @lineheight: @headheight; @fontsize: 1rem);
    text-indent: 2.6rem;
}
.user{
     .font(@color: #ffffff; @lineheight: @headheight; @fontsize: 1.6rem);
    float: right;
    padding-right: 0.8rem
}
</style>


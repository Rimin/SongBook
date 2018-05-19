<template>
    <div class="progress-bar">
        <span class="time time-l">0:00</span>
        <div class="bar-wapper">
            <div class="bar-line">
                <div class="progress"></div>
                <div class="progress-btn-wrapper">
                    <div class="progress-btn"></div>
                </div>
            </div>
        </div>
        <span class="time">{{duration}}</span>
    </div>
</template>

<script>
export default {
   props:{
       duration: {
           type: String,
           default: ''
       }
   },
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');
.progress-bar{
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
}
.time{
    flex: 0 0 30px;
    width: 30px;
    .font(@color: #ffffff;@lineheight: 30px;@fontsize: .7rem);
}
.bar-wapper{
    height: 30px;
    flex: 1;
}
.bar-line{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,0.3);
}
.progress{
    position: absolute;
    height: 100%;
    background: @maincolor;    
}
.progress-btn-wrapper{
    position: absolute;
    left: -8px;
    top: -13px;
    width: 30px;
    height: 30px;
}
.progress-btn{
    position: relative;
    top: 7px;
    left: 7px;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
    border-radius: 50%;
    background: @maincolor;
}
</style>

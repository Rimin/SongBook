<template>
  <div class="detail-playlist">
      歌手歌单
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="less" scoped>
@import url('../../common/less/base.less');
.detail-playlist{
  position:fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  width: 100vh;
  height: 100vh;
  background: @bgcolor;
  overflow: hidden;
}
</style>

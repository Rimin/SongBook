<template>
  <div id="app">
    <t-header></t-header>
    <navbar></navbar>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import THeader from 'components/t-header/t-header'
import Navbar from  'components/navbar/navbar'
import Player from 'components/player/player'
export default {
  components:{
    THeader,
    Navbar,
    Player
  }
}
</script>

<style lang="less" scoped>
</style>


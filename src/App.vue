<template>
  <div id="app">
    <t-header></t-header>
    <navbar></navbar>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import THeader from 'components/t-header/t-header'
import Navbar from  'components/navbar/navbar'

export default {
  components:{
    THeader,
    Navbar
  }
}
</script>

<style lang="less" scoped>
</style>


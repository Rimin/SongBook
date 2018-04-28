<template>
 <div class="search-list">
    <scroll  @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType" 
            ref="list" 
            class="list"> 
        <div class="contain">

        </div>
    </scroll>
</div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
    components: {
        Scroll
    },
    data() {
        return{

        }
    },
    props: {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/base.less');

</style>

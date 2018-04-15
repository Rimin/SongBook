<template>
   <div ref="wrapper" class="wrapper">
        <slot></slot>
    </div> 
</template>

<script>
import BScroll from 'better-scroll'
export default {
   name: 'scroll',
   props: {
       data: {
            type: Array,
            default: null
        },
        bounce: {
            type: Boolean,
            default: true
        },
        refreshDelay: {
            type: Number,
            default: 400
        },
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
   },
   methods: {
       _initScroll() {
            if (!this.$refs.wrapper) {
                 return
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
               // bounce: this.bounce,
                click: this.click,
                probeType: this.probeType,
                mouseWheel: false
            })
            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }

            if (this.pullup) {
            this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    this.$emit('scrollToEnd')
                }
                })
            }

            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
            }
       },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
   },
   mounted() {
    setTimeout(() => {
        this._initScroll()
    }, this.refreshDelay)
   },
   watch:{
       data() {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
       }
   }
}
</script>

<style lang="less" scoped>
.wrapper,{
     overflow: hidden;
     height: 85vh;
}
</style>

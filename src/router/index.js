import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'path';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Recomend = (resolve) => {
  import('components/recomend/recomend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}

const RankSongList = (resolve) => {
  import('components/ranksonglist/ranksonglist').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recomend' // 推荐页
    },
    {
      path: '/recomend',
      component: Recomend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankSongList
        }
      ]
    }
  ]
})

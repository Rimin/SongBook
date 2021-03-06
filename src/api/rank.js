import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getRankList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign(commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}

export function getRankSongList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign(commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topid
  })
  return jsonp(url, data, options)
}

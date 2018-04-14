import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getSinger () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  }, commonParams)
  return jsonp(url, data, options)
}

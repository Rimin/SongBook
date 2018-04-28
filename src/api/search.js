import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign(commonParams, {
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'h5',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

export function getSearchResult (query, pagenum) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign(commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    zhidaqu: 1,
    catZhida: 1,
    w: query,
    perpage: 20,
    n: pagenum,
    p: 20
  })
  return jsonp(url, data, options)
}

import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams} from './config'

export function getLyric (songmid) {
  const url = 'api/lyric'
  const data = Object.assign(commonParams, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: 1525177303240,
    songmid: songmid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongvkey (songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const fun = 'MusicJsonCallback' + (Math.random() + '').replace('0.', '')
  const data = Object.assign(commonParams, {
    hostUin: 0,
    loginUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    callback: fun,
    songmid: songmid,
    guid: '1683627508',
    filename: `C400${songmid}.m4a`
  })
  const option = {
    param: 'jsonpCallback',
    name: fun
  }
  return jsonp(url, data, option)
}

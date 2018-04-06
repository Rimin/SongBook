import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getSliderdata () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({
    uin: '1519493072',
    platform: 'h5',
    needNewCode: 1,
    _: '1522745786696'
  }, commonParams)
  return jsonp(url, data, options)
}

export function getDissdata () {
  const url = 'api/getDissdata'
  const data = Object.assign({
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }, commonParams)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

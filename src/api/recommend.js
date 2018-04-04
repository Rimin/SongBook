import jsonp from 'common/js/jsonp'
// import axios from 'axios'
import {commonParams, options} from './config'

export function getSliderdata () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({
    uin: '1519493072',
    platform: 'h5',
    needNewCode: 1,
    _: '1522745786696'
  }, commonParams)
  return jsonp(url, data, options)
}

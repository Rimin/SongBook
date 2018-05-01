import axios from 'axios'
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

import {getLyric, getSongvkey} from 'api/song'
import {ERR_OK} from 'api/config'
import { Base64 } from 'js-base64'
export class Song {
  constructor (name, id, singer, album, albummid, duration) {
    this.name = name
    this.id = id
    this.singer = singer
    this.album = album
    this.albummid = albummid
    this.duration = duration
    this.imgurl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
  // this.url = `http://dl.stream.qqmusic.qq.com/C400${id}.m4a?vkey=${this.vkey}&guid=1683627508&uin=1519493072&fromtag=66`
  }
  getAudioUrl () {
    getSongvkey(this.id).then((res) => {
      if (res.code === ERR_OK) {
        let k = res.data.items[0].vkey
        this.url = `http://dl.stream.qqmusic.qq.com/C400${this.id}.m4a?vkey=${k}&guid=1683627508&uin=1519493072&fromtag=66`
      }
    })
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
export function getSingerName (singer) {
  let name = ''
  if (singer.length === 0) name = singer[0].name
  else {
    name = ''
    singer.forEach((el, n) => {
      name += n > 0 ? `/${el.name}` : el.name
    })
  }
  return name
}

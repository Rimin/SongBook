export class Song {
  constructor (name, id, singer, album, albummid, duration) {
    this.name = name
    this.id = id
    this.singer = singer
    this.album = album
    this.albummid = albummid
    this.duration = duration
    this.imgurl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
    this.url = `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
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

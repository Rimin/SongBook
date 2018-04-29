export class Singer {
  constructor (name, id) {
    this.name = name
    this.id = id
    this.imgurl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

export class Song {
  constructor (name, id, singer, album) {
    this.name = name
    this.id = id
    this.singer = singer
    this.album = album
  }
}

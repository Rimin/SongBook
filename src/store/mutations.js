import * as types from './mutation-types'

export default {
  [types.STORE_SINGER] (state, singer) {
    this.state.singer = singer
  },
  [types.STORE_RANK] (state, rank) {
    this.state.rank = rank
  },
  // [types.STORE_SONG] (state, play) {
  //   if (Object.prototype.toString.call(play).match(/^\[object\s(.*)\]$/)[1] === 'Array') {
  //     this.state.playlist = play
  //   } else {
  //     this.state.playlist.push(play)
  //   }
  // } ,
  [types.RECORD_CURRSONGINDEX] (state, currSongindex) {
    this.state.currSongindex = currSongindex
  },
  [types.CHANGE_SHOWPLAYER] (state, showPlayer) {
    this.state.showPlayer = showPlayer
  },
  [types.SET_PLAYMODE] (state, mode) {
    this.state.mode = mode
  },
  [types.SET_PLAYINGSTATE] (state, isplay) {
    this.state.playing = isplay
  },
  [types.SET_SEQUENCELIST] (state, sequencelist) {
    this.state.sequencelist = sequencelist
  },
  [types.SET_PLAYLIST] (state, playlist) {
    this.state.playlist = playlist
  }
}

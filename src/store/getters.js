export const getSinger = state => state.singer
export const getRank = state => state.rank
export const showPlayer = state => state.showPlayer
export const playList = state => state.playlist
export const getCurrSongindex = state => state.currSongindex
export const sequencelist = state => state.sequencelist
export const getMode = state => state.mode
export const isPlaying = state => state.playing
export const currentSong = (state) => {
  return state.playlist[state.currSongindex] || {}
}

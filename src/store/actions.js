import * as types from './mutation-types'
// import { type } from 'os'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.RECORD_CURRSONGINDEX, index)
  commit(types.CHANGE_SHOWPLAYER, true)
  commit(types.SET_PLAYINGSTATE, true)
}

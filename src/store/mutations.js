import * as types from './mutation-types'

export default {
  [types.STORE_SINGER] (state, singer) {
    this.state.singer = singer
  },
  [types.STORE_RANK] (state, rank) {
    this.state.rank = rank
  }
}

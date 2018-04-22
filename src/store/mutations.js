import * as types from './mutation-types'

export default {
  [types.STORE_SINGER] (state, singer) {
    this.state.singer = singer
  }
}

import * as types from '../mutation-types'
import axios from 'axios'
// state
export const state = {
  settings: null,
  listenSetting: null
}

// getters
export const getters = {
  settings: state => state.settings,
  listenSetting: state => state.listenSetting
}

// mutations
export const mutations = {
  [types.UPDATE_PUSHER_SETTINGS] (state, settings) {
    state.settings = settings
  },
  [types.UPDATE_PUSHER_LISTEN_SETTINGS] (state, settings) {
    state.listenSetting = settings
  }
}

// actions
export const actions = {
  updateSettings ({ commit }, { settings }) {
    commit(types.UPDATE_PUSHER_SETTINGS, settings)
  },
  async fetchSettings ({ commit }) {
    const { data } = await axios.get('/api/settings/pusher')
    commit(types.UPDATE_PUSHER_SETTINGS, data.settings)
  },
  async fetchListenSettings ({ commit }) {
    const { data } = await axios.get('/api/settings/pusherListenSetting')
    commit(types.UPDATE_PUSHER_LISTEN_SETTINGS, data.settings)
  }
}

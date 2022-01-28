import * as types from '../mutation-types'
import axios from 'axios'

// state
export const state = {
  profiles: [],
  usersProfile: []
}

// getters
export const getters = {
  profiles: state => state.profiles,
  usersProfile: state => state.usersProfile
}

// mutations
export const mutations = {
  [types.UPDATE_SIMOTEL_PROFILES] (state, profiles) {
    state.profiles = profiles
  },
  [types.UPDATE_USERS_PROFILE] (state, usersProfile) {
    state.usersProfile = usersProfile
  }
}

// actions
export const actions = {
  async updateProfiles ({ commit }, profiles) {
    const { data } = await axios.put('/api/settings/simotel/profiles', { profiles })
    commit(types.UPDATE_SIMOTEL_PROFILES, data.profiles)
  },
  async fetchProfiles ({ commit }) {
    const { data } = await axios.get('/api/settings/simotel/profiles')
    commit(types.UPDATE_SIMOTEL_PROFILES, data.profiles)
  },
  async fetchUsersProfile ({ commit }) {
    const { data } = await axios.get('/api/settings/simotel/usersProfile')
    commit(types.UPDATE_USERS_PROFILE, data.data
    )
  },
  async updateUsersProfile ({ commit }, users) {
    const { data } = await axios.patch('/api/settings/simotel/usersProfile', { users })
    console.log(data)
    commit(types.UPDATE_USERS_PROFILE, data.data
    )
  }
}

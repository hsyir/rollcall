import Notifications from 'vue-notification'
import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'

import vuetify from './plugins/vuetify'

import App from '~/components/App'
import '~/plugins'

import '~/components'

try {
  window.$ = window.jQuery = require('jquery')
} catch (e) {}

Vue.config.productionTip = false

Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  vuetify,
  ...App
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('register')
  })
}

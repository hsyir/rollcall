import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import { fa } from 'vuetify/lib/locale'

export default new Vuetify({

  lang: {
    locales: { fa },
    current: 'fa',
  },
  rtl: true,
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#696969',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
})

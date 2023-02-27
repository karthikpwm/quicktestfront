// FILE: main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Loading, Notify, Dialog } from 'quasar'
import router from './router'
import store from "./store";
import VueClipboard from 'vue3-clipboard'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import './assets/sass/style.scss'
//import '/src/assets/css/bootstrap.min.css'
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)
const pinia = createPinia()

myApp.use(Quasar, {
  plugins: {
    Loading,
    Notify,
    Dialog
  },
  config: {
    loading: { /* look at QuasarConfOptions from the API card */ },
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
}).use(store)
  .use(router)
  .use(pinia)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  }).use(Vue3Lottie)
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import App from './App.vue'
import IconLoader from './components/svg/IconLoader.vue'
import './index.css'
import router from './router'
// Import the CSS for vue-toastification
import FloatingVue from 'floating-vue'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
// customization tool for toast https://vue-toastification.maronato.dev/
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2952,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true
}
app.use(pinia)
app.use(router)
app.use(Toast, options)
app.use(FloatingVue)
app.component('IconLoader', IconLoader)
app.mount('#app')

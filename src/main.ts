import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import IconLoader from './components/svg/IconLoader.vue'
import './index.css'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('IconLoader', IconLoader)
app.mount('#app')

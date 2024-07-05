import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const clientId = '721574346418-qitsfcj2okqogv4kv61i0nj571ub1m5u.apps.googleusercontent.com'

const app = createApp(App)
app.use(vue3GoogleLogin, { clientId: clientId })
app.use(createPinia())
app.use(router)

app.mount('#app')

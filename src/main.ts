import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Login from './components/Login.vue'
import ResetPassword from './components/ResetPassword.vue'
import Dashboard from './components/Dashboard.vue'
import 'bootstrap'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/reset-password', component: ResetPassword },
    { path: '/dashboard', component: Dashboard }
  ]
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
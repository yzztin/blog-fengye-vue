import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/main.css'
import { initGoogleAnalytics } from './plugins/GoogleAnalytics';

// Google Analytics 初始化
const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID
initGoogleAnalytics(googleAnalyticsId)

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')

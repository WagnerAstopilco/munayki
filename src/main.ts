import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue-multiselect/dist/vue-multiselect.css'   
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App)
app.use(router)
app.component('QuillEditor', QuillEditor)
app.component('multiselect', () => import('vue-multiselect'))

app.mount('#app')

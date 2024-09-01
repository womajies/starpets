import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from "@/router";
import { message, Modal } from 'ant-design-vue';


const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')

app.config.globalProperties.$message = message;
app.config.globalProperties.$warning = Modal.warning;

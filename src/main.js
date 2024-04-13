import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';

// import Icon from '@ant-design/icons-vue'

const app = createApp(App);
// app.use(Icon)
app.use(Antd).mount('#app');
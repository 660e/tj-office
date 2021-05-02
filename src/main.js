import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

const app = createApp(App);

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
app.use(Vant);

// global
import './styles/index.less';

app.use(router).use(store).mount('#app');

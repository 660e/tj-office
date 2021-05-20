import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

const app = createApp(App);

// vant
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';
Toast.setDefaultOptions({ forbidClick: true });
app.use(Vant);

// filters
import * as filters from './filters';
app.config.globalProperties.$filters = filters;

// global
import './styles/index.less';

app.use(router).use(store).mount('#app');

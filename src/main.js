import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/style/transition.scss' // 全局 css

Vue.use(iView);

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

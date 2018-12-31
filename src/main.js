import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/style/transition.scss' // 全局 css

import './permission' // 进入系统前权限判断

import checkPermission from '@/utils/permission'
Vue.prototype.checkPermission = checkPermission; //校验权限方法

import * as filters from '@/filters/index' // global filters
//全局注册过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
});

Vue.use(iView);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

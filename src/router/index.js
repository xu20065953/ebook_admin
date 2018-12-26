import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'

Vue.use(Router)

export const constantRouterMap = [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/views/login/login.vue')
	},
	{
		path: "/",
		component: Layout,
		redirect: 'dashboard',
		name: "dashboard",
		meta: { title: '仪表盘', icon: 'iconfont icon-yibiaopan1' },
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
				name: 'Dashboard',
				meta: { title: '仪表盘', icon: 'iconfont icon-yibiaopan' }
			}
		]
	},
];

export const asyncRouterMap = [];

export default new Router({
	mode:"hash",
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})
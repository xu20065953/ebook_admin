import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'

Vue.use(Router)

export const constantRouterMap = [
	{
		path: '/login',
		name: 'login',
		hidden: true,
		meta: {
			title: 'Login - 登录',
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
				meta: { title: '仪表盘1', icon: 'iconfont icon-yibiaopan' }
			},
		]
	},

	{
		path: "/user",
		component: Layout,
		name: "user",
		meta: { title: '用户管理', icon: 'ivu-icon ivu-icon-md-contacts' },
		children: [
			{
				path: 'user-list',
				component: () => import('@/views/user/userList'),
				name: 'user-list',
				meta: { title: '用户列表', icon: 'ivu-icon ivu-icon-ios-contact' },
			},
			{
				path: 'role-list',
				component: () => import('@/views/user/roleList'),
				name: 'role-list',
				meta: { title: '角色列表', icon: 'ivu-icon ivu-icon-md-contrast' }
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
import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions 用户的所有权限
 * @param route 当前路由
 */
function hasPermission(permissionsList, route) {
	if (route.meta && route.meta.permission) {
		return permissionsList.includes(route.meta.permission);
	} else {
		return true
	}
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, permissionsList) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route }
		if (hasPermission(permissionsList, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRouter(tmp.children, permissionsList)
			}
			res.push(tmp)
		}
	})

	return res
}

const permission = {
	state: {
		routers: constantRouterMap,
		addRouters: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		}
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				const permissionsList = data
				let accessedRouters = [];
				if (permissionsList.includes('admin')) {
					accessedRouters = asyncRouterMap
				} else {
					accessedRouters = filterAsyncRouter(asyncRouterMap, permissionsList)
				}
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		}
	}
}

export default permission

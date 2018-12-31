const getters = {
	sidebar: state => state.app.sidebar,

	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	perList: state => state.user.perList,

	permission_routers: state => state.permission.routers,
	addRouters: state => state.permission.addRouters,

}

export default getters

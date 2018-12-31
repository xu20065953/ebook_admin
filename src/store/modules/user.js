import { getToken, setToken, removeToken } from '@/utils/auth'


const user = {
	state: {
		userInfo: {
			Id: 1,
		},
		token: getToken(),
		perList: [], //权限列表
		unreadCount: 10,
		avator: '',
	},

	mutations: {
		//设置用户
		SET_USER: (state, userInfo) => {
			state.userInfo = userInfo;
		},
		//设置token
		SET_TOKEN: (state, token) => {
			state.token = token;
			setToken(token);
		},
		//设置权限
		SET_PER: (state, perList)=>{
			state.perList = perList;
		},
	},

	actions: {
		//设置用户
		UserSetInfo: ({ commit }, userInfo) =>{
			commit("SET_USER", userInfo);
		},
		//设置token
		UserSetToken: ({ commit }, token)=>{
			commit("SET_TOKEN", token);
			setToken(token);
		},
		//设置权限
		UserPermission: ({ commit }, perList)=>{
			commit("SET_PER", perList);
		},
		// 前端 登出
		FedLogOut({ commit }) {
			commit('SET_TOKEN', '')
			removeToken()
		},
	}

}

export default user
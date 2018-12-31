import Cookies from 'js-cookie'

let opened = Cookies.get("opened") == 'true' ? true : false;
console.log(opened);

const app = {
	state: {
		sidebar: {
			opened: opened,
		},
	},
	mutations: {
		TOGGLE_SIDEBAR: state => {
			state.sidebar.opened = !state.sidebar.opened;
			console.log(state.sidebar.opened)
			Cookies.set("opened", state.sidebar.opened)
		},
	},
	actions: {
		toggleSideBar({ commit }) {
			commit('TOGGLE_SIDEBAR')
		},
	}
}

export default app

import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
// import { getUserInfo, logoutApi } from '@/api/login'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
	if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
	if (!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
	if (true || getToken()) { // determine if there has token
		/* has token*/
		if (to.path.toLocaleLowerCase() === '/login') {
			next({ path: '/' })
			NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
		} else {
			if (!store.getters.userInfo.Id) { // 判断当前用户是否已拉取完user_info信息
				getUserInfo().then((resp)=>{
					let data = resp.data;
					if(data.State==1){
						store.dispatch("UserSetInfo", data.Data);
						store.dispatch("UserPermission", data.Data.Permissions);

						store.dispatch('GenerateRoutes', data.Data.Permissions).then(() => { // 根据roles权限生成可访问的路由表
							router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
							next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
						});

						//next();
						//next({ path: "/user", replace: true });
					}else {
						store.dispatch('FedLogOut');
						logoutApi();
						NProgress.done();
						// Message.error("获取用户信息失败");
						next({ path: "/login", replace: true });
					}
				}).catch((err)=>{
					NProgress.done();
					// Message.error("获取用户信息失败");
					logoutApi();
					store.dispatch('FedLogOut');
					next({ path: "/login", replace: true });
				});
				//next();

			} else {
				next();
			}
		}
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next();
		} else {
			//next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
			console.log("sc")
			next({ path: '/login', replace: true });
			NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
		}
	}
});

router.afterEach(() => {
	NProgress.done() // finish progress bar
});

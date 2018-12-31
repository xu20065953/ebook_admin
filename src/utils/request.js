import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


// create an axios instance
const service = axios.create({
	//baseURL: baseURL,
	 baseURL: '/api', // api 的 base_url
	timeout: 24 * 60 *1000 // request timeout
});

// request interceptor
service.interceptors.request.use(
	config => {
		// Do something before request is sent
		//console.log(config)
		if (store.getters.token) {
			// 让每个请求携带token-- ['Token']为自定义key 请根据实际情况自行修改
			config.headers['Authorization'] = getToken();
		}

		//自定义 Content-Type 默认是 application/json; charset=utf-8
		if(config.headers.nType){
			config.headers["Content-Type"] = config.headers.nType;
		}else {
			config.headers["Content-Type"] = "application/json; charset=utf-8";
		}
		//console.log(config)
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		let res = response.data;
		return response;
	},
	error => {
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)

export default service

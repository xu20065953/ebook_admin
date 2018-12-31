import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * 用法 v-if="checkPermission('admin')"
 */
export default function checkPermission(value) {
	if (value) {
		const perList = store.getters && store.getters.perList;
		return perList.includes(value);
	} else {
		console.error(`need permisssion! Like v-permission="checkPermission('admin')"`)
		return false
	}
}

<template>
	<div>
		<Menu theme="dark" mode="vertical" :accordion="true" width="100%" >
			<sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" />
		</Menu>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import sidebarItem from './sidebarItem'
	export default {
		name: "sidebar",
		components: {
			sidebarItem
		},
		computed: {
			...mapGetters([
				'permission_routers',
				'sidebar'
			]),
			isCollapse() {
				return !this.sidebar.opened
			},
		},
		created(){
			let _this = this;
			_this.$nextTick(()=>{
				// console.log(_this.permission_routers, 'sidebar');
			})
		}
	}
</script>

<style lang="scss" scoped>

</style>
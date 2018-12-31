<template>
	<Breadcrumb class="app-breadcrumb" separator="/">
		<BreadcrumbItem v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path" :to="item.redirect||item.path">
			<span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
			<router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
		</BreadcrumbItem>
	</Breadcrumb>
</template>

<script>
	export default {
		name: "bread",
		data() {
			return {
				levelList: null
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb()
			}
		},
		created() {
			this.getBreadcrumb()
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
				if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
					matched = [{ path: '/dashboard', meta: { title: '仪表盘' }}].concat(matched)
				}
				this.levelList = matched
				// console.log(this.$route.matched, this.levelList)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.app-breadcrumb.ivu-breadcrumb{
		display: inline-block;
		position: relative;
		top: -17px;
		margin-left:10px !important;
		.no-redirect {
			color: #97a8be;
			cursor: text;
			font-weight: normal;
		}
	}
</style>

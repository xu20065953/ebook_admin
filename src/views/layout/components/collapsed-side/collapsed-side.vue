<template>
	<div class="collapse-menu-wrap">

			<collapsed-item v-for="route in permission_routers" :key="route.name" :item="route" v-if="!route.hidden"></collapsed-item>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import collapsedItem from './collapsed-item'
	export default {
		name: "collapsed-side",
		components: {
			collapsedItem
		},
		computed: {
			...mapGetters([
				'permission_routers',
			]),
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.collapse-menu-wrap{
		color: #fff;
		.ivu-tooltip-rel, .ivu-poptip-rel{
			display: block;
			width: 64px;
			text-align: center;
			font-size: 20px;
			line-height: 40px;
		}


	}
</style>
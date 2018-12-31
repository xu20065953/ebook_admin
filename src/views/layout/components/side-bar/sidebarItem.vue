<template>
	<div class="menu-wrapper">
		<template v-if="!menuItem.hidden && menuItem.children.length==1">
			<router-link :to="menuItem.fullPath">
				<MenuItem  :name="menuItem.fullPath">
					<template v-if="menuItem.meta">
						<i v-if="menuItem.meta" :class="menuItem.meta.icon" class="menu-icon1"></i>
						<span>{{menuItem.meta.title}}</span>
					</template>
				</MenuItem>
			</router-link>
		</template>

		<Submenu v-if="!menuItem.hidden && menuItem.children.length>1" :name="menuItem.name||menuItem.path">
			<template slot="title">
				<!--<i v-if="menuItem.meta" :class="menuItem.meta.icon" class="menu-icon"></i>-->
				<i v-if="menuItem.meta" :class="menuItem.meta.icon" class="menu-icon1"></i>
				<span style="font-size: 16px" v-if="menuItem.meta">{{menuItem.meta.title}}</span>
			</template>

			<template v-for="child in menuItem.children" v-if="!child.hidden">
				<sidebar-item v-if="child.children && child.children.length>0" :key="child.path" :item="child" />
				<router-link v-else :to="child.fullPath">
					<MenuItem  :name="child.fullPath">
						<template v-if="child.meta">
							<!--<i :class="child.meta.icon" class="menu-icon"></i>-->
							<i v-if="child.meta" :class="child.meta.icon" class="menu-icon2"></i>
							<span>{{child.meta.title}}</span>
						</template>
					</MenuItem>
				</router-link>
			</template>
		</Submenu>

	</div>
</template>

<script>
	// item 路由的每一项 必须传入
	import _ from "lodash"

	export default {
		name: "sidebarItem",
		data(){
			let _this = this;
			let menuItem = _.cloneDeep(this.item);
			if(menuItem.children){
				menuItem.children = menuItem.children.filter((item)=>{
					return !item.hidden;
				});
				menuItem.fullPath = menuItem.fullPath ? menuItem.fullPath : menuItem.path;
				menuItem.children.forEach((item)=>{
					item.fullPath = menuItem.fullPath ? menuItem.fullPath + "/" + item.path : menuItem.path + "/" + item.path;
				})
			}else {
				menuItem.children = [];
			}

			console.log(menuItem, 'sidebaritem');

			return {
				menuItem: menuItem,
			}
		},
		props: {
			item: {
				type: Object,
				required: true
			},
		},
		created(){
			let _this = this;
			_this.$nextTick(()=>{
				//console.log(_this.menuItem);
			})
		}
	}
</script>

<style lang="scss">
	.menu-wrapper{
		.menu-icon1{
			margin-right: 8px !important;
			font-size: 20px;
			position: relative;
			/*top: 0px;*/
			vertical-align: middle;
		}
		.menu-icon2{
			margin-right: 6px !important;
			font-size: 16px;
			position: relative;
			top: -1px;
			vertical-align: middle;
		}
		.ivu-menu-item{
			font-size: 14px;
		}
	}
</style>
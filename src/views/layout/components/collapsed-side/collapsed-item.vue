<template>
	<div>
		<Dropdown>
			<Tooltip transfer placement="right" v-if="!menuItem.hidden && menuItem.children.length==1">
				<router-link :to="menuItem.fullPath">
					<!--{{menuItem.meta.title}}-->
					<i v-if="menuItem.meta" :class="menuItem.meta.icon" class="collapse-menu-icon"></i>
				</router-link>
				<div slot="content">
					{{menuItem.meta.title}}
				</div>
			</Tooltip>

			<Poptip  transfer placement="right-start" trigger="hover" v-if="!menuItem.hidden && menuItem.children.length>1" popper-class="menu-poptip">
				<div v-if="!showArrow">

					<i v-if="menuItem.meta" :class="menuItem.meta.icon" class="collapse-menu-icon"></i>

				</div>
				<div v-else style="position: relative; font-size: 14px;">
					{{menuItem.meta.title}}
					<Icon type="ios-arrow-forward" style="position: absolute;right: 0;top:5px;" />
				</div>
				<div slot="content">
					<template v-for="child in menuItem.children" v-if="!child.hidden">
						<collapsed-item v-if="child.children && child.children.length>0" :item="child" :show-arrow="true" ></collapsed-item>
						<router-link :to="child.fullPath" v-else>
							<span>{{child.meta.title}}</span>
						</router-link>
					</template>
				</div>
			</Poptip>

		</Dropdown>
	</div>
</template>

<script>
	import _ from "lodash"
	export default {
		name: "collapsed-item",
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

			// console.log(menuItem, 'collapsed-sidebaritem');

			return {
				menuItem: menuItem,
			}
		},
		props: {
			item: {
				type: Object,
				required: true
			},
			showArrow: {
				type:Boolean,
				default: false
			}
		},
		created(){
			let _this = this;
			_this.$nextTick(()=>{
				// console.log(_this.menuItem);
			})
		}
	}
</script>

<style lang="scss">
	.menu-poptip{
		a{
			width: 100%;
			display: block !important;
			font-size: 14px;
			line-height: 1.8;
		}
		.ivu-dropdown{
			display: block;
		}
		.ivu-poptip{
			display: block;
		}
		.ivu-poptip-rel{
			display: block;
		}
	}
	.collapse-menu-icon{
		font-size: 20px;
	}
</style>
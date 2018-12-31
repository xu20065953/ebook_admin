<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size" /></a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      // this.$emit('on-change', !this.collapsed)
	    this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
<style lang="scss">
.sider-trigger-a{
	padding: 6px;
	width: 40px;;
	height: 40px;;
	display: inline-block;
	text-align: center;
	color: #5c6b77;
	margin-top: 12px;
	i{
		transition: transform .2s ease;
		vertical-align: top;
	}
	&.collapsed i{
		transform: rotateZ(90deg);
		transition: transform .2s ease;
	}
}
</style>

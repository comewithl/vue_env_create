<style>
</style>
<template>
	<div>
		<el-tooltip  :value = "showTooltip"  v-bind="$props" manual @mouseleave.native="showTooltip = false" @mouseenter.native="showTooltip=true">
			<slot></slot>
		</el-tooltip>
		<sy-address></sy-address>
	</div>
</template>
<script>
	/**
	 * Created by hjunx on 2018/5/10.
	 */
	export default {
		name:"DefineTooltip",
		components: {},
		mounted() {
		},
		props: {
			openDelay: {
				type: Number,
				default: 0
			},
			disabled: Boolean,
			manual: Boolean,
			effect: {
				type: String,
				default: 'dark'
			},
			popperClass: String,
			content: String,
			visibleArrow: {
				default: true
			},
			transition: {
				type: String,
				default: 'el-fade-in-linear'
			},
			popperOptions: {
				default() {
					return {
						boundariesPadding: 10,
						gpuAcceleration: false
					};
				}
			},
			enterable: {
				type: Boolean,
				default: true
			},
			hideAfter: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				showTooltip:false
			}
		},
		methods: {}
	}
</script>

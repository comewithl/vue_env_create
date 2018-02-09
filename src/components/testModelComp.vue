<style>
</style>
<template>
	<div>
    <input type = "checkbox"  value="test" @change="changeValue"> 测试多选
  </div>
</template>
<script>
	/**
	 * Created by hjunx on 2018/2/9.
	 */
	export default {
	  name:"myCheckbox",
		components: {},
		mounted() {
		},
		props: {},
		data() {
			return {
        isChecked:false,
        checkValue:'',
      }
		},
		methods: {
	    changeValue(e){
	      if(e.target !== e.currentTarget){return false}
	      console.log(e.target.checked)
	      this.isChecked  = e.target.checked
      },
    }
	}
</script>

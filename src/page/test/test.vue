<style lang="less" type="text/less">
	@import "./test.less";

	.operaTable {
		height: 100%;
	}
</style>
<template>
	<div class="manaTable">
		test
	</div>
</template>
<script>
  /**
   * Created by hjunx on 2018/1/8.
   */
  import { Actions } from '@constants'

  export default {
    name: 'test',
    data(){
      return {}
    },
    mounted(){
      this.$store.dispatch(Actions.GetUserList).then(res => {
        console.log(res)
      })
    },
    methods: {}
  }
</script>

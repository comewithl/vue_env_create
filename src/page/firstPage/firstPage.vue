<style>
</style>
<template>
    <div>
      <span>firstPage</span>
      <div>
        <span >数字监控：{{timeLevelTen}}</span>
        <el-button type="primary" @click="addTime">Add</el-button>
      </div>
    </div>
</template>
<script>
	/**
	 * Created by hjunx on 2017/11/13.
	 */
	import mixinExa from "../../assets/mixinExa"
	export default {
	  mixins:[mixinExa],
    /**
     * @description  // 在渲染该组件的对应路由被 confirm 前调用
     // 不！能！获取组件实例 `this`
     // 因为当守卫执行前，组件实例还没被创建
     // but 可以在next传回调来访问实例，这是唯一一个可以传递回调的钩子守卫
     * @param to
     * @param from
     * @param next
     */
    beforeRouteEnter(to,from,next){
      console.log(to.name+'beforeRouteEnter')
      next()
      //next(vm=>{
      // //访问组件实例
      // })
    },
    /**
     * @description // 在当前路由改变，但是该组件被复用时调用
     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
     // 可以访问组件实例 `this`
     * @param to
     * @param from
     * @param next
     */
      beforeRouteUpdate(to,from,next){
        console.log(to.name+'beforeRouteUpdate',to)
        next()
      },
    /**
     * @description: 导航离开该组件的对应路由时调用,this指向当前实例
     * @param to
     * @param from
     * @param next
     */
	    beforeRouteLeave(to,from,next){
	      console.log(to.name+'beforeRouteLeave',this)
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      },
	    components: {},
		  mounted(){
        console.log("paranetMounted")
		  },
		  props: {},
		  data(){
			  return {
          time:1,
          valueName:"110"
        }
		  },
		  methods: {
        addTime(){
          this.time+=1
        },
        handleInput(event){
            const value = event.target.value;
            this.$emit('input', value);
            this.valueName = value
//            this.setCurrentValue(value);
            this.$emit('change', value);
        }
      }
	}
</script>

/**
 * mixins 混入Vue组件中
 * 1.可以访问混入组件创建的实例对象也能参照相应data
 * 2.对应钩子（生命周期）会在所混入实例前调用，注意vue生命周期对应产生的内容
 * 3.可以将通用的实例销毁都放入这个组件中。
 * 4.临时处理代码可以利用混入，避免代码污染
 *
 */
export default{
  mounted(){
    console.log("mixinExaMounted")
    this.addTimeMix()
  },
  methods:{
    addTimeMix(){
      this.time = 110
    },
  },
  /**
   * 由于是混入组件中，函数不要使用绑定当前作用域()=>的写法
   */
  computed:{
   timeLevelTen:function(){
     return this.time*10
   }
  }
}

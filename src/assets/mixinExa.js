/**
 * mixins 混入Vue组件中
 * 1.可以访问混入组件创建的实例对象也能参照相应data
 * 2.对应钩子（生命周期）会在所混入实例前调用，注意vue生命周期对应产生的内容
 * 3.可以将通用的实例销毁都放入这个组件中。
 * 4.临时处理代码可以利用混入，避免代码污染
 * 5.通用的方法调用也可以利用混入注册方法都各个组件实例中
 * 6.若混入的方法与组件实例的方法重名，混入的方法将不起作用 this.addTime
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
    addTime(){
      this.time+=2
    }
  },
  computed:{
   timeLevelTen(){
     return this.time*10
   }
  }
}

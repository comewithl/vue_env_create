<style>
</style>
<template>
	<div>
    <p>DataDraw</p>
    <el-row>
      <el-col :span="3">
        <el-input v-model="inputText"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="drawText">drawText</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="drawLiner">drawliner</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="drawPattern">drawPattern</el-button>
        <img ref="patternImg" src = "../../assets/logo.png"  height="30" alt = "" style="vertical-align: top">
      </el-col>
    </el-row>
    <canvas ref="wordCanvas" id="wordCanvas" width="800px" height="600px" ></canvas>
  </div>
</template>
<script>
	/**
	 * Created by hjunx on 2018/3/5.
	 */
	import Vue from 'vue'
	export default {
		components: {},
		mounted() {
		  this.canvasDom = this.$refs["wordCanvas"]
		},
		props: {},
		data() {
			return {
        inputText:"11",
        canvasDom:""
      }
		},
		methods: {
      /**
       *
       */
      drawText(){
        let canvasWidth = this.canvasDom.width
        let canvasHeight =this.canvasDom.height
        let wordCanvas = this.canvasDom.getContext("2d")
        let my_gradient = wordCanvas.createLinearGradient(0,0,canvasWidth,canvasHeight)
        let wordWidth
        let wordHeight = 15
        wordCanvas.clearRect(0,0,canvasWidth,canvasHeight)
        //ctx.addColorStop（比例，颜色）
        my_gradient.addColorStop(0,"green")
        my_gradient.addColorStop(1,"white")
        wordCanvas.font = wordHeight+"px Arial"
        wordCanvas.clearRect(0,0,canvasWidth,canvasHeight)
//      wordCanvasDom.font = "dataDraw"
        wordCanvas.strokeStyle = my_gradient
        wordWidth = Math.ceil(wordCanvas.measureText(this.inputText).width)
        wordCanvas.strokeText(this.inputText,wordWidth,wordHeight)
      },
      /**
       *
       */
      drawPattern(){
        let canvasWidth =this.canvasDom.width
        let canvasHeight =this.canvasDom.height
        let patternImg  = this.$refs["patternImg"]
        let wordCanvas = this.canvasDom.getContext("2d")
        let pattern  = wordCanvas.createPattern(patternImg,'repeat')
        wordCanvas.clearRect(0,0,canvasWidth,canvasHeight)
        wordCanvas.rect(0,0,150,100)
        wordCanvas.fillStyle = pattern
        wordCanvas.fill()
      },
      /**
       *
       */
      drawLiner(){
        let canvasWidth =this.canvasDom.width
        let canvasHeight =this.canvasDom.height
        let wordCanvas = this.canvasDom.getContext("2d")
        let my_gradient = wordCanvas.createLinearGradient(0,0,canvasWidth,canvasHeight)
        wordCanvas.clearRect(0,0,canvasWidth,canvasHeight)
        //ctx.addColorStop（比例，颜色）
        my_gradient.addColorStop(0,"black")
        my_gradient.addColorStop(1,"white")
        wordCanvas.shadowBlur = 20
        wordCanvas.shadowColor = "#00ff00"
        wordCanvas.fillStyle = my_gradient
        wordCanvas.fillRect(0,0,canvasWidth-20,canvasHeight-20)
      }
    }
	}
</script>

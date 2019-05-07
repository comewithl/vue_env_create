<style lang="less" type="text/less" scoped>
	.canvasTarget {
		width: 500px;
		height: 500px;
	}
</style>
<template>
	<div id='testCanvasContanier'>
		<div ref="canvasTarget" class="canvasTarget">
			<img src="https://servu-qdfile.oss-cn-hangzhou.aliyuncs.com/rights/%E6%96%B0%E5%B9%B4BANNER360-180.jpg" alt="">
			<hello-word></hello-word>
		</div>
	</div>
</template>
<script>
  /**
   * Created by hjunx on 2019/5/6.
   */
  import HelloWord from '@components/HelloWorld.vue'
  import HtmlToCanvas from 'html2canvas'

  export default {
    components: { HelloWord },
    mounted() {
      this.convertToImage(this.$refs.canvasTarget)
//      HtmlToCanvas(this.$refs.canvasTarget).then(canvas => {
//        document.querySelector('#testCanvasContanier').appendChild(canvas)
//      })
    },
    props: {},
    data() {
      return {}
    },
    methods: {
      convertToImage(wrapDom) {
        const shareContent = wrapDom
        const width = shareContent.offsetWidth // 获取dom 宽度
        const height = shareContent.offsetHeight // 获取dom 高度
        const canvas = document.createElement('canvas') // 创建一个canvas节点
        const scale = 2 // 定义任意放大倍数 支持小数
        canvas.width = width * scale // 定义canvas 宽度 * 缩放
        canvas.height = height * scale // 定义canvas高度 *缩放
        canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
        const opts = {
          scale, // 添加的scale 参数
          canvas, // 自定义 canvas
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width * scale, // dom 原始宽度
          height: height * scale,
          useCORS: true // 【重要】开启跨域配置
        }
        HtmlToCanvas(shareContent, opts).then(function(reCanvas) {
          const context = reCanvas.getContext('2d')
          // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false
          context.webkitImageSmoothingEnabled = false
          context.msImageSmoothingEnabled = false
          context.imageSmoothingEnabled = false

          // 【重要】默认转化的格式为png,也可设置为其他格式
//          const img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height)

          document.body.appendChild(reCanvas)

//          $(img).css({
//            'width': canvas.width / 2 + 'px',
//            'height': canvas.height / 2 + 'px'
//          }).addClass('f-full')
        })
      },
      getBase64Image(img, width, height) {
        const canvas = document.createElement('canvas')
        canvas.width = width ? width : img.width
        canvas.heihgt = height ? height : img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL()
      },
    }
  }
</script>

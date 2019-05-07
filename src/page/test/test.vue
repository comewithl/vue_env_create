<style lang="less" type="text/less">
	@import "./test.less";

	.operaTable {
		height: 100%;
	}
</style>
<template>
	<div class="manaTable">
		test
		<a href="javascript:void(0)" @click="getCanvasBase64">下载</a>
	</div>
</template>
<script>

  /**
   * Created by hjunx on 2018/1/8.
   */
  import { Actions } from '@constants'
  import Img from '../../assets/logo.png'

  export default {
    name: 'test',
    data() {
      return {
        imageUrl: Img
      }
    },
    mounted() {
      this.$store.dispatch(Actions.GetUserList).then(res => {
        console.log(res)
      })
    },
    methods: {
      getBase64Image(img, width, height) {
        const canvas = document.createElement('canvas')
        canvas.width = width ? width : img.width
        canvas.heihgt = height ? height : img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL()
      },
      getCanvasBase64() {
        const image = new Image()
        image.crossOrigin = '*'
        image.src = this.imageUrl
        if (this.imageUrl) {
          image.onload = () => {
            const aDom = document.createElement('a')
            aDom.download = true
            aDom.href = URL.createObjectURL(this.dataURLtoBlob(this.getBase64Image(image)))
            aDom.click()
          }
        }
      },
      dataURLtoBlob(dataUrl) {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
      },
      blobToDataURL(blob) {
        const a = new FileReader()
        a.readAsDataURL(blob)// 读取文件保存在result中
        a.onload = function(e) {
          const getRes = e.target.result// 读取的结果在result中
          console.log(getRes)
        }
      }
    }
  }
</script>

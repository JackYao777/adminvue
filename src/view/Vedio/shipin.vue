<template>
  <div id="video-content">
    <danmaku :data="danmaku" :src="videoUrl" @send="sendDanmaku" :width="1200"></danmaku>
  </div>
</template>

<script>
import danmaku from '@/view/Vedio/danmaku.vue'
export default {
  name: 'App',
  components: { danmaku },
  data() {
    return {
      danmaku: [],
      videoUrl: 'https://stupid-dragon.oss-cn-beijing.aliyuncs.com/vue-video-danmaku/d.mp4'
    }
  },
  mounted() { this.getDanmaku() },
  methods: {
    getDanmaku() {
      // 请自己实现从服务器获取弹幕
      this.$axios.get('https://parva.cool/vue-video-danmaku/nodejs?danmaku=1').then(res => {
        console.log("getDanmaku", this.danmaku)
        this.danmaku = res.data
        console.log("getDanmaku", this.danmaku)
      })
    },
    sendDanmaku(danmu) {
      console.log("shipin", danmu)
      // 请自己实现将弹幕保存到服务器里边
      danmu = encodeURIComponent(JSON.stringify(danmu))
      this.$axios.get('https://parva.cool/vue-video-danmaku/nodejs?danmu=' + danmu)
    }
  }
}
</script>

<style>
#video-content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

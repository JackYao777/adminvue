<template>
  <div class="box" style="width: 100%;height: 100%;">
    <div class="container"
      style="display: flex;max-width: 1200px;height: 100%; justify-content:stretch;margin: auto;">
      <div style="max-width: 600px;min-width: 300px; height: 400px;margin: auto;flex:1;">
        <img src="@/assets/404_images/404.png" width="100%" height="100%" alt="404">
      </div>
      <div style="margin: auto; flex:1;">
        <div
          style="color: #1482f0; font-size: 25px; font-weight: bold;font-family:Arial, Helvetica, sans-serif;padding: 10px;">
          该页面未找到!</div>
        <div style="padding:15px;color: grey; width: 450px;">Please check that the URL you entered is correct, or click
          the button below to return to the homepage.</div>
        <div style="width: 150px;text-align: center;">
          <a href=""
            style="border-radius:100px;display: block; background: #1482f0;height: 50px;line-height: 50px; color: white;">Back
            to home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="less" scoped></style>
<template>
    <div style="display: inline-block">
      <i v-if="iconName.startsWith('el-icon')" :class="iconName" style="font-size:20px"></i>
      <svg-icon v-else :name="iconName" width="20px" height="20"></svg-icon>
    </div>
  </template>
   
  <script>
  export default {
    name: "eIcon",
    props: {
      iconName: {
        type: String,
        required: true
      }
    }
  };
  </script>
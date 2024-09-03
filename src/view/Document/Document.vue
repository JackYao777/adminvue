<template>
    <div class="app-container documentation-container">
      <a class="document-btn" target="_blank" href="https://www.donet5.com/Doc/1">SqlSugar ORM文档</a>
      <a class="document-btn" target="_blank" href="https://blog.csdn.net/weixin_43239880/article/details/130841067">nginx配置详解</a>
      <a class="document-btn" target="_blank" href="https://blog.csdn.net/weixin_42684368/article/details/136449419">minio分布式存储系统</a>
      <a class="document-btn" target="_blank" href="https://easycaching.readthedocs.io/en/latest/Redis/">分布式缓存</a>
    </div>
  </template>
  
  <script>
  import DropdownMenu from '@/components/Share/DropdownMenu'
  
  export default {
    name: 'Documentation',
  }
  </script>
  
  <style lang="less" scoped>
  .documentation-container {
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  
    .document-btn {
      flex-shrink: 0;
      display: block;
      cursor: pointer;
      background: rgb(165, 102, 102);
      color: white;
      height: 60px;
      padding: 0 16px;
      margin: 16px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
    }
  }
  </style>
  
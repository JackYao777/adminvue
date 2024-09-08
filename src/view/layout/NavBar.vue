<template>
  <!-- @open="handleOpen"
   @close="handleClose" -->
  <!-- :collapse='true' -->
  <div class="navbar" :class="{ isColl: isCollapse }">
    <h1 class="main-logo">
      <div v-viewer class="picImg">
        <img src="../../assets/logo.png" alt="" width="32">
      </div>
      <span v-show="!isCollapse">个人后台管理系统</span>
    </h1>
    <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" background-color="#304156"
      text-color="#fff" :unique-opened="true" :collapse='isCollapse' :collapse-transition="false"
      active-text-color="#ffd04b" :default-active="$route.path">

      <!-- <div v-for="item, idx in menuData" :key="idx">
        <el-submenu :index="item.path" v-if="item.children&&item.title!='首页'">
          <el-submenu :index="item.path" v-if="item.meta.menuType==1">
          <template slot="title">
            <eIcon :iconName="item.meta.icon"></eIcon>
            <span>{{ item.title }}</span>
          </template>
<el-menu-item :index="sitem.path" v-for="sitem, sidx in item.children" :key="sidx">
  <eIcon :iconName="sitem.meta.icon"></eIcon>
  {{ sitem.title }}
</el-menu-item>
</el-submenu>

<el-menu-item :index="item.path" v-else>
  <eIcon :iconName="item.meta.icon"></eIcon>
  <span slot="title">{{ item.title }}</span>
</el-menu-item>
</div> -->
      <MySubMenu :subMenu="menuData"></MySubMenu>
    </el-menu>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import eIcon from '@/components/IconPicker/eIcon.vue'
import MySubMenu from '@/components/menuTree/MySubMenu.vue'

export default {
  name: 'NavBar',
  components: { eIcon, MySubMenu },
  data() {
    return {
      // menuData: [
      //   {
      //     title: '首页'
      //   },
      //   {
      //     title: '客户管理',
      //     children: [
      //       {
      //         title: '客户档案',
      //       },
      //       {
      //         title: '拜访记录',
      //       }
      //     ]
      //   },
      //   {
      //     title: '首页'
      //   }
      // ]
    }
  },
  // computed:{
  //   ...mapState({
  //     isCollapse:state=>state.navCollapse.isCollapse
  //   })
  // }
  computed: mapState({
    // 箭头函数可使代码更简练
    isCollapse: state => state.navCollapse.isCollapse,
    menuData: state => state.menuDatas.menuData
  })

}
</script>
<style lang="less" scoped>
.navbar {
  width: 220px;
  height: 100%;
  position: relative;
  background-color: #304156;
  box-shadow: 5px 0 5px #ccc;
  transition: all .3s; //折叠效果

  .el-menu {
    border: none;
  }

  &.isColl {
    width: 64px;
  }

  img {
    vertical-align: middle;
  }

  .main-logo {
    //内边距 不够那就添加,够就缩小到指定边距
    padding: 10px 16px;

    span {
      min-width: 130px;
      color: #fff;
      font-weight: bold;
      position: absolute;
      display: inline-block;
      left: 55px;
      top: 15px;
    }

    .picImg{
      cursor: pointer;
    }
  }
}

// 解决加了div之后的样式显示效果
.isColl .el-submenu__title span,
::v-deep .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}

.el-submenu .el-menu-item {
  background-color: rgb(38, 52, 69) !important;
}

.el-menu .el-menu-item:hover,
::v-deep .el-submenu__title:hover {
  background-color: #444 !important;
}
</style>
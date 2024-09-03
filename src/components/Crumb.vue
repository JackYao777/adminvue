<template>
    <div class="crumb">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->

            <el-breadcrumb-item v-for="item,index in titles" :key="index">{{item}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    // name:'Crumb',
    data() {
        return {
            //titles的值和当前所在的路由相关
            //当前路由一发生变化,titles的值就变化
            titles:[]
        };
    },
    watch:{
        $route:{
         immediate:true,//随着路由改变,立即监听
         handler(val,oldval){
           //当前路由:this.$route
             this.titles=this.$route.meta.titles;
         }
        }
    }

}
</script>
<style lang="less" scoped>
.crumb .el-breadcrumb{
    line-height: 50px;
    font-size: 15px;
}
</style>
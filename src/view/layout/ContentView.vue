<template>
    <div class="layout-content">
        <!-- <transition name="el-fade-in-linear"> -->
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'ContentView',
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.layout-content {
    padding: 20px;
    height: 800px;
}

/* 进入的起点、离开的终点 */
.fade-transform-enter,
.fade-transform-leave-to {
    //  transform: translateX(10px);
    transform: translateX(100%);
    opacity: 0;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
    // transition: 0.5s linear;
    transition: all 0.3s;
}

/* 进入的终点、离开的起点 */
.fade-transform-enter-to,
.fade-transform-leave {
    transform: translateX(0);
    opacity: 1;
}
</style>
<template>
    <div class="layout">
        <NavBar></NavBar>
        <div class="layout-right">
            <HeaderView></HeaderView>
            <ContentView></ContentView>
        </div>
    </div>
</template>
<script>
import NavBar from './NavBar.vue'
import ContentView from './ContentView.vue'
import HeaderView from './HeaderView.vue'
export default {
    // name:'MainLayout',
    data() {
        return {}
    },
    components: {
        NavBar,
        HeaderView,
        ContentView
    }
}
</script>
<style lang="less">
.layout {
    width: 100%;
    height: 100%;
    display: flex;

    .layout-right {
        flex: 1;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        // padding-left: 220px;
    }
}
</style>
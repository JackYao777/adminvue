      <template>
        <div>
            <template v-for="menu, idx in subMenu">
                <!-- 如果是目录的话那就循环,不是目录没必要循环,直接展示数据 -->
                <el-submenu v-if="menu.meta.menuType == 1" :index="menu.path">
                    <template slot="title">
                        <!-- 自定义图标-->
                        <!-- <i :class="'iconfont icon-'+menu.imageUrl" /> -->
                        <eIcon :iconName="menu.meta.icon"></eIcon>
                        <span slot="title">{{ menu.title }}</span>
                    </template>
                    <!-- 调用自身-->
                    <MySubMenu :subMenu="menu.children"></MySubMenu>
                </el-submenu>
                <!-- 如果没有子菜单，则显示当前内容 -->
                <el-menu-item v-else :index="menu.path">
                    <!-- <i :class="'iconfont icon-'+menu.imageUrl" /> -->
                    <eIcon :iconName="menu.meta.icon"></eIcon>
                    <span slot="title">{{ menu.title }}</span>
                </el-menu-item>
            </template>
        </div>
    </template>


<script>
import eIcon from '@/components/IconPicker/eIcon.vue'
export default {
    name: 'MySubMenu',
    components: { eIcon },
    props: {
        subMenu: []
    },
    watch: {
    },
    created() {
    },
    methods: {
    }
}
</script>
<style scoped>
.isColl .el-submenu__title span,
::v-deep .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
}
</style>
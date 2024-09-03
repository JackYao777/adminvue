<template>
    <div class="tags">
        <div class="fl">
            <el-tag :disable-transitions=true class="tag" size="medium" :closable="index > 0"
                v-for="item, index in tags" :key="item.path" :effect="item.title == $route.meta.titles[$route.meta.titles.length - 1]
                    ? 'dark' : 'plain'" @click="goto(item.path)" @close="close(index)"
                @contextmenu.native.prevent="rightClickClick($event, index)">{{ item.title }}</el-tag>
            <tag-menu v-show="isShowTagsMenu" :clientX="clientX" :clientY="clientY" :clickIndex="clickIndex"
                :tagsLength="tags.length" @fn="clickMenu" />
        </div>
        <div class="fr">
            <el-dropdown @command="hdcommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="index" v-for="item,index in tmenuData" :key="index">{{item.text}}</el-dropdown-item>
                    <!-- <el-dropdown-item command="profile">关闭左侧</el-dropdown-item>
                    <el-dropdown-item command="profile">关闭右侧</el-dropdown-item>
                    <el-dropdown-item command="profile">关闭其他</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import TagMenu from '@/components/TagMenu.vue'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            isShowTagsMenu: false,
            clientX: 0,
            clientY: 0,
            clickIndex: 0,
            tags: [
                {
                    title: '首页',
                    path: '/home',
                    // isActive: true
                }
            ]
        }
    },
    components: { TagMenu },
    methods: {
        hdcommand(index) {
         this.clickMenu(index);
        },
        clickMenu(i) {
            if (i == 5) {
                this.tags = this.tags.filter(x => x.title === '首页');
                this.goto('/home');
            }
            //刷新
            else if (i == 0) {
                this.goto(this.$route.path);
            }
            //关闭当前
            else if (i == 1) {
                this.tags = this.tags.filter(x => x.path !== this.$route.path);
                this.goto(this.tags[this.tags.length - 1].path);
            }
            //关闭其他
            else if (i == 2) {
                this.tags = this.tags.filter(x => x.path === this.$route.path || x.path == '/home');
                this.goto(this.$route.path);
            }
            //关闭左侧
            else if (i == 3) {
                let currentData = this.tags.find(x => x.path === this.$route.path);
                let indexData = this.tags.indexOf(currentData);
                this.tags = this.tags.filter((item, index) => index >= indexData || item.path == '/home');
                this.goto(this.$route.path);
            }
            //关闭右侧
            else if (i == 4) {
                let currentData = this.tags.find(x => x.path === this.$route.path);
                let indexData = this.tags.indexOf(currentData);
                this.tags = this.tags.filter((item, index) => index <= indexData || item.path == '/home');
                this.goto(this.$route.path);
            }
        },
        //隐藏tagMenu
        closeMenu() {
            this.isShowTagsMenu = false;
        },
        goto(path) {
            this.$router.push(path);
            this.closeMenu();
        },
        close(i) {
            // console.log('关闭tag'+i)
            // console.log('当前tag值'+this.tags[i].title)
            // console.log('asdf',this.$route)
            // console.log('当前路由tag值'+this.$route.meta.titles[this.$route.meta.titles.length - 1])
            //先跳转,在删除，如果先删除，会影响index就会导致逻辑问题
            //如果点击关闭的是当前项，那就直接跳转到最后一个,不是则不跳
            // if (this.tags[i].title === this.$route.meta.titles[this.$route.meta.titles.length - 1]) {
            //     this.$router.push(this.tags[this.tags.length - 1].path);
            // }
            if (this.tags[i].path === this.$route.path && i !== this.tags.length - 1) {
                //跳转到最后一条数据
                this.$router.push(this.tags[this.tags.length - 1].path);
            }
            // elementui   是不是最后一项,是的话跳转到前面去
            else if (1 === this.tags.length - 1) {
                this.$router.push(this.tags[this.tags.length - 2].path);
            }
            this.tags.splice(i, 1);
            this.closeMenu();
        },
        rightClickClick(event, i) {
            // console.log('右键点击了', event, i);
            // console.log(this)
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            this.isShowTagsMenu = true;
            this.clickIndex = i;
        }
    },
    mounted() {
        //给文档添加点击事件
        document.addEventListener("click", this.closeMenu);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.closeMenu);
    },
    watch: {
        $route: {
            immediate: true,
            handler(val, oldval) {
                // console.log('路由信息新',val)
                // console.log('路由信息old',oldval)
                const bool = this.tags.find(item => {
                    return item.path == val.path;
                });
                if (!bool) {
                    this.tags.push({
                        title: val.meta.titles[val.meta.titles.length - 1],
                        path: val.path,
                        // isActive: true
                    });
                }

            }
        }
    },
    computed: {
        ...mapState({ tmenuData: state => state.tagMenuData.tmenu })
    }
}
</script>
<style lang="less" scoped>
.tags {
    padding-left: 20px;
    // margin-left: 20px;//这个也行,外边距20px
    padding-top: 5px;

    .tag {
        margin-right: 5px;
        cursor: pointer;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
        margin-right: 20px;
    }
}
</style>
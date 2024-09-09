<template>
    <div class="header">
        <div class="header-top">
            <div class="fl">
                <el-button icon="el-icon-s-fold" v-show="isShow" @click="changeShow"></el-button>
                <!-- 这里用v-if -->
                <el-button icon="el-icon-s-unfold" v-show="!isShow" @click="changeShow"></el-button>
            </div>

            <div class="fl">
                <Crumb></Crumb>
            </div>

            <div style="float: right;">
                <div class="btn-icon" @click="setFullScreen">
                    <el-tooltip effect="dark" content="全屏" placement="bottom">
                        <i class="el-icon-full-screen"></i>
                    </el-tooltip>
                </div>
                <div class="fr">
                    <div class="avatar-box">
                        <img v-viewer src="../../assets/logo.png" alt="" width="40">
                        <span> {{ userInfo.loginName }}</span>
                        <el-dropdown @command="hdcommand">
                            <i class="el-icon-arrow-down" style="cursor: pointer;"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <Tags></Tags>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import Crumb from '../../components/Crumb.vue';
import userinfo from '@/store/userinfo';
import { IMG_BASEURL } from '@/Utils/baseurl';
import Tags from '@/components/Tags.vue'
export default {
    name: 'HeaderView',
    components: { Crumb, Tags },
    data() {
        return {
            isShow: true,
            IMG_BASEURL
        }
    },
    methods: {
        setFullScreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.body.requestFullscreen.call(document.body);
                // console.log(document.getElementsByClassName('fullscreen')='red')
            }
        },
        ...mapMutations({
            changeIsColapse: 'navCollapse/changeIsCollapse'
        }),
        changeShow() {
            this.isShow = !this.isShow;
            this.changeIsColapse();
        },
        hdcommand(commandType) {
            console.log('执行了这个事件' + commandType)
            if (commandType === "logOut") {
                //清除token，清除用户信息
                localStorage.removeItem('edb-authorization-token');
                localStorage.removeItem('edb-userInfo');
                localStorage.removeItem('edb-btnInfos');
                localStorage.removeItem('ebd-capt-uuid');
                location.reload();
                // this.$router.push('/Login');
            }
            else if (commandType === "profile") {
                this.$router.push('/profile');
            }
        }
    },
    computed: {
        ...mapState({ userInfo: state => state.userInfo.userInfo })
    }
}
</script>
<style lang="less" scoped>
.header {
    height: 84px;
    background-color: white;
    box-shadow: 0px 5px 5px #ddd;
    button {
        width: 50px;
        height: 50px;
        margin: 0;
        font-size: 24px;
        padding: 12px 10px;
        border: none;
    }

    .header-top {
        height: 50px;
        box-shadow: 0px 4px 4px #eee;
    }

    .avatar-box {
        padding: 5px 20px 0 0;

        span {
            margin: 0 6px;
            color: #758eb5;
        }

        img {
            border-radius: 5px;
            vertical-align: middle;
            cursor: pointer;
        }

    }

    .fl {
        float: left;
        position: relative;
    }

    .fr {
        height: 47px;
        float: right;
    }

    .btn-icon {
        float: left;
        position: relative;
        line-height: 50px;
        cursor: pointer;
        margin: 0 5px;
        font-size: 20px;
        margin-right: 20px;
    }
}
</style>
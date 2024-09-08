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

            <div class="fr">
                <div style="float:left; line-height: 47px;"> {{userInfo.loginName}}</div>
                <!-- <div>这个没问题</div> -->
                <!-- <img :src="IMG_BASEURL+userInfo.user.img" :alt="userInfo.user.name" width="40"> -->
                <el-dropdown @command="hdcommand">
                 <div class="avatar-box" style="display: inline-block;">
                    
                    <img src="../../assets/logo.png" alt="" width="40">
                    <i class="el-icon-caret-bottom">signOut</i>
                 </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
               
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
    components: { Crumb,Tags },
    data() {
        return {
            isShow: true,
            IMG_BASEURL
        }
    },
    methods: {
        ...mapMutations({
            changeIsColapse: 'navCollapse/changeIsCollapse'
        }),
        changeShow() {
            this.isShow = !this.isShow;
            this.changeIsColapse();
        },
        hdcommand(commandType){
            console.log('执行了这个事件'+commandType)
            if(commandType==="logOut")
            {
                //清除token，清除用户信息
                localStorage.removeItem('edb-authorization-token');
                localStorage.removeItem('edb-userInfo');
                localStorage.removeItem('edb-btnInfos');
                localStorage.removeItem('ebd-capt-uuid');
                location.reload();
                // this.$router.push('/Login');
            }
            else if(commandType==="profile"){
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
        cursor:pointer;
        padding: 5px 20px 0 0;

        img {
            border-radius: 5px;
        }
    }

    .fl {
        float: left;
    }

    .fr {
        height: 47px;
        float: right;
        // border: 1px solid red;
    }
}
</style>
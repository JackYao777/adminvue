<template>
    <div class="box">
        <section class="bg"></section>
        <div class="container">
            <h1>Please Login</h1>
            <form id="ruleForm" @submit.prevent="createLogin">
                <div class="form-control">
                    <input type="text" id="userName" required value="张三">
                    <label>UserName</label>
                    <!-- <label>
            <span style="transition-delay: 0ms">E</span>
              <span style="transition-delay: 50ms">m</span>
              <span style="transition-delay: 100ms">a</span>
              <span style="transition-delay: 150ms">i</span>
              <span style="transition-delay: 200ms">l</span>
        </label> -->
                </div>

                <div class="form-control">
                    <input type="password" id="password" required value="123456">
                    <label>Password</label>
                </div>

                <div class="form-control">
                    <input type="text" id="captchcode" required style="width: 150px;display: block;">
                    <label>CaptchaCode</label>
                    <img height="40px" :src="captchcodeData.base64Image" @click="getNewCaptCode"
                        style="position: absolute;bottom:1px;right: 20px;">
                </div>
                <button class="btn" type="submit">Login</button>

                <!-- <p class="text">Don't have an account? <a href="#">Register</a> </p> -->
            </form>
        </div>
    </div>
</template>
<script>
import { validateUsername } from '@/Utils/validate';
//  import axios from 'axios';
import { GetCaptchaCodeApi, LoginApi, RemoveCaptchaApi } from '@/request/api';
import { mapMutations, mapActions } from 'vuex'
export default {
    name: "Login",
    data() {
        return {
        isLoading:false,
            ruleForm: {
                username: '张三',
                password: '123456',
                captchcode: ''
            },
            bg:null,
            currentInt:null,
            load:0,
            loadContainer:null,
            captchcodeData: {
                base64Image: '',
                captchaKey: ''
            }
        }
    },
    mounted() {
        this.bg = document.querySelector('.bg')
        this.loadContainer=document.querySelector('.container')
        this.currentInt= setInterval(this.blurring, 10)
        const labels = document.querySelectorAll('.form-control label')
        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('')
        })
    },
    methods: {
        //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
        ...mapMutations({ changeMenuData: "menuDatas/changeMenuData" }),
        ...mapMutations({ changeButtonsInfo: "btninfos/changeButtonsInfo" }),
        ...mapActions({ asyncChangeUserInfo: 'userInfo/asyncChangeUserInfo' }),
        ...mapActions({ asyncChangeRoleInfos: 'roleInfos/asyncChangeRoleInfos' }),
        //     validateUsername(rule, value, callback){
        //         console.log(value)
        //         if (value === '') {
        //       callback(new Error('请再次输入用户名'));
        //     } else if (value.length<3||value.length>20) {
        //       callback(new Error('用户名长度必须是3到20之间!'));
        //     } else {
        //       callback();
        //     }
        //   },

        async createLogin() {
            if(this.isLoading) return;
            this.isLoading=true;
            this.ruleForm.username = document.getElementById('userName').value;
            this.ruleForm.password = document.getElementById('password').value;
            this.ruleForm.captchcode = document.getElementById('captchcode').value;
            await LoginApi({ UserName: this.ruleForm.username, Captcha: this.ruleForm.captchcode, Password: this.ruleForm.password, CaptchaKey: localStorage.getItem('ebd-capt-uuid') }).then(
                async res => {
                    if (!res) {
                        setTimeout(() => {
                        this.isLoading=false;
                       },2000);
                       return;
                    }
                    if (res.success) {
                        this.$Message({
                            message: '登录成功',
                            type: 'success',
                            duration: 2000
                        })
                        // 提示用户登录成功
                        // 清除uuid
                        localStorage.removeItem('ebd-capt-uuid');
                        console.log('登录成功', res)
                        // 保存token
                        localStorage.setItem('edb-authorization-token', res.data.token);

                        await this.asyncChangeUserInfo({ adminId: res.data.loginUserId });
                        await this.asyncChangeRoleInfos({});
                        this.changeButtonsInfo();
                        // 跳转首页
                        await this.$router.push('/');
                        
                       setTimeout(() => {
                        this.isLoading=false;
                       },2000);
                    }
                });
        },
        async getCaptchCode() {
            await GetCaptchaCodeApi().
                then(
                    res => {
                        console.log(res)
                        if (!res) return;
                        this.captchcodeData.base64Image = res.data.base64Image;
                        localStorage.setItem('ebd-capt-uuid', res.data.captchaKey);
                        this.captchcodeData.captchaKey = res.data.captchaKey;

                    }
                );
        },
        async getNewCaptCode() {
            console.log(this)
            await RemoveCaptchaApi(this.captchcodeData.captchaKey);
            this.getCaptchCode();
        },
        async submitForm(formName) {
          
        },
        scale(num, in_min, in_max, out_min, out_max) {
            return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        },
        blurring() {
            this.load++
            // console.log(this.load)
            if (this.load > 99) {
                clearInterval(this.currentInt)
            }

            // this.loadText.innerText = `${this.load}%`
            this.loadContainer.style.filter =`blur(${this.scale(this.load, 0, 100, 30, 0)}px)`
            this.bg.style.filter = `blur(${this.scale(this.load, 0, 100, 30, 0)}px)`
        }
    },
    created() {
        // 验证码请求
        this.getCaptchCode();
        //清除menuData数据
        this.changeMenuData([]);

        //登录前得清除之前用户得路由数据
    },
}
</script>
<style lang="less" scoped>
.box {
    // background: url(../assets/bbimggg.jpg) center top no-repeat;
    height: 100%;
    width: 100%;
    // background: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: transparent;
    z-index: -1;
    overflow: hidden;

    .bg {
        background: url(../assets/bbimggg.jpg) center center/cover;
        position: absolute;
        // top: -30px;
        // left: -30px;
        width:100%;
        height:100%;
        z-index: 1;
        filter: blur(0px);
    }
    .container {
        filter: blur(0px);
        z-index: 2;
        padding: 20px;
        width: 300px;
        height: fit-content;
        border: 1px solid rgb(86, 142, 207);
        text-align: center;
        border-radius: 5px;
        background-color: rgba(45, 65, 175, 0.4);

        h1 {
            display: block;
            font-size: 2em;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
        }

        .btn {
            cursor: pointer;
            display: inline-block;
            width: 100%;
            background: lightblue;
            padding: 15px;
            font-family: inherit;
            font-size: 16px;
            border: 0;
            border-radius: 5px;
        }

        .btn:focus {
            outline: 0;
        }

        .btn:active {
            transform: scale(0.98);
        }

        .text {
            margin-top: 30px;
        }

        .form-control {
            position: relative;
            margin: 20px 0 40px;
            width: 300px;
        }

        .form-control input {
            background-color: transparent;
            border: 0;
            border-bottom: 2px #fff solid;
            display: block;
            width: 100%;
            padding: 15px 0;
            font-size: 18px;
            color: #fff;
        }

        .form-control input:focus,
        .form-control input:valid {
            outline: 0;
            border-bottom-color: rgb(161, 96, 34);
        }

        .form-control label {
            position: absolute;
            top: 15px;
            left: 0;
            pointer-events: none;
        }

        .form-control label span {
            display: inline-block;
            font-size: 18px;
            min-width: 5px;
            transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .form-control input:focus+label,
        .form-control input:valid+label {
            color: rgb(204, 102, 7);
            transform: translateY(-30px);
        }

        .capter-box {
            display: flex;

            img {
                margin-left: 20px;
            }
        }
    }
}
</style>
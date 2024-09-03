<template>
    <div class="login-page">
        <div class="login-box">
            <h1>后台管理项目</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="'密\xa0\xa0\xa0\xa0码'" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captchcode">
                    <div class="capter-box">
                        <el-input v-model.type="ruleForm.captchcode"></el-input>
                        <img height="40px" :src="captchcodeData.base64Image" @click="getNewCaptCode">
                    </div>

                </el-form-item>
                <el-form-item id="btn-box">
                    <el-button class="btn-login" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
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
            ruleForm: {
                username: '张三',
                password: '123456',
                captchcode: ''
            },
            rules: {
                username: [
                    // {
                    //     required:true,
                    //     message:"用户名不能为空!",
                    //     trigger:"blur"
                    // },
                    { validator: validateUsername, trigger: 'blur', required: true }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空!",
                        trigger: "blur"
                    }
                ],
                captchcode: [
                    {
                        required: true,
                        message: "验证码不能为空!",
                        trigger: "blur"
                    }
                ]
            },
            captchcodeData: {
                base64Image: '',
                captchaKey: ''
            }
        }
    },

    methods: {
        //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
        ...mapMutations({ changeMenuData: "menuDatas/changeMenuData" }),
        ...mapActions({ asyncChangeUserInfo: 'userInfo/asyncChangeUserInfo' }),
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
            await LoginApi({ UserName: this.ruleForm.username, Captcha: this.ruleForm.captchcode, Password: this.ruleForm.password, CaptchaKey: localStorage.getItem('ebd-capt-uuid') }).then(
                async res => {
                    if (!res) return;
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

                        // 跳转首页
                        await this.$router.push('/');


                    }
                });
        },
        async submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.createLogin();
                } else {
                    this.$Message({
                        message: '请输入正确的信息在提交',
                        type: 'warning',
                        duration: 1000
                    })
                    console.log('error submit!!');
                    return false;
                }
            })
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
.login-page {
    width: 100%;
    height: 100%;
    background: url(../assets/bgimg.jpg) center top no-repeat;
    position: relative;

    .login-box {
        width: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        padding-top: 20px;
        padding-right: 20px;
        background: #f1efef;
        transform: translate(-50%, -50%);
        border-radius: 10px;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
        padding-left: 20px;
        font-size: 20px;
    }

    .capter-box {
        display: flex;

        img {
            margin-left: 20px;
        }
    }

    .btn-login {
        width: 100%;
    }

    //样式覆盖原来的
    ::v-deep #btn-box .el-form-item__content {
        margin-left: 40px !important;
    }
}
</style>

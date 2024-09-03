<template>
    <div class="login-box">
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false"
            :close-on-click-modal="false" width="500px" :close-on-press-escape=false @open="openDialog"
            @closed="closeDialog" :destroy-on-close="true">
            <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px"
                class="demo-ruleForm" style="padding-right: 30px;">
                <el-form-item label="账号" prop="loginName">
                    <!-- <template v-if="dialogTitle === '修改用户数据'">{{ this.ruleForm.loginName }}</template>
<el-input v-else v-model="ruleForm.loginName" placeholder="登录名"></el-input> -->
                    <el-input v-model="ruleForm.loginName" :disabled="dialogTitle === '修改用户数据'"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="loginPwd" v-if="dialogTitle != '修改用户数据'">
                    <el-input type="password" v-model="ruleForm.loginPwd"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="trueName">
                    <el-input v-model="ruleForm.trueName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色" prop="roleName">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item> -->
                <el-form-item label="用户角色" prop="roleIds">
                    <el-select v-model="ruleForm.tempRoleIds" multiple placeholder="请选择" style="width: 100%;">
                        <el-option v-for="item, index in roleInfos" :index="index" :label="item.roleName"
                            :value="item.roleID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <div class="bottom-box">
                    <el-form-item prop="enabled" style="float: left;">
                        <el-switch v-model="ruleForm.enabled" inactive-text="启用">
                        </el-switch>
                        <!-- &emsp;&emsp; -->
                    </el-form-item>
                    <el-form-item prop="isSuperAdministrator" style="float: left;">
                        <el-switch v-model="ruleForm.isSuperAdministrator" inactive-text="是否超级管理员">
                        </el-switch>
                    </el-form-item>
                </div>
                <!-- <el-form-item>
                  
                </el-form-item> -->
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="changeIsShow">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="dialogTitle == '修改用户数据'">保存</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else>创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { AddUserInfosApi } from '@/request/api';
export default {
    props: ['dialogFormVisible', 'changeData', 'dialogTitle', 'userInfo', 'clearUserInfo'],
    data() {

        var checkLoginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号信息不能为空'));
            }
            callback();
        };
        // var checkPhone = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('电话不能为空'));
        //     }
        //     callback();
        // };
        return {
            formLabelWidth: '',
            ruleForm: {
                loginName: '',
                loginPwd: '',
                trueName: '',
                roleName: '',
                enabled: false,
                isSuperAdministrator: false,
                phone: '',
                roleIds: '',
                tempRoleIds: [],
            },
            // roleInfos: [
            //     // {
            //     //     roleId: 0, roleName: '管理员'
            //     // },
            //     // {
            //     //     roleId: 1, roleName: '开发'
            //     // },
            //     // {
            //     //     roleId: 2, roleName: '销售'
            //     // }
            // ],
            rules: {
                loginName: [
                    { trigger: 'blur', required: true, message: '登录名不能为null' }
                ],
                loginPwd: [
                    { trigger: 'blur', required: this.dialogTitle != '修改用户数据', message: '密码不能为空' }
                ],
                loginName: [
                    {
                        required: true,
                        message: '登录名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '登录名长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                trueName: [
                    {
                        required: true,
                        message: '真实姓名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '真实姓名长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^(13|15|18|14|17)[0-9]{9}$/,
                        message: '手机号码格式不正确',
                        trigger: 'blur'
                    }
                ],
            }
        };
    },
    methods: {
        closeDialog() {
            // console.log('这里关掉dialog')
        },
        openDialog() {
            if (this.userInfo === undefined) return;
            for (let x of Object.keys(this.ruleForm)) {
                console.log('这里进来了opens')
                if (
                    typeof this.userInfo === 'object' && this.userInfo != undefined
                    //&& this.userInfo > 0
                )
                // {
                //     for (let item of row.roleList) {
                //         this.dataForm.tempRoleIds.push(item.id)
                //     }
                // } else {
                {
                    this.ruleForm[x] = this.userInfo[x]
                }
                else {
                    console.log('这里进来了openss')
                }
                // }
            }
            let roleIds = [];
            if (this.userInfo.sysRoles) {
                for (let item of this.userInfo.sysRoles) {
                    if (item.roleID > 0) { roleIds.push(item.roleID); }
                }
            }
            console.log('看看', roleIds)
            this.ruleForm.tempRoleIds = roleIds;
        },
        async submitForm(formName) {
            if (this.dialogTitle === '修改用户数据') {
                await this.$refs.ruleForm.clearValidate(this.ruleForm.loginPwd);
            }

            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let resData = await AddUserInfosApi({
                        AdminID: parseInt(this.userInfo.adminID ?? 0),
                        LoginName: this.ruleForm.loginName,
                        LoginPwd: this.ruleForm.loginPwd ?? "",
                        TrueName: this.ruleForm.trueName,
                        Enabled: this.ruleForm.enabled,
                        Phone: this.ruleForm.phone,
                        IsSuperAdministrator: this.ruleForm.isSuperAdministrator ?? false,
                        RoleIds: this.ruleForm.tempRoleIds ?? []
                    });
                    console.log(resData)
                    if (!resData) return;
                    this.$Message({
                        message: '操作成功',
                        type: 'success',
                        duration: 3000
                    });
                    this.resetDislog(true);
                    //这里还要刷新主页
                } else {
                    console.log('请填写正确信息在提交数据!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeIsShow() {
            // this.userInfo={};
            // this.resetForm('ruleForm')
            // this.$emit("changeData", false)
            this.resetDislog(false);
        },
        resetDislog(obj) {
            this.$emit("clearUserInfo")
            this.resetForm('ruleForm')
            this.$emit("changeData", obj)
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        roleInfos: state => state.roleInfos.roleInfos,
    })
}
</script>
<style lang="less" scoped>
::v-deep .bottom-box .el-form-item__content {
    width: 150px !important;
}

::v-deep .bottom-box .el-form-item--feedback {
    width: 150px !important;
    margin: 0px;
}
</style>
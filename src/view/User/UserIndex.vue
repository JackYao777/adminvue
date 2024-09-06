<template>
    <div class="user-box">
        <div class="user-header">
            <el-form :inline="true" :model="userInfoQuery" class="demo-form-inline"
                @selection-change="handleSelectionChange">
                <el-form-item label="账号/姓名">
                    <el-input v-model="userInfoQuery.userName" placeholder="账号/姓名"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="userInfoQuery.roleId" placeholder="角色" clearable>
                        <!-- <el-option label="全部角色"></el-option> -->
                        <el-option v-for="item, index in roleInfos" :index="index" :label="item.roleName"
                            :value="item.roleId"></el-option>
                        <!-- <el-option label="区域二" value="beijing"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="员工状态">
                    <el-select v-model="userInfoQuery.enabled" placeholder="员工状态" clearable>
                        <!-- <el-option v-for="item, index in roleInfos" :index="index" :label="item.roleName"
                            :value="item.roleId"></el-option> -->
                        <el-option label="启用" :value=true></el-option>
                        <el-option label="禁用" :value=false></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="serach" v-if="btnDatas[0].isSHow">{{ btnDatas[0].btnName }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="user-bottom">
            <el-button type="success" icon="el-icon-plus" @click="addUser" v-if="btnDatas[1].isSHow">{{ btnDatas[1].btnName }}</el-button>
            <el-button type="info" icon="el-icon-edit" @click="editUser" v-if="btnDatas[2].isSHow">{{ btnDatas[2].btnName }}</el-button>
            <el-button type="warning" @click="initPassWord" v-if="btnDatas[3].isSHow">{{ btnDatas[3].btnName }}</el-button>
            <el-table ref="multipleTable" :data="userInfos" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="id" prop="adminID" width="120" v-if='false'>
                    <!-- <template slot-scope="scope">{{scope.row.loginName}}</template> -->
                </el-table-column>
                <el-table-column label="账号" prop="loginName">
                    <!-- <template slot-scope="scope">{{scope.row.loginName}}</template> -->
                </el-table-column>
                <el-table-column label="姓名" prop="trueName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="手机号码" prop="phone" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="角色名称" prop="roleName" align="center">
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope"><el-switch v-model="scope.row.enabled" disabled>
                        </el-switch></template>
                </el-table-column>
                <el-table-column label="创建日期" align="center">
                    <template slot-scope="scope">{{ scope.row.createTime | FormatDate }}</template>
                </el-table-column>
                <!-- <el-table-column label="修改" align="center">
                    <template slot-scope="scope"><i class='el-icon-edit'>修改</i></template>
                </el-table-column> -->
            </el-table>
            <AddUser :dialogFormVisible="dialogFormVisibless" @changeData="changeData" :dialogTitle="dialogTitle"
                :userInfo='userInfo' @clearUserInfo="clearUserInfo">
            </AddUser>
        </div>
        <div style="float: right; margin:20px 20px">
            <!-- <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination> -->
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { GetUserInfosList } from '@/request/api';
import AddUser from './AddUser.vue';

export default {
    components: { AddUser },
    data() {
        return {
            btnDatas: [{
                btnName: '搜索',
                isSHow: false,
            }, {
                btnName: '添加',
                isSHow: false,
            }, {
                btnName: '编辑',
                isSHow: false,
            }, {
                btnName: '重置密码',
                isSHow: false,
            }],
            dialogTitle: '保存用户',
            dialogFormVisibless: false,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            userInfoQuery: {
                userName: '',
                roleId: null,
                value: false,
                enabled: null
            },
            roleInfos: [
                {
                    roleId: 0, roleName: '管理员'
                },
                {
                    roleId: 1, roleName: '开发'
                },
                {
                    roleId: 2, roleName: '销售'
                }
            ],
            userInfos: [

            ],
            userInfo: {},
            multipleSelection: []
        }
    },
    methods: {
        clearUserInfo() {
            this.userInfo = {};
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.isFreshData();
            // console.log(`每页 ${this.pageIndex} 条`);
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.isFreshData();
            // console.log(`当前页: ${val}`);
        },
        async serach() {
            this.isFreshData();
            // let params = {
            //     pageIndex: this.pageIndex,
            //     pageSize: this.pageSize,
            //     Enabled: this.userInfoQuery.enabled,
            //     KeyWords: this.userInfoQuery.userName,
            //     RoleId: this.userInfoQuery.roleId
            // };
            // console.log(params);
            // let resData = await GetUserInfosList(params);
            // console.log('返回数据', resData)
            // this.userInfos = resData.data.data;
        },
        handleSelectionChange() {

        },
        addUser() {
            this.userInfo = {};
            this.dialogTitle = '添加用户';
            this.dialogFormVisibless = !this.dialogFormVisibless;
        },
        changeData(type) {
            console.log('来到了福清自己拿')
            this.dialogFormVisibless = false;
            if (type == true) {
                console.log('来到了sdf')
                this.isFreshData();
            }
        },
        handleSelectionChange(val) {
            // console.log(val);
            this.multipleSelection = val;
        },
        editUser() {
            if (this.multipleSelection.length > 1 || this.multipleSelection.length <= 0) {
                this.$Message({
                    message: '请选择一条数据进行修改',
                    type: 'warning',
                    duration: 2000
                })
                return;
            }
            this.dialogTitle = '修改用户数据';
            this.userInfo = this.multipleSelection[0];
            console.log('这里是修改的用户信息', this.userInfo)
            this.dialogFormVisibless = true;
        },
        initPassWord() {

        },
        async isFreshData() {
            let params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                Enabled: this.userInfoQuery.enabled,
                KeyWords: this.userInfoQuery.userName,
                RoleId: this.userInfoQuery.roleId
            };
            let resData = await GetUserInfosList(params);
            console.log('用户返回数据', resData)
            this.total = resData.data.dataCount;
            this.pageIndex = resData.data.pageIndex;
            this.pageSize = resData.data.pageSize;
            this.userInfos = resData.data.data;
        },
        checkBtnPemission() {
            if (this.$route.meta.btnDatas.length > 0) {
                this.$route.meta.btnDatas.map(x => {
                  let btn= this.btnDatas.find(m=>m.btnName===x.menuName);
                     if(btn)  btn.isSHow=x.enabled;
                });
            }
        },
    },
    async created() {
        await this.isFreshData();
    },
    mounted() {
        console.log('这里挂在用户页面', this.$route)
        this.checkBtnPemission();
    }
}
</script>
<style lang="less">
.user-bottom {
    margin-top: 50px;
}
</style>
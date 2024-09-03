<template>
    <div class="box">
        <div class="header-box">
            <el-form :inline="true" :model="roleInfoQuery" class="demo-form-inline"
                @selection-change="handleSelectionChange">
                <el-form-item label="角色名称">
                    <el-input v-model="roleInfoQuery.roleName" placeholder="角色名称" @click=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div class="bottom-box">
            <el-button type="primary" icon="el-icon-plus" @click="addRole">添加</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="editRole">编辑</el-button>
            <el-table ref="multipleTable" :data="roleInfos" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" :fit="true" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="60" v-if='false'>
                </el-table-column>
                <el-table-column label="id" prop="roleID" width="120" v-if='false'>
                </el-table-column>
                <el-table-column label="角色名称" prop="roleName">
                </el-table-column>
                <el-table-column label="角色代码" prop="roleCode">
                </el-table-column>
                <el-table-column label="描述" prop="roleDesc">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.enabled" disabled>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期">
                    <template slot-scope="scope">{{ scope.row.createTime | FormatDate }}</template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" size="small"
                            @click="handleEditRoleName(scope.$index, scope.row)">修改角色名</el-button> -->
                        <el-button type="text" @click="handlePower(scope.$index, scope.row)">授权</el-button>
                        <!-- <el-button type="text" size="small"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="float: right; margin:20px 20px">
            <!-- <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination> -->
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pageIndex" :page-sizes="[1, 50, 100, 200]" :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </div>

        <div class="form-box">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false" width="500px"
                @close="closeDialog" :modal=true :close-on-click-modal=false :destroy-on-close="true">
                <el-form :model="roleInfo" :rules="rules" status-icon ref="roleInfodialog" label-width="100px"
                    class="demo-roleInfo" style="padding-right: 30px;">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="roleInfo.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色代码" prop="roleCode">
                        <el-input v-model="roleInfo.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item prop="enabled" style="float: left;">
                        <el-switch v-model="roleInfo.enabled" inactive-text="启用">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog" type="info">取 消</el-button>
                    <el-button type="primary" @click="submitForm('roleInfodialog')"
                        v-if="dialogTitle != '新增'">保存</el-button>
                    <el-button type="primary" @click="submitForm('roleInfodialog')" v-else>创建</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="tree-box">
            <el-dialog :title="'授权'" :visible.sync="dialogTreeVisible" :show-close="false" width="500px" :modal=true
                :close-on-click-modal=false @opened="openTree">
                <div style="margin-bottom: 50px;">
                    <el-button type="primary" @click="setIsExpand" style="margin-bottom: 20px;">{{ isExpand ? '全部折叠' :
                        '全部展开'
                        }}</el-button>
                    <el-tree :data="treeNodeData" ref="treeData" :props="defaultProps" show-checkbox node-key="menuID"
                        :default-expanded-keys="[]" @node-click="handleNodeClick" :default-checked-keys="checkedKeys"
                        @check-change="handleCheckChange" :check-strictly="true" @check="handleCheck">
                    </el-tree>
                    <div style="float: right; margin-bottom: 10px;">
                        <el-button @click="cancelPower" type="info">取 消</el-button>
                        <el-button type="primary" @click="handlePowerSave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>

</template>
<script>
import { AddRoleInfoApi, GetRoleInfoApi, GetPowerInfoApi, GetMenuInfoApi, AddRolePowerApi } from '@/request/api';
export default {

    data() {
        return {
            handlerRole: {},
            treePowerData: [],
            treeNodeData: [],
            checkedKeys: [],
            defaultProps: {
                children: 'children',
                label: 'menuName',
                menuID: 'menuID'

            },
            isExpand: false,
            dialogTitle: '',
            dialogFormVisible: false,
            dialogTreeVisible: false,
            pageIndex: 1,
            pageSize: 1,
            total: 0,
            roleInfoQuery: {
                roleName: ''
            },
            roleInfos: [],
            roleInfo: {
                roleName: '',
                roleCode: '',
                enabled: false,
                roleID: 0
            },
            multipleSelection: [],
            rules: {
                roleName: [
                    { trigger: 'blur', required: true, message: '角色名不能为null' }
                ],
                roleCode: [
                    { trigger: 'blur', required: true, message: '角色code不能为null' }
                ],
            }
        }
    },
    methods: {
        selectChildren(data) {
            data && data.children && data.children.map(item => {
                this.$refs.treeData.setChecked(item.menuID, true);
                if (data.children) {
                    this.selectChildren(item)
                }
            });
        },
        handleCheck(data, { checkedKeys }) {
            // 节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
            //如果为取消
            if (checkedKeys.includes(data.menuID)) {
                //如果当前节点有子集
                this.selectChildren(data);
            }
        },
        handleCheckChange(data, checked, indeterminate) {
            // 节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
            //如果为取消
            if (checked === false) {
                //如果当前节点有子集
                if (data.children) {
                    //循环子集将他们的选中取消
                    data.children.map(item => {
                        this.$refs.treeData.setChecked(item.menuID, false);
                    });
                }
            } else {
                //否则(为选中状态)
                //判断父节点id是否为空
                if (data.parentID !== -1) {
                    //如果不为空则将其选中
                    this.$refs.treeData.setChecked(data.parentID, true);
                }
            }
        },
        openTree() {
            this.checkedKeys = this.treePowerData.map(x => x.powerID);
        },
        async handlePowerSave() {
            let vm = this;
            // alert('这里修改权限')
            let menuIds = vm.$refs.treeData.getCheckedKeys();
            let roleId = vm.handlerRole.roleID;
            let resData = await AddRolePowerApi({ roleId: roleId, menuIds: menuIds });
            if (!resData) return;
            this.$Message({
                message: '操作成功',
                type: 'success',
                duration: 3000
            });
            this.closeTreeDialog();
        },
        cancelPower() {
            this.dialogTreeVisible = false;
            this.isExpand = false;
        },
        // 一键折叠/展开（这里的isExpand变量需要绑定到el-tree的`default-expand-all`属性上）
        setIsExpand() {
            this.isExpand = !this.isExpand
            this.expandFunc(this.$refs.treeData.data)
        },
        // 遍历树形数据，通过设置每一项的expanded属性，实现展开与折叠
        expandFunc(data) {
            // console.log('这里的treeData是什么数据', data)
            data.forEach(item => {
                this.$refs.treeData.store.nodesMap[item.menuID].expanded = this.isExpand;
                if (item.children != undefined && item.children.length > 0) {
                    this.expandFunc(item.children)
                }
            })
        },
        handleNodeClick() { },
        async handlePower(index, row) {
            const vmObj = this;
            //这里要去请求用户的权限数据 和菜单数据
            console.log(index, row, vmObj)
            let menuPowerData = await GetPowerInfoApi({ id: row.roleID });
            // console.log('这里返回权限数据',menuPowerData);
            let menuData = await GetMenuInfoApi();
            vmObj.treeNodeData = menuData.data;
            vmObj.treePowerData = menuPowerData.data;
            vmObj.dialogTreeVisible = true;
            vmObj.handlerRole = row;
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let resData = await AddRoleInfoApi({ RoleID: this.roleInfo.roleID, RoleName: this.roleInfo.roleName, RoleCode: this.roleInfo.roleCode, Enabled: this.roleInfo.enabled });
                    if (!resData) return;
                    this.$Message({
                        message: '操作成功',
                        type: 'success',
                        duration: 3000
                    });
                    this.closeDialog();
                    this.isFreshData();
                } else {
                    console.log('请填写正确信息在提交数据!!');
                    return false;
                }
            })
        },
        cancelDialog() {
            this.closeDialog();
        },
        addRole() {
            this.roleInfo = {};
            this.dialogTitle = '新增';
            this.dialogFormVisible = true;
        },
        editRole() {
            if (this.multipleSelection.length > 1 || this.multipleSelection.length <= 0) {
                this.$Message({
                    message: '请选择一条数据进行修改',
                    type: 'warning',
                    duration: 2000
                })
                return;
            }
            this.dialogTitle = '编辑';
            this.roleInfo = JSON.parse(JSON.stringify(this.multipleSelection[0]));
            console.log('这里是修改的角色新息', this.roleInfo)
            this.dialogFormVisible = true;
        },
        search() {
            this.isFreshData();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.isFreshData();
            // console.log(`每页 ${this.pageIndex} 条`);
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.isFreshData();
        },
        async isFreshData() {
            let resData = await GetRoleInfoApi({
                KeyWords: this.roleInfoQuery.roleName,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            });
            this.total = resData.data.dataCount;
            this.pageIndex = resData.data.pageIndex;
            this.pageSize = resData.data.pageSize;
            this.roleInfos = resData.data.data;
        },
        closeDialog() {
            this.dialogFormVisible = false;
            this.$refs.roleInfodialog.resetFields();
        },
        closeTreeDialog() {
            this.dialogTreeVisible = false;
            this.handlerRole = {};
            this.treePowerData = [];
            this.checkedKeys = [];
        }
    },
    created() {
        this.isFreshData();
    }
}
</script>
<style lang="less" scoped></style>
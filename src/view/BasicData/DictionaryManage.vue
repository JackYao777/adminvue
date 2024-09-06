<template>
    <div class="dic-box">
        <div class="dic-header">
            <el-form :inline="true" :model="dicInfoQuery" class="demo-form-inline"
                @selection-change="handleSelectionChange">
                <el-form-item label="搜索条件">
                    <el-input v-model="dicInfoQuery.KeyWords" placeholder="字典名称/字典code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="serach">{{ btnDatas[0].btnName }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="dic-bottom">
            <el-button type="success" icon="el-icon-plus" @click="openDialog('添加字典数据')">添加</el-button>
            <el-table ref="multipleTable" :data="tableData.dicInfos" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column label="字典编码" prop="dicTypeCode">
                </el-table-column>
                <el-table-column label="字典名称" prop="name">
                </el-table-column>
                <el-table-column label="描述" prop="remark">
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope"><el-switch v-model="scope.row.status" disabled>
                        </el-switch></template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class='el-icon-edit'
                            @click="changeIsShowDetail(true, scope.row.dicTypeCode)">字典详情</el-button>
                        <el-button type="text" class='el-icon-edit'
                            @click="openDialog('编辑字典数据', scope.row)">编辑</el-button>
                        <el-button type="text" class='el-icon-delete' style="color: red;"
                            @click="">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="dic-box">
            <el-dialog :title="dialogData.dialogTitle" :visible.sync="dialogData.dialogFormVisible" :show-close="false"
                :close-on-click-modal="false" width="500px" :close-on-press-escape=false :destroy-on-close="true">
                <el-form :model="dialogData.ruleForm" ref="ruleForm" :rules="dialogData.rules" status-icon
                    label-width="100px" style="padding-right: 30px;">
                    <el-form-item label="字典编码" prop="dicTypeCode">
                        <el-input v-model="dialogData.ruleForm.dicTypeCode"></el-input>
                    </el-form-item>
                    <el-form-item label="字典名称" prop="name">
                        <el-input v-model="dialogData.ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dialogData.ruleForm.remark"></el-input>
                    </el-form-item>
                    <!-- vab/icon/remixIcon -->
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="changeIsShow">取 消</el-button>
                    <el-button type="success" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm', true)">重置</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="dic-box-detail">
            <el-dialog :title="dialogData.dialogTitle" :visible.sync="dialogData.dialogFormVisibleDetail"
                :show-close="false" :close-on-click-modal="false" width="500px" :close-on-press-escape=false
                :destroy-on-close="true">
                <el-form v-for="ruleFormDetail in dialogData.ruleFormDetail" :model="ruleFormDetail"
                    ref="ruleFormDetail" :rules="dialogData.rulesDetail" status-icon label-width="30px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item prop="dicCode">
                                <el-input placeholder="code" v-model="ruleFormDetail.dicCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item prop="dicValue">
                                <el-input placeholder="value" v-model="ruleFormDetail.dicValue"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="2">
                        </el-col> -->
                    </el-row>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="info" @click="changeIsShowDetail(false)">取 消</el-button>
                    <el-button type="warning" @click="changeIsShowDetail(true)">重置</el-button>
                    <el-button type="primary" @click="add">+</el-button>
                    <el-button type="danger" @click="reduce(ruleFormDetail)">-</el-button>
                    <el-button type="success" @click="submitFormDetail('ruleFormDetail')">保存</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- <div style="float: right; margin:20px 20px">
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </div> -->
    </div>
</template>
<script>
import { AddDictionaryApi, UpdateDictionaryApi, getDictionaryApi, AddDictionaryDetailApi, getDictionaryDetailApi } from '@/request/dictionary';
import { mapState } from 'vuex'

export default {
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
            }],
            tableData: {
                dicInfos: []
            },
            dicInfoQuery: {
                KeyWords: ""
            },
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            dialogData: {
                dialogTitle: '',
                dialogFormVisible: false,
                dialogFormVisibleDetail: false,
                ruleForm: {
                    dicTypeCode: '',
                    name: '',
                    remark: ''
                },
                ruleFormDetail: [{
                    dicTypeCode: '',
                    dicCode: '',
                    dicValue: '',
                    remark: ''
                }],
                currentDicTypeCode: '',
                flag: true,
                // {
                //     // dicTypeCode: '',
                //     // dicCode: '',
                //     // dicValue,
                //     // remark: ''
                // },
                rules: {
                    dicTypeCode: [
                        { trigger: 'blur', required: true, message: '字典编码不能为空' }
                    ],
                    name: [
                        { trigger: 'blur', required: true, message: '字典名称不能为空' }
                    ],
                    // component: [
                    //     { trigger: 'blur', required: true, message: 'vue路径不能为空' }
                    // ]
                },
                rulesDetail: {
                    dicCode: [
                        { trigger: 'blur', required: true, message: '字典code不能为空' }
                    ],
                    dicValue: [
                        { trigger: 'blur', required: true, message: '字典值不能为空' }
                    ],
                    // component: [
                    //     { trigger: 'blur', required: true, message: 'vue路径不能为空' }
                    // ]
                },
            },
        }
    },
    methods: {
        async submitFormDetail(formName) {
            let checkPass = true;
            this.$refs[formName].forEach(x => {
                x.validate(async (valid) => {
                    if (!valid) {
                        console.log('请填写正确信息在提交数据!!');
                        checkPass = false;
                        return false;
                    }
                    return;
                });
            });
            if (!checkPass) return;
            let resData = await AddDictionaryDetailApi({
                DetailDataRequests: this.dialogData.ruleFormDetail
            });;
            if (!resData) return;
            this.$Message({
                message: '操作成功',
                type: 'success',
                duration: 3000
            });
            this.changeIsShowDetail(false);
            this.isFreshData();
            //这里还要刷新主页
            // this.$refs[formName].validate(async (valid) => {
            //     if (valid) {
            //         let resData = await AddDictionaryDetailApi(this.dialogData.ruleFormDetail);;
            //         if (!resData) return;
            //         this.$Message({
            //             message: '操作成功',
            //             type: 'success',
            //             duration: 3000
            //         });
            //         this.changeIsShowDetail(false);
            //         this.isFreshData();
            //         //这里还要刷新主页
            //     } else {
            //         console.log('请填写正确信息在提交数据!!');
            //         return false;
            //     }
            // });
        },
        // 表单添加一行
        add() {
            var arr = {
                dicTypeCode: this.dialogData.currentDicTypeCode,
                dicCode: '',
                dicValue: '',
                remark: ''
            }
            this.dialogData.ruleFormDetail.push(arr)
            this.flags()
        },
        // 表单减少一行
        reduce(obj) {
            console.log(obj)
            this.dialogData.ruleFormDetail.pop(obj)
        },
        // 判断数组长度
        flags() {
            if (this.dialogData.ruleFormDetail.length < 2) {
                this.dialogData.flag = true
            } else {
                //先赋值为true再赋为false, 不然会没反应
                this.dialogData.flag = true
                this.dialogData.flag = false
            }
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let resData;
                    if (this.dialogData.dialogTitle === '编辑字典数据')
                        resData = await UpdateDictionaryApi(this.dialogData.ruleForm);
                    else
                        resData = await AddDictionaryApi(this.dialogData.ruleForm);
                    if (!resData) return;
                    this.$Message({
                        message: '操作成功',
                        type: 'success',
                        duration: 3000
                    });
                    this.resetForm(formName, false);
                    this.isFreshData();
                    //这里还要刷新主页
                } else {
                    console.log('请填写正确信息在提交数据!!');
                    return false;
                }
            });
        },
        resetForm(formName, isOpen) {
            console.log(this.$refs[formName])
            this.$refs[formName].resetFields();
            this.dialogData.dialogFormVisible = isOpen;
        },
        async changeIsShowDetail(isShow, currentDicTypeCode) {
            if (currentDicTypeCode) {
                //这里要去请求详情数据
                let params = {
                    // pageIndex: this.pageIndex,
                    // pageSize: this.pageSize,
                    dictionaryType: currentDicTypeCode,
                    key: ''
                };
                console.log('params', params)
                let dicDetails = await getDictionaryDetailApi(params);
                this.dialogData.ruleFormDetail = dicDetails.data;
                this.dialogData.currentDicTypeCode = currentDicTypeCode;
            }
            else {
                this.dialogData.ruleFormDetail = [{
                    dicTypeCode: this.dialogData.currentDicTypeCode,
                    dicCode: '',
                    dicValue: '',
                    remark: ''
                }];
            }
            this.dialogData.dialogTitle = '字典详情';
            this.dialogData.dialogFormVisibleDetail = isShow;
        },
        changeIsShow() {
            this.resetForm('ruleForm', false)
        },
        openDialog(title, row) {
            console.log(this.dialogData.ruleForm)
            this.dialogData.dialogTitle = title;
            this.dialogData.dialogFormVisible = true;
            if (row) {
                console.log('row', row)
                this.dialogData.ruleForm = JSON.parse(JSON.stringify(row));
            }
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
        },
        handleSelectionChange() {

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        initPassWord() {
        },
        async isFreshData() {
            let params = {
                // pageIndex: this.pageIndex,
                // pageSize: this.pageSize,
                KeyWords: this.dicInfoQuery.KeyWords,
            };
            console.log(params)
            let resData = await getDictionaryApi(params);
            console.log('文件返回数据', resData)
            this.total = resData.data.dataCount;
            this.pageIndex = resData.data.pageIndex;
            this.pageSize = resData.data.pageSize;
            this.tableData.dicInfos = resData.data;
        },
        checkBtnPemission() {
            if (this.$route.meta.btnDatas.length > 0) {
                this.$route.meta.btnDatas.map(x => {
                    let btn = this.btnDatas.find(m => m.btnName === x.menuName);
                    if (btn) btn.isSHow = x.enabled;
                });
            }
        },
        upLoadFile() {
            this.dialogFormVisible = true;
        },
    },
    async created() {
        await this.isFreshData();
    },
    mounted() {
        console.log('这里挂在用户页面', this.$route)
        this.checkBtnPemission();
    },
    computed: {
        ...mapState({ userInfo: state => state.userInfo.userInfo })
    }
}
</script>
<style scoped lang="less"></style>
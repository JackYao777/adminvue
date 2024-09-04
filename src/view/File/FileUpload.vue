<template>
    <div class="file-box">
        <div class="file-header">
            <el-form :inline="true" :model="fileInfoQuery" class="demo-form-inline"
                @selection-change="handleSelectionChange">
                <el-form-item label="文件名称">
                    <el-input v-model="fileInfoQuery.fileName" placeholder="文件名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色">
                    <el-select v-model="fileInfoQuery.roleId" placeholder="角色" clearable>
                        <el-option v-for="item, index in roleInfos" :index="index" :label="item.roleName"
                            :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工状态">
                    <el-select v-model="fileInfoQuery.enabled" placeholder="员工状态" clearable>
                        <el-option label="启用" :value=true></el-option>
                        <el-option label="禁用" :value=false></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="serach">{{ btnDatas[0].btnName }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="file-bottom">
            <el-button type="primary" icon="el-icon-plus" @click="upLoadFile">上传</el-button>
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-table ref="multipleTable" :data="fileInfos" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="id" prop="adminID" width="120" v-if='false'>
                </el-table-column>
                <el-table-column label="文件名称" prop="fileName">
                </el-table-column>
                <el-table-column label="文件大小">
                    <template slot-scope="scope">{{ (scope.row.fileSize / 1024 / 1024).toFixed(2) }}MB</template>
                </el-table-column>
                <el-table-column label="文件类型" prop="fileTypeCode">
                </el-table-column>
                <el-table-column label="文件地址" prop="filePath">
                </el-table-column>
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope"><el-switch v-model="scope.row.enabled" disabled>
                        </el-switch></template>
                </el-table-column> -->
                <el-table-column label="上传时间" align="center">
                    <template slot-scope="scope">{{ scope.row.createTime | FormatDateTime }}</template>
                </el-table-column>
                <el-table-column label="上传人" prop="createName">
                </el-table-column>
                <!-- <el-table-column label="修改" align="center">
                    <template slot-scope="scope"><i class='el-icon-edit'>修改</i></template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="file-box">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false"
                :close-on-click-modal="false" width="500px" :close-on-press-escape=false :destroy-on-close="true">
                <div style="margin-bottom: 50px;">
                    文件类型：
                    <el-select v-model="ruleForm.fileTypeCode" placeholder="请选择" style="width:200px;">
                        <el-option v-for="item, index in fileTypeCodeDatas" :index="index" :label="item.fileTypeName"
                            :value="item.fileTypeCode"></el-option>
                    </el-select>
                </div>
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="changeIsShow">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="float: right; margin:20px 20px">
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { GetUserInfosList, GetFileInfoApi, UploadFileApi } from '@/request/api';
import { fileTypeDatas } from '@/Utils/common.js'

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
            }, {
                btnName: '重置密码',
                isSHow: false,
            }],
            dialogTitle: '上传文件',
            dialogFormVisible: false,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            fileInfoQuery: {
                fileName: '',
            },
            fileInfos: [
            ],
            multipleSelection: [],
            fileTypeCodeDatas: fileTypeDatas,
            ruleForm: {
                fileTypeCode: '',

            },
        }
    },
    methods: {
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
        initPassWord() {
        },
        async isFreshData() {
            let params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                KeyWords: this.fileInfoQuery.fileName,
            };
            let resData = await GetFileInfoApi(params);
            console.log('文件返回数据', resData)
            this.total = resData.data.dataCount;
            this.pageIndex = resData.data.pageIndex;
            this.pageSize = resData.data.pageSize;
            this.fileInfos = resData.data.data;
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
        changeIsShow() {
            this.dialogFormVisible = false;
        }
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
.file-bottom {
    margin-top: 50px;
}
</style>
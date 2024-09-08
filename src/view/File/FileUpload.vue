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
                    <el-button type="primary" v-permission="btnInfos[0]" @click="serach">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="file-bottom">
            <el-button type="success" icon="el-icon-plus" v-permission="btnInfos[1]" @click="upLoadFile">上传</el-button>
            <el-button type="warning" v-permission="btnInfos[2]" icon="el-icon-edit">删除</el-button>
            <el-table ref="multipleTable" :data="fileInfos" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="id" prop="adminID" width="120" v-if='false'>
                </el-table-column>
                <el-table-column label="文件">
                    <template slot-scope="scope">
                        <div v-viewer class="picImg" @mouseover="isShowEyes(true, scope.row.id)"
                            @mouseleave="isShowEyes(false, 0)">
                            <img :src="MinIO_BASEURL + scope.row.filePath" class="avatar" />
                            <div class="picImg-icon" style="color: white;" v-if="showTip && scope.row.id == currentId">
                                <i class="el-icon-view">预览</i>
                            </div>
                        </div>
                    </template>
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
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="btnInfos[3]" class='el-icon-download'
                            @click="downloadFile(scope.row)">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="file-box">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false"
                :close-on-click-modal="false" width="500px" :close-on-press-escape=false :destroy-on-close="true">
                <div style="margin-bottom: 50px;">
                    文件类型：
                    <el-select v-model="ruleForm.fileTypeCode" placeholder="请选择" style="width: 280px;">
                        <el-option v-for="item in fileTypeCodeDatas" :key="item.key" :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
                        </el-option>
                    </el-select>
                </div>
                <el-upload class="upload-demo" drag :action="uploadUrl" :before-upload="beforeUpload"
                    :on-success="handleSuccess" :on-error="handleError" :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="changeIsShow">取 消</el-button>
                    <el-button type="primary" @click="submitUpload('ruleForm')">保存</el-button>
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
import { GetUserInfosList, GetFileInfoApi, AddFileApi } from '@/request/api';
import { fileTypeDatas } from '@/Utils/common.js'
import { mapState } from 'vuex'
import { MinIO_BASEURL } from '@/Utils/baseurl';

export default {
    data() {
        return {
            currentId: 0,
            showTip: false,
            MinIO_BASEURL: MinIO_BASEURL,
            btnInfos: [
                '搜索' ,
                '上传' ,
                '删除',
                '下载'
            ],
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
            uploadUrl: 'http://47.115.128.32:8027/Admin/api/SysFile/Add', // 替换为你的上传API地址
            filestream: null,
            fileName: '',
            fileList: [],
            imageUrl: null
        }
    },
    methods: {
        downloadFile(row) {
            // let link = document.createElement('a');
            // link.style.display = 'none';
            // link.href = this.MinIO_BASEURL + row.filePath;
            // document.body.appendChild(link);
            // link.click();
            window.location.href = this.MinIO_BASEURL + row.filePath;
        },
        isShowEyes(obj, currentId) {
            this.showTip = obj;
            this.currentId = currentId;
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
            this.resetReForm();
            this.dialogFormVisible = false;
        },

        beforeUpload(file) {
            this.fileList = [];
            this.filestream = null;
            this.filestream = file;
            this.fileList.push({ name: file.name })
            return false; // 阻止默认上传行为
        },
        async submitUpload() {
            if (this.ruleForm.fileTypeCode == '' || this.filestream == null) {
                this.$Message({
                    message: '文件类型和文件都是必选项,请选择之后再进行提交',
                    type: 'warning',
                    duration: 3000
                });
                return;
            }

            const formData = new FormData();
            formData.append('dirName', 'adminVue');
            formData.append('attachFileType', this.ruleForm.fileTypeCode);
            console.log('userInfo', this.userInfo);
            formData.append('createId', this.userInfo.adminID);
            // formData.append('useDate', false);
            formData.append('FormFile', this.filestream);
            let resdata = await AddFileApi(formData, { "Content-type": "multipart/form-data" })
            console.log('resData', resdata)
            if (!resdata.success) return;
            // this.handleSuccess(resdata.data);
            this.changeIsShow();
            await this.isFreshData();
        },
        handleSuccess(response) {
            // 处理上传成功的响应
            console.log('Success:', response);
            // this.imageUrl=MinIO_BASEURL+response.path;
            console.log("地址", this.imageUrl)
        },
        handleError(error) {
            // 处理上传失败的错误
            console.error('Error:', error);
        },
        resetReForm() {
            this.ruleForm.fileTypeCode = '';
            this.fileList = [];
            this.filestream = null;
        }
    },
    async created() {
        await this.isFreshData();
    },
    mounted() {
        console.log('这里挂在用户页面', this.$route)
        // this.checkBtnPemission();
    },
    computed: {
        ...mapState({ userInfo: state => state.userInfo.userInfo })
    }
}
</script>
<style scoped lang="less">
.file-bottom {
    margin-top: 50px;
}

.picImg {
    position: relative;
    z-index: 9999;
    cursor: pointer;

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .avatar:hover {
        filter: brightness(50%);
        transition: filter 0.3s ease;
    }

    .picImg-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
<template>
    <el-upload :action="uploadUrl" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError"
    :file-list="fileList"
    >
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar">
    </el-upload>
</template>

<script>
import { UploadFileApi } from '@/request/api';
import { MinIO_BASEURL } from '@/Utils/baseurl';

export default {
    data() {
        return {
            uploadUrl: 'http://47.115.128.32:8027/Admin/api/FileManager/UploadFile', // 替换为你的上传API地址
            filestream: null,
            fileName: '',
            fileList:[],
            imageUrl:null
            // fileList:[{name:'jack'},{name:'jackYao'}]
        };
    },
    methods: {
        beforeUpload(file) {
            this.filestream = file;
            this.fileList.push({name:file.name})
            return false; // 阻止默认上传行为
        },
        async submitUpload() {
            const formData = new FormData();
            formData.append('dirName', 'cs');
            formData.append('attachFileType', 1);
            formData.append('useDate', false);
            formData.append('file', this.filestream);
            let resdata = await UploadFileApi(formData, { "Content-type": "multipart/form-data" })
            console.log('resData',resdata)
            if(!resdata.success) return;
            this.handleSuccess(resdata.data);
        },
        handleSuccess(response) {
            // 处理上传成功的响应
            console.log('Success:', response);
            this.imageUrl=MinIO_BASEURL+response.path;
             console.log("地址",this.imageUrl)
        },
        handleError(error) {
            // 处理上传失败的错误
            console.error('Error:', error);
        }
    }
};
</script>
<style type="less" scoped>
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
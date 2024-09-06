<template>
    <div>
        <div class="buttom-top">
            <el-button type="success" icon="el-icon-plus" @click="addMenu">添加</el-button>
            <el-button type="info" @click="isFreshData">刷新</el-button>
            <el-button type="warning" @click="setIsExpand">{{ isExpand ? '全部折叠' : '全部展开' }}</el-button>
            <el-table ref="tableData" :data="menuInfos" style="width: 100%;margin-bottom: 20px;" row-key="menuID" border
                default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="索引" type="index" width="60">
                </el-table-column>
                <el-table-column prop="menuName" label="名称" sortable width="180">
                </el-table-column>
                <el-table-column label="图标" sortable width="180" align="center">
                    <template slot-scope="scope">
                        <eIcon :iconName="scope.row.menuIcon"></eIcon>
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center">
                    <template slot-scope="scope">
                        {{ enums.menuType[scope.row.menuType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="menuUrl" label="菜单Url">
                </el-table-column>
                <el-table-column label="启用状态" align="center">
                    <template slot-scope="scope"><i>{{ scope.row.enabled ? '启用' : '禁用' }}</i></template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">{{ scope.row.createTime | FormatDate }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.menuType != 3"
                            @click="handleMenu(scope.$index, scope.row)">添加</el-button>
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="buttom-box">
            <el-dialog :title="dialogTitle" :visible.sync="dialogMenuVisible" :show-close="false" width="500px"
                @close="closeDialog" @opened="openDialog" :modal=true :close-on-click-modal=false
                :destroy-on-close="true">
                <el-form :model="menuInfo" :rules="rules" status-icon ref="menuInfodialog" label-width="100px"
                    class="demo-menuInfo" style="padding-right: 30px;">
                    <el-form-item label="类型" prop="menuType">
                        <!-- <el-checkbox v-model="menuType">目录</el-checkbox>
                        <el-checkbox v-model="menuType">菜单</el-checkbox>
                        <el-checkbox v-model="menuType">按钮</el-checkbox> -->
                        <el-radio v-model="menuInfo.menuType" :label=1 v-if="isShowCatalogueRadio">目录</el-radio>
                        <el-radio v-model="menuInfo.menuType" :label=2 v-if="isShowMenuRadio">菜单</el-radio>
                        <el-radio v-model="menuInfo.menuType" :label=3 v-if='isShowBtnRadio'>按钮</el-radio>
                    </el-form-item>
                    <el-form-item label="父级" prop="parentText">
                        <el-input v-model="menuInfo.parentText" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="menuName">
                        <el-input v-model="menuInfo.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="路径path" prop="menuUrl" v-if="isShowMenuRadio||isShowCatalogueRadio">
                        <el-input v-model="menuInfo.menuUrl" placeholder="路由path">
                            <template slot="prepend">{{ prefixPath }}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="vue路径" prop="component" v-if="isShowMenuRadio">
                        <el-input v-model="menuInfo.component" placeholder="compents">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="menuIcon">
                        <IconPicker v-model="menuInfo.menuIcon" :icon="menuInfo.menuIcon" @iconName="getIconName">
                        </IconPicker>
                        <!-- <el-input v-model="menuInfo.menuIcon" placeholder="icon"></el-input> -->
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                        <el-input type="number" v-model="menuInfo.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="enabled">
                        <el-switch v-model="menuInfo.enabled" inactive-text="启用">
                        </el-switch>
                    </el-form-item>
                    <!-- vab/icon/remixIcon -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">关 闭</el-button>
                    <el-button type="primary" @click="submitForm('menuInfodialog')">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>

import { enumDatas } from '@/Utils/common';
import IconPicker from "@/components/IconPicker/index.vue";
import eIcon from "@/components/IconPicker/eIcon.vue";
import { AddMenuInfoApi, GetMenuInfoApi } from '@/request/api';
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
    components: { IconPicker, eIcon },
    data() {
        return {
            isShowBtnRadio:true,
            isShowMenuRadio:true,
            isShowCatalogueRadio:true,
            prefixPath: '',
            isExpand: true,
            enums: enumDatas,
            dialogMenuVisible: false,
            dialogTitle: '',
            menuInfo: {
                menuType: 1,
                parentText: '顶级',
                parentID: -1,
                menuName: '',
                sort: 0,
                menuIcon: '',
                enabled: true,
                menuID: 0,
                menuUrl: '',
                component: ''
            },
            menuInfos: [],
            // menuInfos: [{
            //     id: 1,
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     id: 2,
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1517 弄'
            // }, {
            //     id: 3,
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1519 弄',
            //     children: [{
            //         id: 31,
            //         date: '2016-05-01',
            //         name: '王小虎',
            //         address: '上海市普陀区金沙江路 1519 弄'
            //     }, {
            //         id: 32,
            //         date: '2016-05-01',
            //         name: '王小虎',
            //         address: '上海市普陀区金沙江路 1519 弄',
            //         children: [{
            //             id: 33,
            //             date: '2016-05-01',
            //             name: '王小虎',
            //             address: '上海市普陀区金沙江路 1519 弄'
            //         }, {
            //             id: 34,
            //             date: '2016-05-01',
            //             name: '王小虎',
            //             address: '上海市普陀区金沙江路 1519 弄',
            //             children: [{
            //                 id: 35,
            //                 date: '2016-05-01',
            //                 name: '王小虎',
            //                 address: '上海市普陀区金沙江路 1519 弄'
            //             }, {
            //                 id: 36,
            //                 date: '2016-05-01',
            //                 name: '王小虎',
            //                 address: '上海市普陀区金沙江路 1519 弄'
            //             }],
            //         }],
            //     }
            //     ]
            // }, {
            //     id: 4,
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1516 弄'
            // }],
            rules: {
                menuName: [
                    { trigger: 'blur', required: true, message: '菜单名称不能为空' }
                ],
                menuUrl: [
                    { trigger: 'blur', required: true, message: '路由路径不能为空' }
                ],
                // component: [
                //     { trigger: 'blur', required: true, message: 'vue路径不能为空' }
                // ]
            }
        }
    },
    methods: {
        ...mapActions({
             changeMenuData: 'menuDatas/asyncChangeMenuData',
            asyncinitalRawMenuData:'menuDatas/asyncinitalRawMenuData'
        }),
        setIsExpand() {
            this.isExpand = !this.isExpand;
            // this.$nextTick(() => {
            this.forArr(this.$refs.tableData.data, this.isExpand)
            // })
        },
        forArr(arr, isExpand) {
            // console.log('sdfasdf',arr)
            arr.forEach(i => {
                // toggleRowExpansion(i, isExpand)用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
                this.$refs.tableData.toggleRowExpansion(i, isExpand)
                if (i.children) {
                    this.forArr(i.children, isExpand)
                }
            })
        },
        getIconName(value) {
            this.menuInfo.menuIcon = value;
        },
        handleMenu(index, row) {
            this.dialogTitle = '新增';
            this.dialogMenuVisible = !this.dialogMenuVisible;
            this.menuInfo.parentText = row.menuName;
            this.menuInfo.parentID = row.menuID;
            this.prefixPath = this.getPrefixPath(row.menuID, '/');
            console.log('这个前缀是多少', this.prefixPath)
            //如果等于目录,可以添加目录和菜单
            //如果等于菜单,隐藏目录和菜单
            if(row.menuType==1){
                this.isShowBtnRadio=false;
            }
            else
            {
                this.isShowCatalogueRadio=false;
                this.isShowMenuRadio=false;
                this.menuInfo.menuType=3;
            }
        },
        handleEdit(index, row) {
            console.log('编辑', row)
            this.dialogTitle = '编辑';
            this.menuInfo = JSON.parse(JSON.stringify(row));
            this.dialogMenuVisible = !this.dialogMenuVisible;
            var resData = this.rawMenuData.filter(x => x.menuID ==row.parentID);
            console.log('这里mm', resData, this.menuInfo)
            if (resData.length <= 0) {
                this.menuInfo.parentText = '顶级';
            }
            else this.menuInfo.parentText = resData[0].menuName;
            
            if(row.menuType==3){
                this.isShowCatalogueRadio=false;
                this.isShowMenuRadio=false;
            }
            // this.isShowRadioContent(row.menuType);
        },
        addMenu() {
            this.dialogTitle = '新增';
            this.dialogMenuVisible = !this.dialogMenuVisible;
            this.prefixPath = '/';
            this.isShowBtnRadio=false;
        },
        getPrefixPath(menuID, prefixPath) {
            var currentData = this.rawMenuData.find(x => x.menuID == menuID);
            if (currentData.parentID != -1) {
                prefixPath = prefixPath.slice(0, 0).concat(currentData.menuUrl, prefixPath.slice(0))
                // console.log(prefixPath)
                prefixPath= this.getPrefixPath(currentData.parentID, prefixPath)
            }
            else{
                // console.log(currentData)
                prefixPath = prefixPath.slice(0, 0).concat(currentData.menuUrl, prefixPath.slice(0))
                return prefixPath;
            }
            return prefixPath;
            //传menuID进来,
            //拿到了当前行的数据,看他的父级Id是不是-1,如果不是那就还要往上走,(menuInfos)
            //这边新增的时候那就不是顶级了,这个就要去获取他的父级直到父级的父级为-1的时候就结束
        },
        isShowRadioContent(menuType){
          
        },
        closeDialog() {
            console.log('这里取销毁dialog')
            this.dialogMenuVisible = false;
            this.$refs.menuInfodialog.resetFields();
            this.dialogTitle = '';
            this.menuInfo.menuID = 0;
            this.menuInfo.parentID = -1;
            this.menuInfo.parentText = '顶级';
            this.prefixPath = '';
            this.isShowBtnRadio=true;
            this.isShowCatalogueRadio=true;
            this.isShowMenuRadio=true;
            this.menuInfo.menuType=1;
            this.menuInfo.menuName='';
            this.menuInfo.menuUrl='';
            this.menuInfo.menuIcon='';
            this.isFreshData();
        },
        openDialog() {
            // this.menuInfo.parentText='sdfsdfdsf';
            //   var resData=this.menuInfos.filter(x=>x.menuID==this.menuInfo.parentID);
            //   console.log('这里mm',resData)
            //   if(resData.length<=0) {
            //     this.menuInfo.parentText='顶级';
            // }
            //   else this.menuInfo.parentText=resData[0].menuName;
        },
        cancelDialog() {
            this.dialogMenuVisible = false;
        },
        async submitForm(formName) {
            if(this.menuInfo.menuType!=3)
            {  
                this.menuInfo.menuUrl=this.prefixPath+this.menuInfo.menuUrl;
            }
          
            console.log(this.menuInfo)
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let resData = await AddMenuInfoApi(this.menuInfo);
                    if (!resData) return;
                    this.$Message({
                        message: '操作成功',
                        type: 'success',
                        duration: 3000
                    });
                    this.closeDialog();
                    this.isFreshData();
                    //添加或者修改完菜单数据的时候应该要修改菜单缓存数据.
                     console.log('这里清空数据menuData')
                      this.changeMenuData([]);
                      this.asyncinitalRawMenuData(false);
                    //  console.log('这里清空数据menuData',this.menuData)
                     this.$router.push('/');

                } else {
                    console.log('请填写正确信息在提交数据!!');
                    return false;
                }
            })
            this.closeDialog();
        },
        async isFreshData() {
            let resData = await GetMenuInfoApi();
            console.log('菜单返回信息', resData)
            this.menuInfos = resData.data;
        },
    },
    computed: {
        ...mapState({
            menuData: state => state.menuDatas.menuData,
            rawMenuData: state => state.menuDatas.rawMenuData
        })
    },
    created() {
        this.isFreshData();
    }
    // watch: {
    //     'menuInfo.parentText': {
    //         // immediate: true, //初始化时让handler调用一下
    //         deep: true,//深度监视
    //         //handler什么时候调用？当isHot发生改变时。
    //         handler(newValue, oldValue) {
    //             console.log('parentText被修改了', newValue, oldValue)
    //             if(newValue==='顶级') this.parentID=-1;
    //             else{

    //             }
    //         }
    //     }
    // }
}

</script>
<style lang="less" scoped></style>
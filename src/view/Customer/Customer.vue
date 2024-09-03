<template>
    <div>
        <template>

      
            <div>
                <svg-icon name="icon-big" width="50"></svg-icon>
                <svg-icon name="icon-small" height="50"></svg-icon>
                <svg-icon name="Iconamoon3d" width="100" height="100"></svg-icon>
                <!-- <svg-icon name="example" width="20" height="20" color="red"></svg-icon> -->
         

            <!-- <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="日期" width="120"> -->
                    <!-- <template slot-scope="row">{{row.date&& new Date(row.date).toLocaleDateString().replaceAll('/','-') }}</template>
-->
                    <!-- <template slot-scope="scope">{{ scope.row.date | FormatDate }}</template>
                </el-table-column>
                <el-table-column label="姓名" width="120">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="性别" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.sex == 1 ? '男' : scope.row.sex == 0 ? '女' : '' }}</template>
                </el-table-column>
                <el-table-column label="修改" width="120" align="center">
                    <template slot-scope="scope"><i class='el-icon-edit'>修改</i></template>
                </el-table-column>
            </el-table> -->
        </div>
            <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
        </template>

    </div>
</template>
<script>
import { GetCustomerPageApi } from '@/request/api';
export default {
    data() {
        return {
            tableData: [],
            //     [{
            //   date: '2016-05-03',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-02',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-04',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-01',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-08',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-06',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-07',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }],
            multipleSelection: [],
            pageNum: 1,//当前页数
            pageSize: 10 //当前条数
        }
    },
    methods: {
        handleSelectionChange() {

        },
        async getTableDataApi() {
            this.tableData = await GetCustomerPageApi({
                pageNum: this.pageNum,
                pageSize: this.pageSize

            });
        }
    },
    created() {
        this.getTableDataApi();
    }
}
</script>
<style lang="less" scoped></style>
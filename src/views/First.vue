<template>
    <el-container>
        <el-header style="height:40px">
            <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" size="small" class="input-with-select">
                <el-select v-model="selects" slot="prepend" placeholder="请选择">
                    <el-option label="ASIN" value="1"></el-option>
                    <el-option label="主卖家" value="2"></el-option>
                    <el-option label="品牌" value="3"></el-option>
                    <el-option label="被投诉人" value="4"></el-option>
                </el-select>
                <el-button slot="append" class="co" icon="el-icon-search"></el-button>
            </el-input>
            </div>
        </el-header>
        <el-main>
            <template>
                <el-table
                    :data="tableData"
                    size="small"
                    height="78vh"
                    max-height="95vh"
                    style="width: 100%;">
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                </el-table>
                <el-pagination
                background
                style="text-align:center;margin-top:5px"
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </template>
        </el-main>
    </el-container>
</template>
<script>
    export default {
      data() {
        return {
          input3:"",
          selects:"1",
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }
      },
      methods: {
      }
    }
  </script>
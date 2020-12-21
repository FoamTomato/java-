<template>
    <el-container>
        <el-header style="height:40px">
            <div style="margin-top: 15px;">
            <el-input placeholder="请用逗号分隔开" v-model="input3" size="small" class="input-with-select">
                <el-select v-model="selects" slot="prepend" placeholder="请选择">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="ASIN" value="1"></el-option>
                    <el-option label="主卖家" value="2"></el-option>
                    <el-option label="品牌" value="3"></el-option>
                    <el-option label="被投诉人" value="4"></el-option>
                </el-select>
                <el-button slot="append" class="co" @click="select" icon="el-icon-search"></el-button>
            </el-input>
            </div>
        </el-header>
        <el-main>
            <template>
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    size="small"
                    height="78vh"
                    max-height="95vh"
                    style="width: 100%;">
                    <el-table-column
                    prop="time"
                    :formatter="dateFormat"
                    label="日期"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="asin"
                    label="ASIN"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="brand"
                    label="品牌"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="产品名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="user"
                    label="被投诉人"
                    width="120">
                    </el-table-column>
                    <el-table-column prop="avatar" label="图片">
                      <template slot-scope="scope">
                        <el-image  :src="scope.row.avatar" fit="cover" style="width:22px;height:22px" lazy :preview-src-list="lists(scope.row.avatar)">
                          <div slot="error" class="image-slot" style="font-size:20px">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="site"
                    label="站点"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="seller"
                    label="卖家">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="deletes(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                background
                style="text-align:center;margin-top:5px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[50, 100, 200, 300, 400]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
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
          selects:"0",
          pageNum: 1,
          pageSize: 50,
          // 加载圈
          loading:false,
          total:0,
          tableData: [{
            asin: null,
            brand: null,
            name: null,
            seller: null,
            site: null,
            status: null,
            time: null,
            user: null,
          }]
        }
      },
      created(){
        this.select()
      },
      methods: {
        // 查询列表
        select(){
          let data={}
          data["input3"]=this.input3
          data["selects"]=this.selects
          data["pageSize"]=this.pageSize
          data["pageNum"]=this.pageNum
          this.loading=true
          this.$http.post("/asin/select",data).then(res=>{
            this.loading=false
            this.total=res.data.length
            this.tableData=res.data
            if(this.input3!=''&&this.selects=="1"){
              if(res.data.length!=0){
                this.$message.warning("有ASIN被投诉")
              }else{
                this.$message.success("该ASIN没有被投诉")
              }
            }
          })
        },
        // 页码被改变
        handleCurrentChange(val){
          this.pageNum=val
          this.select()
        },
        // 条码被改变
        handleSizeChange(val) {
          this.pageSize=val
          this.select()
        },
        // 列表化
        lists(val){
          let list=[]
          list.push(val)
          return list
        },
        // 删除
        deletes(val){
          this.$confirm(`确认删除${val.asin}?请谨慎操作，不可复原`)
          .then(_ => {
              this.$http.delete("/asin/deletes/"+val._id,).then(res=>{
                if(res.status==200){
                  this.select()
                  this.$message.success(res.data.asin+"已删除")
                }else{
                  this.$message.error("删除异常")
                }
              })
          })
          .catch(_ => {});
        },
        // 时间格式化
        dateFormat(row, column, cellValue, index){
          console.log(row)
          const daterc = row[column.property]
          if(daterc!=null){
            const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
            const year = dateMat.getFullYear();
            const month = dateMat.getMonth() + 1;
            const day = dateMat.getDate();
            const hh = dateMat.getHours();
            const mm = dateMat.getMinutes();
            const ss = dateMat.getSeconds();
            const timeFormat= year + "年" + month + "月" + day + "日";
            return timeFormat;
          }
        }
      }
    }
  </script>
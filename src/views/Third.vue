<template>
    <el-container>
        <el-header style="height:40px;padding:20px">
              <el-button size="small" @click="dialogVisible=true">添加用户</el-button>
              <el-button size="small" @click="select()">刷新</el-button>
        </el-header>
        <el-main>
            <template>
                <el-table
                height="78vh"
                max-height="95vh"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="time"
                    label="日期"
                    :formatter="dateFormat"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"> 
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="deletes(scope.row._id)" type="text" size="small">删除</el-button>
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
        <el-dialog
            title="添加用户"
            size="small"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <el-form ref="form" v-loading="loading"  :model="form"  :rules="rules" status-icon label-width="80px" style="margin-top:20px;padding-right:20px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="name">
                  <el-input  size="small"  v-model="form.name"  placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="录入时间">
                  <el-date-picker size="small"
                      v-model="form.time" disabled>
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button type="submit" class="but" @click="submitForm('form')" size="small">立即添加</el-button>
                  <el-button type="submit"  @click="resetForm('form')" size="small">重置</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>
<script>
    export default {
      data() {
        return {
          dialogVisible: false,
          form:{
            name:"",
            time:"",
            status:"1",
          },
          rules:{
            name: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
            ]
          },
          tableData: [{
            time: '',
            name: ''
          }],
          pageSize:50,
          pageNum:1,
          total:0
        }
      },
      created(){
          this.select()
          this.form.time=Date.now()
      },
      methods: {
          // 查找用户
          select(){
            let data={}
            data["pageSize"]=this.pageSize
            data["pageNum"]=this.pageNum
            this.$http.post("/asinUser/select",data).then(res=>{
              this.total=res.data.length
              this.tableData=res.data
            })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loading=true
                this.$http.post("/asinUser/add",this.form).then(res=>{
                  this.loading=false
                  if(res.status==200){
                    this.$notify({
                      title: '成功',
                      message: `用户${res.data.name}添加成功`,
                      type: 'success',
                      offset: 25
                    });
                    this.select()
                    this.dialogVisible=false
                    this.$refs[formName].resetFields();
                  }else{
                    this.$message.error("出现异常")
                  }
                })
              } else {
                this.$message.error('错误的提交');
                return false;
              }
            });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
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
        // 删除
        deletes(val){
          this.$confirm('确认删除？')
          .then(_ => {
              this.$http.delete("/asinUser/deletes/"+val,).then(res=>{
                if(res.status==200){
                  this.select()
                  this.$message.success(res.data.name+"已删除")
                }else{
                  this.$message.error("删除异常")
                }
              })
          })
          .catch(_ => {});
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
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
<template>
    <el-container>
        <el-header style="height:40px;padding:20px">
            <el-input placeholder="请用逗号分隔开" style="width:30%;margin-right:10px" v-model="input3" @keyup.enter.native="select()" size="small" class="input-with-select"/>
            <el-button size="small" @click="select()">查找</el-button>
            <!-- <el-button size="small" @click="dialogVisible=true">添加侵权词</el-button> -->
        </el-header>
        <!-- 78vh/82vh -->
        <el-main>
            <template>
                <el-table
                v-loading="loading"
                height="78vh" 
                max-height="95vh"
                :data="tableData"
                style="width: 100%">

                <el-table-column
                    prop="keyWords"
                    label="侵权词"
                    width="180">
                </el-table-column>


                <el-table-column
                    prop="time"
                    :formatter="dateFormat"
                    label="日期"> 
                </el-table-column>


                <!-- <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="deletes(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column> -->
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
            title="添加侵权词"
            size="small"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <el-form ref="form" v-loading="loading"  :model="form"  :rules="rules" status-icon label-width="80px" style="margin-top:20px;padding-right:20px" class="demo-ruleForm">
              <el-form-item label="侵权词" prop="keyWords">
                  <el-input  size="small"  v-model="form.keyWords"  placeholder="请输入侵权词"></el-input>
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
          input3:"",
          form:{
            keyWords:"",
            time:"",
            status:"1",
          },
          rules:{
            keyWords: [
              { required: true, message: '侵权词不能为空', trigger: 'blur' },
            ]
          },
          tableData: [{
            time: '',
            keyWords: ''
          }],
          // 加载圈
          loading:false,
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
            data["input3"]=this.input3
            data["pageSize"]=this.pageSize
            data["pageNum"]=this.pageNum
            this.loading=true
            this.$http.post("/keyWords/select",data).then(res=>{
              this.loading=false
              this.$http.post("/keyWords/count",data).then(res=>{
                this.total=res.data
              })
              this.tableData=res.data
            })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loading=true
                this.$http.post("/keyWords/add",this.form).then(res=>{
                  this.loading=false
                  if(res.status==200){
                    this.$notify({
                      title: '成功',
                      message: `侵权词${res.data.keyWords}添加成功`,
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
          this.$confirm(`确认删除${val.keyWords}?请谨慎操作，不可复原`)
          .then(_ => {
              this.$http.delete("/keyWords/deletes/"+val._id,).then(res=>{
                if(res.status==200){
                  this.select()
                  this.$message.success(res.data.keyWords+"已删除")
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
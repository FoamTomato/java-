<template>
    <el-container>
        <el-header style="height:40px;padding:20px">
            <el-input placeholder="请用逗号分隔开" style="width:30%;margin-right:10px" v-model="input3" @keyup.enter.native="select()" size="small" class="input-with-select"/>
            <el-button size="small" @click="select()">查找</el-button>
            <el-button size="small" @click="add()">添加用户</el-button>
        </el-header>
        <el-main>
            <template>
                <el-table
                v-loading="loading"
                height="78vh"
                max-height="95vh"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="avatar"
                    label="头像"
                    width="180">
                    <template slot-scope="scope">
                        <el-image  :src="scope.row.avatar" fit="cover" style="width:22px;height:22px" lazy :preview-src-list="listss(scope.row.avatar)">
                          <div slot="error" class="image-slot" style="font-size:20px">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </template>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"> 
                </el-table-column>
                <el-table-column
                    prop="updatedAt"
                    label="日期"
                    :formatter="dateFormat"
                    width="180">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="names=scope.row.username;title=1;updates(scope.row)" type="text" size="small">编辑</el-button>
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
        <el-dialog
            title="操作用户"
            size="small"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <el-form ref="form" v-loading="loading"  :model="form"  :rules="rules" status-icon label-width="80px" style="margin-top:20px;padding-right:20px" class="demo-ruleForm">
              <el-form-item label="用户名" v-if="title==0"  prop="username">
                  <el-input  size="small"  v-model="form.username"  placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" v-if="title==0"  prop="password">
                  <el-input  size="small" type="password"  v-model="form.password" show-password  placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="auths">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="form.auths" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :action="$http.defaults.baseURLs+'/upload2'"
                    :on-success="afterUpload"
                >
                    <img v-if="form.avatar" :src="form.avatar" fit="cover" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon avatars"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                  <el-button type="submit" v-if="title==0" class="but" @click="submitForm('form')" size="small">立即添加</el-button>
                  <el-button type="submit" v-if="title==1" @click="updates2('form')" size="small">修改</el-button>
                  <el-button type="submit"  @click="resetForm('form')" size="small">重置</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>
<script>
const cityOptions = ['ASIN查询', 'ASIN操作', 'ASIN添加', '侵权词', '侵权词操作' , '投诉人管理' , '用户管理' , '日本商标局' , '欧洲商标局' , '英国商标局' , '美国商标局' , '加拿大商标局'];
    export default {
      data() {
        return {
          dialogVisible: false,
          form:{
            username:"",
            password:"",
            status:"1",
            avatar:"",
            auths:[]
          },
          names: "",
          title: 0,
          checkAll: false,
          checkedCities: [],
          cities: cityOptions,
          isIndeterminate: true,
          rules:{
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
            ]
          },
          tableData: [{
            password: '',
            username: ''
          }],
          // 加载圈
          loading:false,
          pageSize:50,
          pageNum:1,
          total:0,
          // 查找条件
          input3:"",
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
            data["input3"]=this.input3
            this.loading=true
            this.$http.post("/asinUsers/select",data).then(res=>{
              this.loading=false
              this.$http.post("/asinUsers/count",data).then(res=>{
                this.total=res.data
              })
              this.tableData=res.data
              this.$forceUpdate()
            })
          },
          // 添加用户
          add(){
            this.title=0;
            this.dialogVisible=true
            this.form = this.$options.data().form
          },
          submitForm(formName) {
            if(this.form.username==""){
                return false
            }
            let list = this.tableData
            for(let x=0;x<list.length;x++){
                if(list[x].username==this.form.username){
                    this.$notify({
                      title: '失败',
                      message: `用户${this.form.username}已存在`,
                      type: 'error',
                      offset: 25
                    });
                    return false
                }
            }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loading=true
                this.$http.post("/asinUsers/add",this.form).then(res=>{
                  this.loading=false
                  if(res.status==200){
                    this.$notify({
                      title: '成功',
                      message: `用户${res.data.username}添加成功`,
                      type: 'success',
                      offset: 25
                    });
                    this.select()
                    this.dialogVisible=false
                    this.$refs[formName].resetFields();
                  }else{
                    this.$message.error("出现异常")
                  }
                }).catch(res=>{
                    this.$message.error(res[0])
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
        // 修改
        updates(val){
          // 值复制更新
          Object.assign(this.form,val)
          this.dialogVisible=true
        },
        // 删除
        deletes(val){
          this.$confirm(`确认删除${val.username}?请谨慎操作，不可复原`)
          .then(_ => {
              this.$http.delete("/asinUsers/deletes/"+val._id,).then(res=>{
                if(res.status==200){
                  this.select()
                  this.$message.success(val.username+"已删除")
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
          const daterc = row[column.property]
          if(daterc!=null){
            const dateMat= new Date(daterc);
            const year = dateMat.getFullYear();
            const month = dateMat.getMonth() + 1;
            const day = dateMat.getDate();
            const hh = dateMat.getHours();
            const mm = dateMat.getMinutes();
            const ss = dateMat.getSeconds();
            const timeFormat= year + "年" + month + "月" + day + "日";
            return timeFormat;
          }
        },
        afterUpload(res) {
            //给图片赋值
            this.form.avatar = res.url;
        },
        handleCheckAllChange(val) {
        this.form.auths = val ? cityOptions : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        // 修改
        updates2(formName){
          let list = this.tableData
          for(let x=0;x<list.length;x++){
              if(this.form.username!=this.names){
                if(list[x].username==this.form.username){
                    this.$notify({
                      title: '失败',
                      message: `用户${list[x].username}已存在`,
                      type: 'error',
                      offset: 25
                    });
                    return false
                }
              }
          }
          
          
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.loading=true
                this.$http.put("asinUsers/"+this.form._id,this.form).then(res=>{
                    this.loading=false
                    if(res.status==200){
                        this.$notify({
                            title: '成功',
                            message: `asin：${res.data.username}修改成功`,
                            type: 'success',
                            offset: 25
                        });
                        // 更新权限 
                        localStorage.auths =this.form.auths
                        localStorage.avatar =this.form.avatar
                        this.select()
                    }else{
                      this.$message.error("出现异常")
                    }
                })
                this.dialogVisible = false
            } else {
                this.$message.error('错误的提交');
                return false;
            }
        });
        },
        // 列表化
        listss(val){
          let list=[]
          list.push(val)
          return list
        }
      }
    }
  </script>
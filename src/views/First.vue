<template>
    <el-container>
        <el-header style="height:40px">
            <div style="margin-top: 15px;">
            <el-input placeholder="请用逗号分隔开" v-model="input3" @keyup.enter.native="select()" size="small" class="input-with-select">
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
                    prop="asin"
                    label="ASIN"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="brand"
                    label="品牌"
                    :filters="[{text: '有品牌', value: '1'},{text: '无品牌', value: '2'}]"
                    :filter-method="filterHandler"
                    width="120">
                      <template slot-scope="scope">
                        {{scope.row.brand+filterBrand(scope.row.brands)}}
                      </template>
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
                        <el-image  :src="scope.row.avatar" fit="cover" style="width:22px;height:22px" lazy :preview-src-list="listss(scope.row.avatar)">
                          <div slot="error" class="image-slot" style="font-size:20px">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </template>
                    </el-table-column>
                    
                    <el-table-column
                    label="站点"
                    prop="site"
                    width="120">
                      <template slot-scope="scope">
                        {{scope.row.site+siteNames(scope.row.siteName)}}
                      </template>
                    </el-table-column>

                    <el-table-column
                    prop="time"
                    :formatter="dateFormat"
                    label="日期"
                    width="120">
                    </el-table-column>


                    <el-table-column
                    prop="seller"
                    label="卖家">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      v-if="auths('ASIN操作')"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="updates(scope.row)" type="text" size="small">编辑</el-button>
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
          title="修改"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
          <el-row :gutter="20" class="rows">
            <el-col :span="2">ASIN</el-col>
            <el-col :span="9"><el-input  size="small"  v-model="form.asin" placeholder="请输入asin"></el-input></el-col>
            <el-col :span="2">产品名</el-col>
            <el-col :span="9"><el-input v-model="form.name" size="small" placeholder="请输入产品名"></el-input></el-col>
          </el-row>
          
          <el-row :gutter="20" class="rows">
            <el-col :span="2">品牌</el-col>
            <el-col :span="4"><el-input v-model="form.brand" size="small" placeholder="请输入品牌"></el-input></el-col>
            <el-col :span="5">
              <el-radio v-model="form.brands" label="1">有</el-radio>
              <el-radio v-model="form.brands" label="2">无</el-radio>
            </el-col>
            <el-col :span="2">主卖家</el-col>
            <el-col :span="9"><el-input v-model="form.seller" size="small"  placeholder="请输入主卖家"></el-input></el-col>
          </el-row>
          
          <el-row :gutter="20" class="rows">
            <el-col :span="2">站点</el-col>
            <el-col :span="4">
              <el-select v-model="form.site" style="width:100%" placeholder="请选择站点" size="small">
                <el-option label="美国" value="美国"></el-option>
                <el-option label="加拿大" value="加拿大"></el-option>
                <el-option label="墨西哥" value="墨西哥"></el-option>
                <el-option label="英国" value="英国"></el-option>
                <el-option label="法国" value="法国"></el-option>
                <el-option label="德国" value="德国"></el-option>
                <el-option label="荷兰" value="荷兰"></el-option>
                <el-option label="意大利" value="意大利"></el-option>
                <el-option label="西班牙" value="西班牙"></el-option>
                <el-option label="瑞典" value="瑞典"></el-option>
                <el-option label="澳大利亚" value="澳大利亚"></el-option>
                <el-option label="印度" value="印度"></el-option>
                <el-option label="阿联酋" value="阿联酋"></el-option>
                <el-option label="沙特阿拉伯" value="沙特阿拉伯"></el-option>
                <el-option label="日本" value="日本"></el-option>
            </el-select>
            </el-col>
            <el-col :span="5">
              <el-input  size="small"  v-model="form.siteName" style="margin-left:10px;width:95%" placeholder="请输入站点名称"></el-input>
            </el-col>
            <el-col :span="2">用户</el-col>
            <el-col :span="8">
              <el-select v-model="form.user" placeholder="请选择用户" size="small">
                    <el-option :label="user.name" :value="user.name" :key="index" v-for="(user,index) in lists"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action="$http.defaults.baseURLs+'/upload2'"
            :on-success="afterUpload"
          >
            <img v-if="form.avatar" :src="form.avatar" fit="cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon avatars"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updates2()">修改</el-button>
          </span>
        </el-dialog>
    </el-container>
</template>
<script>
    export default {
      data() {
        return {
          lists:[],
          input3:"",
          selects:"0",
          pageNum: 1,
          pageSize: 50,
          form: {
            asin:'',
            name: '',
            brand: '',
            brands: '',
            seller: '',
            site: '',
            user: '',
            time: '',
            status: '1',
            avatar:''
          },
          // 加载圈
          loading:false,
          total:0,
          // 弹窗
          dialogVisible:false,
          tableData: [{
            asin: null,
            brand: null,
            name: null,
            seller: null,
            site: null,
            status: null,
            time: null,
            brands: null,
            user: null,
          }]
        }
      },
      created(){
        this.select()
      },
      methods: {
        auths(str) {
          return localStorage.auths.indexOf(str)==-1?false:true  // -1 说明array中不存在id为str的对象
        },
        // 品牌过滤器
        filterHandler(value, row, column){
          return row["brands"] === value;
        },
        // 修改
        updates(val){
          this.form=val
          this.$http.post("/userA/select").then(res=>{
            this.lists=res.data
          })
          this.dialogVisible=true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
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
            this.$http.post("/asin/select/count",data).then(res=>{
              this.total=res.data
            })
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
        listss(val){
          let list=[]
          list.push(val)
          return list
        },
        // 筛选
        filterBrand(val){
          console.log(val)
          if(val==undefined){
            return ""
          }else{
            return val==1?"(有品牌)":"(无品牌)"
          }
        },
        // 删除
        deletes(val){
          this.$confirm(`确认删除${val.asin}?请谨慎操作，不可复原`)
          .then(_ => {
              this.$http.delete("/asin/deletes/"+val._id).then(res=>{
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
        },
        // 给图片赋值
        afterUpload(res) {
          this.form.avatar = res.url;
        },
        // 修改
        updates2(){
          this.$http.put("asin/"+this.form._id,this.form).then(res=>{
            if(res.status==200){
                this.$notify({
                      title: '成功',
                      message: `asin：${res.data.asin}修改成功`,
                      type: 'success',
                      offset: 25
                });
            }else{
              this.$message.error("出现异常")
            }
          })
          this.dialogVisible = false
        },
        // 站点名称展示
        siteNames(val){
          if(val==undefined||val==""){
            return ""
          }else{
            return `(${val})`
          }
        }
      }
    }
  </script>
  <style>
  .rows{
    line-height:40px;
    margin-bottom:20px
  }
  </style>
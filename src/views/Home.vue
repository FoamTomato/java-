<template>
    <el-container>
      <el-main style="padding: 5px;">
        
              <div id="google_translate_element"></div>
        <template>
          <el-tabs v-model="activeName" tab-position="left" style="height:92vh" @tab-click="handleClick">
            <el-tab-pane name="img">
              <span slot="label">
                <el-avatar shape="square"  v-if="avatar()==undefined" style="float:left" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-avatar  v-if="avatar()!=undefined" style="float:left;margin-left:20%" shape="square" :src="avatar()" >
                  <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                </el-avatar>
                <a @click="logout" style="font-size:10px;">切换</a>
              </span>

              <img src="../img/sudo.png" style="width:100%;margin-top:20vh"/>
            </el-tab-pane>
            <el-tab-pane v-if="auths('ASIN查询')" label="ASIN查询" name="first" lazy>
              <first></first>
            </el-tab-pane>
            <el-tab-pane v-if="auths('ASIN添加')" label="ASIN添加" name="second" lazy>
              <second></second>
            </el-tab-pane>
            <el-tab-pane v-if="auths('侵权词')" label="侵权词" name="fourth" lazy>
              <fourth></fourth>
            </el-tab-pane>
            <el-tab-pane v-if="auths('投诉人管理')" label="投诉人管理" name="third" lazy>
              <third></third>
            </el-tab-pane>
            <el-tab-pane v-if="auths('用户管理')" label="用户管理" name="users" lazy>
              <users></users>
            </el-tab-pane>
            <el-tab-pane v-if="auths('日本商标局')"  label="日本商标局" name="five" lazy>
              <el-row :gutter="20" style="margin-bottom:5px">
                <el-col :span="6">
                  <el-input v-model="Inputs" size="small" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="FindInPage('jpInput')"> 查找</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="Translates('jpInput','header','jp')"> 翻译</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="blankLoad('jpInput');" :disabled="jpInput">加载</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="closes()">关闭</el-button>
                </el-col>
              </el-row>
              <webview  id="jpInput" 
                src="https://www.j-platpat.inpit.go.jp/" 
                httpreferrer="https://www.j-platpat.inpit.go.jp/" 
                useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                style="display:inline-flex; width:100%; height:100vh">
              </webview>
            </el-tab-pane>
            <el-tab-pane v-if="auths('欧洲商标局')" label="欧洲商标局" name="six" lazy>
              <el-row :gutter="20" style="margin-bottom:5px">
                <el-col :span="6">
                  <el-input v-model="Inputs" size="small" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="FindInPage('euInput')"> 查找</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="Translates('euInput','.n-container','en')"> 翻译</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="blankLoad('euInput');" :disabled="euInput">加载</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="closes()">关闭</el-button>
                </el-col>
              </el-row>
              <webview  id="euInput" 
                src="https://euipo.europa.eu/eSearch/#basic" 
                httpreferrer="https://euipo.europa.eu" 
                useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                style="display:inline-flex; width:100%; height:100vh">
              </webview>
            </el-tab-pane>
            <el-tab-pane v-if="auths('英国商标局')" label="英国商标局" name="seven" lazy>
              <el-row :gutter="20" style="margin-bottom:5px">
                <el-col :span="6">
                  <el-input v-model="Inputs" size="small" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="FindInPage('enInput')"> 查找</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="Translates('enInput','header','en')"> 翻译</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="blankLoad('enInput');" :disabled="enInput">加载</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="closes()">关闭</el-button>
                </el-col>
              </el-row>
              <webview  id="enInput" 
                src="https://trademarks.ipo.gov.uk/ipo-tmtext" 
                httpreferrer="https://trademarks.ipo.gov.uk" 
                useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                style="display:inline-flex; width:100%; height:100vh">
              </webview>
            </el-tab-pane>
            <el-tab-pane v-if="auths('美国商标局')" label="美国商标局" name="eight" lazy>
              <el-row :gutter="20" style="margin-bottom:5px">
                <el-col :span="6">
                  <el-input v-model="Inputs" size="small" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="FindInPage('usaInput')"> 查找</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="Translates('usaInput','table','en')"> 翻译</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="blankLoad('usaInput');" :disabled="usaInput">加载</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="closes()">关闭</el-button>
                </el-col>
              </el-row>
              <webview  id="usaInput" 
                src="http://151.207.240.78:80/bin/gate.exe?f=login&p_lang=english&p_d=trmk" 
                httpreferrer="http://151.207.240.78" 
                useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                style="display:inline-flex; width:100%; height:100vh">
              </webview>
            </el-tab-pane>
            <el-tab-pane v-if="auths('加拿大商标局')" label="加拿大商标局" name="nine" lazy>
              <el-row :gutter="20" style="margin-bottom:5px">
                <el-col :span="6">
                  <el-input v-model="Inputs" size="small" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="FindInPage('caInput')"> 查找</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="Translates('caInput','#wb-bnr','en')"> 翻译</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="blankLoad('caInput');" :disabled="caInput">加载</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" @click="closes()">关闭</el-button>
                </el-col>
              </el-row>
              <webview  id="caInput" 
                src="http://www.ic.gc.ca/app/opic-cipo/trdmrks/srch/home?lang=eng" 
                httpreferrer="http://www.ic.gc.ca" 
                useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                style="display:inline-flex; width:100%; height:100vh">
              </webview>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-main>
    </el-container>
</template>
<script>
import { ipcRenderer,remote,BrowserWindow } from 'electron'
import first from './First.vue'
import second from './Second.vue'
import third from './Third.vue'
import fourth from './Fourth.vue'
import users from './Users.vue'

export default {
    data() {
      return {
          activeName: 'first',
          findOne:"",
          // 日本商标局查询
          jpInput: false,
          // 欧洲商标局查询
          euInput: false,
          // 英国商标局查询
          enInput: false,
          // 美国商标局查询
          usaInput: false,
          // 加拿大商标局查询
          caInput: false,
          Inputs: "",
          lists:[]
      };
    },
    components:{
        'first':first,
        'second':second,
        'third':third,
        'fourth':fourth,
        'users':users
    },
    created(){
      // 查询所有的用户权限
    },
    methods: {
      // 页内查找
      FindInPage(val){
          var webview= document.querySelector('#'+val)
          webview.findInPage(this.Inputs)
      },
      // 空白页加载
      blankLoad(val){
          var webview= document.querySelector('#'+val)
          if(!webview.isLoading()){
            if(val=="jpInput"){
              this.jpInput=true
            }else if(val=="euInput"){
              this.euInput=true
            }else if(val=="enInput"){
              this.enInput=true
            }else if(val=="usaInput"){
              this.usaInput=true
            }else if(val=="caInput"){
              this.caInput=true
            }
            webview.addEventListener('new-window', (event) => {
              let wind = window.open(event.url)
              this.lists.push(wind)
            })
          }
      },
      // 页内翻译
      Translates(val,val2,val3){
          var webview= document.querySelector('#'+val)
          webview.executeJavaScript(`
          console.log(document.querySelector("#google_translate_element_foam"))
          if(!document.querySelector("#google_translate_element_foam")){
            console.log("加载")
            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('src',"https://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit");
            document.getElementsByTagName('head')[0].appendChild(script);
            
            var btn=document.createElement('div');
            btn.setAttribute('id','google_translate_element_foam');
            btn.setAttribute('style','position: absolute;');
            document.querySelector("${val2}").appendChild(btn);
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: '${val3}', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element_foam');
            }
          }
          `)
      },
      auths(str) {
        return localStorage.auths.indexOf(str)==-1?false:true  // -1 说明array中不存在id为str的对象
      },
      avatar(){
        return localStorage.avatar
      },
      updatese(){
        this.$forceUpdate()
      },
      paths(){
          var path=require("path")
        return path.resolve("./src/views/test.js")
      },
      // 换号
      logout(){
        this.$confirm(`确认切换账号?请谨慎操作，不可复原`)
        .then(_ => {
          localStorage.clear()
          this.$message.success("登出成功")
          this.$router.push('/login')
        })
        .catch(_ => {});
      },
      closes(){
        for(let i=0;i<this.lists.length;i++){
          console.log(this.lists[i])
          this.lists[i].close()
        }
      },
      // 下拉菜单选择
      handleClick(tab, event) {
      }
    }
  };
</script>
<style>
.el-avatar--square {
  border: 1px solid #eef1f3;
  box-shadow:0px 10px 5px -10px #000;
}
.input-with-select>.el-input-group__append{
  background-color: #065279;
  border-color:#065279;
  color:#fff
}
.input-with-select>.el-input-group__append:hover{
  background-color: IndianRed;
  border-color:IndianRed;
  color:#fff
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-avatar>img {
  width:100%
}
.el-header {
  color: white;
}
.el-aside {
  color: #333;
}
.el-menu{
  border-right: 0px;
}
.el-icon-remove.el-icon-removes{
  margin-top:-8px;
  font-size: 18px;
  color:brown;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-remove.el-icon-removes:hover{
  margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss{
   margin-top:-8px;
  font-size: 18px;
  color:#2E8B57;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-circle-plus.el-icon-circle-pluss:hover{
   margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors{
   margin-top:-8px;
  font-size: 18px;
  color:DodgerBlue;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
.el-icon-error.el-icon-errors:hover{
   margin-top:-8px;
  font-size: 18px;
  color:IndianRed;
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;
}
</style>
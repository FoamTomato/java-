<template>
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;padding-right:20px">
        <el-form-item label="ASIN">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="产品名">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="主卖家">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="站点">
            <el-select v-model="form.region" placeholder="请选择站点" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户">
            <el-select v-model="form.region" placeholder="请选择用户" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="录入时间">
            <el-date-picker size="small"
                v-model="value2" disabled>
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="but" @click="onSubmit" size="small">立即创建</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }, 
        value2:"",
      }
    },
    created(){
        this.value2=Date.now()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>

.but.el-button--primary{
  background-color: #065279;
  border-color: #065279;
}
</style>
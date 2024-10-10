<template>
  <div class="home">
    <div class="t-a-r">
      <el-button type="primary" @click="addTableClick()">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import { listenMsg } from './crossTagMsg';

listenMsg((info)=>{
  console.log(info);
})
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // name: 'HomeView',
  components: {
    // HelloWorld
  },
  data(){
    return {
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
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  methods:{
    addTableClick(){
      // this.$router.push({
      //   path: 'addTable',
      //   query: {
      //     name: '123'
      //   }
      // });
      window.open("addTable?name='123'",'_blank');
    }
  },
}
</script>
<style lang="scss">
  .t-a-r{
    text-align: right;
  }
</style>

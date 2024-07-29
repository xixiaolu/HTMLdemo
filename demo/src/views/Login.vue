<template>
  <div id="login">
    我是login
    <el-button type="primary">主要按钮</el-button>
    <el-button type="primary" @click="print">打印</el-button>
    <div id="html2canvas">
        <div id="main" style="widows: 400px;height: 400px;"></div>
        <div>我是要打印的东西</div>
    </div>
  </div>
</template>
<script>
import printJs from "print-js"; //导入
import * as html2canvas from "html2canvas"; //导入
import * as echarts from 'echarts';
export default {
  name: "HomeView",
  data() {
    return {};
  },
  created() {
    
  },
  mounted(){
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  },
  methods: {
    print() {
      let dom = document.getElementById("html2canvas");
      dom.classList.add("BaseTablePrint"); //添加打印的布局样式
      let timer = setTimeout(() => {
        //添加class样式不能马上生效，所以用定时器延迟，保证样式生效后再用画布绘制。
        html2canvas(dom, {
          backgroundColor: "#ffffff",
        }).then((canvas) => {
          // loading.close();//关闭element-ui的加载遮罩
          // toDataURL 图片格式转成 base64
          let dataURL = canvas.toDataURL("image/png");
          //打印
          printJs({
            printable: dataURL,
            type: "image",
            maxWidth: 1000,
            base64: true,
            style: `@media print { @page {size: auto;} body{margin:0px 5px}}`, // 解决出现多页打印时第一页空白问题
          });
          dom.classList.remove("BaseTablePrint"); //删除打印的布局样式
          clearTimeout(timer);
        });
      }, 300);
    },
  },
};
</script>
<style lang="scss">
.BaseTablePrint {
  font-size: 22px;
}
</style>
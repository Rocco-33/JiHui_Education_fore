<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="学员登录数统计" value="login_num" />
          <el-option label="学员注册数统计" value="register_num" />
          <el-option label="课程播放数统计" value="video_view_num" />
          <el-option label="每日课程数统计" value="course_num" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">
        查询
      </el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height: 500px; width: 100%" />
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'

import statistics from '@/api/statistics'

export default {
    data() {
        return {
            searchObj: {
                type: '',
                begin: '',
                end: '',
            },
            btnDisabled: false,
            dateList: [], // 日期数据
            dataList: [], // 日期对应数据
            title: '数据统计', // 图表标题
        }
    },
    created() {
        //
    },
    methods: {
        // 1.显示图表
        showChart() {
            // 查询图表数据
            statistics.getEchartsData(this.searchObj)
                .then(response => {
                    console.log(response.data.data)
                    this.dateList = response.data.dateList
                    this.dataList = response.data.dataList
                    // 基于图表数据，生成图表
                    this.setChart()
                })
        },
        // 2.设置图表
        setChart() {
            // 1.基于准备好的DOM对象，初始化echarts实例
            this.chart = echarts.init(document.getElementById('chart'))
            // 2.定义图表的相关参数
            var option = {
                // 图表标题
                title: {
                    text: this.title
                },
                // x坐标轴触发提示
                tooltip: {
                    trigger: 'axis'
                },
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.dateList
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.dataList,
                    // 折线图
                    type: 'line'
                }],
                // 区域缩放
                dataZoom: [
                    {
                        show: true,
                        height: 30,
                        xAxisIndex: [
                            0
                        ],
                        bottom: 30,
                        start: 10,
                        end: 80,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'
                    },
                    {
                        type: 'inside',
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ]
            }
            // 3.配置图表的相关参数
            this.chart.setOption(option)
        },
    },
}
</script>
<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-button 
        :disabled="btnDisabled" 
        type="primary" 
        @click="countData()">
        生成
      </el-button>
    </el-form>

  </div>
</template>

<script>
import statistics from '@/api/statistics'

export default {
    data() {
        return {
            date: '',           // 日期
            btnDisabled: false, // 是否禁用生成按钮
        }
    },
    created() {
        //
    },
    methods: {
        // 1.根据日期，生成当天的统计数据
        countData() {
            this.btnDisabled = true
            statistics.countData(this.date)
                .then(response => {
                    this.btnDisabled = false
                    // 2.提示信息
                    this.$message({
                        type: 'success',
                        message: '生成数据成功！'
                    })
                    // 3.跳转到数据显示页面
                    this.$router.push({ path: '/statistics/show' })
                })
        },
    },
}
</script>
import request from '@/utils/request'

export default {
    // 1.根据日期，生成当天的统计数据
    countData(date) {
        return request({
          url: `/statistics/daily/data/count/${date}`,
          method: 'post',
        })
    },
    // 2.查询图表数据
    getEchartsData(searchObj) {
        return request({
            url: `/statistics/daily/get/echarts/data/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get',
          })
    }

}
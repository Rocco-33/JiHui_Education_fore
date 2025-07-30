import request from '@/utils/request'

export default {
    // 1.获取轮播图列表（条件查询分页）
    // 参数: current 当前页，size 分页大小
    getBannerListPage(current, size) {
        return request({
          url: `/cms/banner/get/page/${current}/${size}`,
          method: 'get',
        })
    },
    // 2.删除轮播图（根据ID）
    deleteBannerById(id) {
      return request({
        url: `/cms/banner/delete/by/id/${id}`,
        method: 'delete',
      })
    },
    // 3.添加轮播图
    addBanner(banner) {
      return request({
        url: `/cms/banner/add`,
        method: 'post',
        data: banner,
      })
    },
    // 4.修改轮播图
    updateBanner(banner) {
      return request({
        url: `/cms/banner/update`,
        method: 'put',
        data: banner,
      })
    },
    // 5.查询轮播图（根据ID）
    getBanner(id) {
      return request({
        url: `/cms/banner/get/by/id/${id}`,
        method: 'get',
      })
    },
}
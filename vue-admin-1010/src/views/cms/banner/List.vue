<template>
  <div class="app-container">

    <el-table
        :data="list"
        border
        fit
        highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
            {{(current - 1) * size + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="80"/>
      <el-table-column prop="gmtCreate" label="创建时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <!-- scope.row 表格的每一行记录 -->
            <router-link :to="'/banner/edit/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletebanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
        :current-page="current"
        :page-size="size"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="search"
    />
  </div>
</template>

<script>
import banner from '@/api/cms/banner'

export default {
    data() {
        return {
            list: null,     // 查询结果
            current: 1,     // 当前页
            size: 5,        // 分页大小
            total: 0,       // 总记录数
        }
    },
    created() {
        this.search()
    },
    methods: {
        // 1.查询轮播图列表
        // 第一次访问使用默认值，后面分页框架会把当前页码返回给函数的第一个参数
        search(current = 1) {
            this.current = current
            banner.getBannerListPage(this.current, this.size)
                .then(response => {
                    this.list = response.data.bannerPage.records
                    this.total = response.data.bannerPage.total
                })
        },
        deletebanner(id) {
            this.$confirm('此操作将永久删除轮播图记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                banner.deleteBannerById(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.search() //刷新
                    })
            })
        }
    },
}
</script>
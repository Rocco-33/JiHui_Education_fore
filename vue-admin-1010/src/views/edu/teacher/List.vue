<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
        </el-form-item>

        <el-form-item>
            <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
                <el-option :value="1" label="高级讲师"/>
                <el-option :value="2" label="首席讲师"/>
            </el-select>
        </el-form-item>
        
        <el-form-item label="添加时间">
            <el-date-picker
                v-model="teacherQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
            />
        </el-form-item>

        <el-form-item>
            <el-date-picker
                v-model="teacherQuery.end"
                type="datetime"
                placeholder="选择截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
            />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button type="default" @click="resetData()">重置</el-button>
    </el-form>

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
      <el-table-column prop="name" label="姓名" width="80"/>
      <el-table-column prop="level" label="头衔" width="80">
        <template slot-scope="scope">
            {{ scope.row.level === 1? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历"/>
      <el-table-column prop="gmtCreate" label="创建时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <!-- scope.row 表格的每一行记录 -->
            <router-link :to="'/teacher/edit/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTeacher(scope.row.id)">删除</el-button>
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
import teacher from '@/api/edu/teacher'

export default {
    data() {
        return {
            list: null,     // 查询结果
            current: 1,     // 当前页
            size: 5,        // 分页大小
            total: 0,       // 总记录数
            teacherQuery: { // 条件对象
                name: '',
                level: null,
                begin: '',
                end: ''
            }
        }
    },
    created() {
        this.search()
    },
    methods: {
        // 1.查询讲师列表
        // 第一次访问使用默认值，后面分页框架会把当前页码返回给函数的第一个参数
        search(current = 1) {
            this.current = current
            teacher.getTeacherListPage(this.current, this.size, this.teacherQuery)
                .then(response => {
                    this.list = response.data.teacherPage.records
                    this.total = response.data.teacherPage.total
                })
        },
        // 2.重置搜索框
        resetData() {
            this.teacherQuery = {
                name: '',
                level: '',
                begin: '',
                end: ''
            }
            this.search()
        },
        deleteTeacher(id) {
            this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacher.removeTeacherById(id)
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

<style>

</style>
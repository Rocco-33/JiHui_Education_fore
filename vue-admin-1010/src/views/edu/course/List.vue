<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
    <!-- 所属分类：级联下拉列表 -->
    <!-- 一级分类 -->
        <el-form-item label="课程类别">
            <el-select
            v-model="courseQuery.subjectParentId"
            placeholder="请选择"
            @change="firstSubjectChange">
                <el-option
                v-for="firstSubject in firstSubjectList"
                :key="firstSubject.id"
                :label="firstSubject.title"
                :value="firstSubject.id"/>
            </el-select>
            <!-- 二级分类 -->
            <el-select v-model="courseQuery.subjectId" placeholder="请选择">
                <el-option
                v-for="secondSubject in secondSubjectList"
                :key="secondSubject.id"
                :label="secondSubject.title"
                :value="secondSubject.id"/>
            </el-select>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item>
            <el-input v-model="courseQuery.title" placeholder="课程标题"/>
        </el-form-item>
        <!-- 讲师 -->
        <el-form-item>
            <el-select
            v-model="courseQuery.teacherId"
            placeholder="请选择讲师">
                <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button type="default" @click="resetData()">重置</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="数据加载中"
    border
    fit
    highlight-current-row
    row-class-name="myClassList">
        <el-table-column
        label="序号"
        width="70"
        align="center">
            <template slot-scope="scope">
                {{(current - 1) * size + scope.$index + 1}}
            </template>
        </el-table-column>
        
        <el-table-column label="课程信息" width="470" align="center">
            <template slot-scope="scope">
                <div class="info">
                    <div class="pic">
                        <img :src="scope.row.cover" alt="scope.row.title" width="150px">
                    </div>
                    <div class="title">
                        <a href="">{{ scope.row.title }}</a>
                        <p>课时 {{ scope.row.lessonNum }}</p>
                    </div>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
                {{ scope.row.gmtCreate.substr(0, 10) }}
            </template>
        </el-table-column>

        <el-table-column label="发布时间" align="center">
            <template slot-scope="scope">
                {{ scope.row.gmtModified.substr(0, 10) }}
            </template>
        </el-table-column>

        <el-table-column label="价格" width="100" align="center" >
            <template slot-scope="scope">
                {{ Number(scope.row.price) === 0 ? '免费' : '¥' + scope.row.price.toFixed(2) }}
            </template>
        </el-table-column>

        <el-table-column prop="buyCount" label="付费学员" width="100" align="center">
            <template slot-scope="scope">
                {{ scope.row.buyCount }}人
            </template>
        </el-table-column>

        <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
                <router-link :to="'/course/info/' + scope.row.id">
                    <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
                </router-link>
                <router-link :to="'/course/chapter/' + scope.row.id">
                    <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
                </router-link>
                <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteCourse(scope.row.id)">删除</el-button>
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
    @current-change="search"/>

  </div>
</template>

<script>
import course from '@/api/edu/course'
import teacher from '@/api/edu/teacher'
import subject from '@/api/edu/subject'

export default {
    data() {
        return {
            listLoading: true, // 是否显示加载信息
            list: null,     // 查询结果
            current: 1,     // 当前页
            size: 5,        // 分页大小
            total: 0,       // 总记录数
            courseQuery: {  // 条件对象
                subjectParentId: '',
                subjectId: '',
                title: '',
                teacherId: '',
            },
            teacherList: [], // 讲师列表
            firstSubjectList: [], // 一级分类列表
            secondSubjectList: [], // 二级分类列表
        }
    },
    created() {
        // 1.初始化课程列表
        this.search()
        // 2.初始化讲师列表
        this.initTeacherList()
        // 3.初始化分类列表
        this.initSubjectList()
    },
    methods: {
        // 1.查询课程列表
        // 第一次访问使用默认值，后面分页框架会把当前页码返回给函数的第一个参数
        search(current = 1) {
            this.current = current
            this.listLoading = true
            course.getPageByCondition(this.current, this.size, this.courseQuery)
                .then(response => {
                    this.list = response.data.coursePage.records
                    this.total = response.data.coursePage.total
                    this.listLoading = false
                    console.log(this.list)
                })
        },
        // 2.重置搜索框
        resetData() {
            this.courseQuery = {
                subjectParentId: '',
                subjectId: '',
                title: '',
                teacherId: '',
            }
            this.secondSubjectList = []
            this.search()
        },
        // 3.查询讲师列表
        initTeacherList() {
            teacher.getTeacherList()
                .then(response => {
                    this.teacherList = response.data.teacherList
                })
        },
        // 4.查询分类列表（一级）
        initSubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.firstSubjectList = response.data.subjectList
                })
        },
        // 5.改变一级课程分类（选中的subjectId自动赋值）
        firstSubjectChange(subjectId) {
            for (let i = 0; i < this.firstSubjectList.length; i++) {
                // 找到选中的一级课程分类
                if (this.firstSubjectList[i].id === subjectId) {
                    // 取出其二级课程分类的数组，并赋值
                    this.secondSubjectList = this.firstSubjectList[i].children
                    this.courseQuery.subjectId = ''
                }
            }
        },
        // 6.删除课程
        deleteCourse(courseId) {
            this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                course.deleteCourseById(courseId)
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

<style scoped>
.myClassList .info {
    width: 450px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.myClassList .info .pic img {
    display: block;
    width: 100%;
}
.myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
}
.myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
}
.myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
}
</style>
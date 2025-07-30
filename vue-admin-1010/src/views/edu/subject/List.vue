<template>
    <div class="app-container">
        <el-input 
            v-model="filterText" 
            placeholder="Filter keyword" 
            style="margin-bottom:30px;"/>

        <el-tree
            ref="subjectTree"
            :data="subjectList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all/>
    </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {
    data() {
        return {
            filterText: '',
            subjectList: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.subjectTree.filter(val)
        }
    },
    created() {
        this.getSubjectList()
    },
    methods: {
        // 1.查询所有课程分类列表
        getSubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectList = response.data.subjectList
                })
        },
        // 2.列表搜索框过滤节点的方法
        filterNode(value, data) {
            if (!value) return true
            return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
    }
}
</script>
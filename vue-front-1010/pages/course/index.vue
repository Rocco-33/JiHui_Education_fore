 <template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" 
                    @click="searchAll()"
                    :class="{active: isShowAll}">全部</a>
                </li>
                <li 
                  v-for="(firstSubject, index) in firstSubjectList" :key="index"
                  :class="{active: firstSubjectIndex == index}">
                  <a 
                    :title="firstSubject.title" 
                    href="#"
                    @click="firstSubjectChange(firstSubject, index)">
                    {{ firstSubject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li 
                  v-for="(secondSubject, index) in secondSubjectList" :key="index"
                  :class="{active: secondSubjectIndex == index}">
                  <a 
                    :title="secondSubject.title" 
                    href="#"
                    @click="secondSubjectChange(secondSubject, index)">
                    {{ secondSubject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':isBuyCountSort}">
                <a title="销量" href="javascript:void(0);" 
                  @click="searchByBuyCount()">销量
                  <template v-if="isBuyCountSort">
                    <span :class="{hide:buyCountDescSort}">↑</span>
                    <span :class="{hide:!buyCountDescSort}">↓</span>
                  </template>
                </a>
              </li>
              <li :class="{'current bg-orange':isGmtCreateSort}">
                <a title="最新" href="javascript:void(0);" 
                  @click="searchByGmtCreate()">最新
                  <template v-if="isGmtCreateSort">
                    <span :class="{hide:gmtCreateDescSort}">↑</span>
                    <span :class="{hide:!gmtCreateDescSort}">↓</span>
                  </template>
                </a>
              </li>
              <li :class="{'current bg-orange':isPriceSort}">
                <a title="价格" href="javascript:void(0);" 
                  @click="searchByPrice()">价格&nbsp;
                  <template v-if="isPriceSort">
                    <span :class="{hide:priceDescSort}">↑</span>
                    <span :class="{hide:!priceDescSort}">↓</span>
                  </template>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total !== 0">
            <ul class="of" id="bna">
              <li v-for="course in data.items" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="course.cover"
                      class="img-responsive"
                      :alt="course.title"/>
                    <div class="cc-mask">
                      <a
                        :href="'/course/' + course.id"
                        title="开始学习"
                        class="comm-btn c-btn-1">
                        开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/' + course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333">
                      {{ course.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-yellow" v-else>
                      <i class="c-fff fsize12 f-fA">￥{{course.price}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }} 人学习</i>
                      |
                      <i class="c-999 f-fA">0 评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              >首</a>
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current - 1)"
              >&lt;</a>
            <a
              v-for="page in data.pages" :key="page"
              :class="{
                current: data.current == page,
                undisable: data.current == page,
              }"
              :title="'第' + page + '页'"
              href="#"
              @click.prevent="gotoPage(page)"
              >{{ page }}</a>
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current + 1)"
              >&gt;</a>
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)"
              >末</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from '@/api/course'

export default {
  data() {
    return {
      // 数据相关
      page:1,                // 当前页
      data:{},               // 课程信息
      firstSubjectList: [],  // 一级分类列表
      secondSubjectList: [], // 二级分类列表
      courseQuery: {},       // 查询对象
      // 展示相关
      firstSubjectIndex: -1,  // 一级分类下标
      secondSubjectIndex: -1, // 二级分类下标
      buyCountDescSort: false,    // 销量排序
      gmtCreateDescSort: false,   // 最新时间排序
      priceDescSort: false,       // 价格排序

      isBuyCountSort: false,
      isGmtCreateSort: false,
      isPriceSort: false,
      isShowAll:true,         // 是否显示全部
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 0.初始化操作
    init() {
      this.initCourseData()
      this.initSubjectList()
    },
    // 1.初始化课程信息
    initCourseData() {
      course.getData(1, 8, this.courseQuery)
        .then(response => {
          this.data = response.data.data.coursesMap
        })
    },
    // 2.初始化课程分类
    initSubjectList() {
      course.getSubjectListByTree()
        .then(response => {
          this.firstSubjectList = response.data.data.subjectList
        })
    },
    // 3.切换分页
    gotoPage(current) {
      course.getData(current, 8, this.courseQuery)
        .then((response) => {
          this.data = response.data.data.coursesMap;
      });
    },
    // 4.点击任何一级分类，获取对应二级分类
    firstSubjectChange(firstSubject, index) {
      // 4.1 重置数据
      this.courseQuery.subjectParentId = ""
      this.courseQuery.subjectId = ""
      this.secondSubjectList = []
      this.buyCountDescSort = false
      this.gmtCreateDescSort = false
      this.priceDescSort = false
      this.resetSortClick()
      this.isShowAll = false
      // 4.2 获取二级分类
      this.secondSubjectList = firstSubject.children
      // 4.3 校正一级分类下标（选中效果）
      this.firstSubjectIndex = index 
      this.secondSubjectIndex = -1
      // 4.4 将一级分类id，赋值查询对象
      this.courseQuery.subjectParentId = firstSubject.id
      // 4.4 执行查询
      this.gotoPage(1)
    },
    // 5.点击任何二级分类
    secondSubjectChange(secondSubject, index) {
      // 5.1 重置数据
      this.courseQuery.subjectId = ""
      this.isShowAll = false
      // 5.2 校正二级分类下标（选中效果）
      this.secondSubjectIndex = index
      // 5.3 将二级分类id，赋值查询对象
      this.courseQuery.subjectId = secondSubject.id
      // 5.4 执行查询
      this.gotoPage(1)
    },
    // 6.根据销量排序
    searchByBuyCount() {
      // 6.1 重置数据
      this.gmtCreateDescSort = false
      this.priceDescSort = false
      this.resetSortClick()
      // 6.2 实现选中效果
      this.isBuyCountSort = true
      // 6.3 颠倒排序
      this.buyCountDescSort = !this.buyCountDescSort
      // 6.4 将销量排序值，赋值查询对象
      this.courseQuery.buyCountDescSort = this.buyCountDescSort
      this.courseQuery.gmtCreateDescSort = this.gmtCreateDescSort
      this.courseQuery.priceDescSort = this.priceDescSort
      // 6.4 执行查询
      this.gotoPage(1)
    },
    // 7.根据最新时间排序
    searchByGmtCreate() {
      // 7.1 重置数据
      this.buyCountDescSort = false
      this.priceDescSort = false
      this.resetSortClick()
      // 7.2 实现选中效果
      this.isGmtCreateSort = true
      // 7.3 颠倒排序
      this.gmtCreateDescSort = !this.gmtCreateDescSort
      // 7.3 将销量排序值，赋值查询对象
      this.courseQuery.buyCountDescSort = this.buyCountDescSort
      this.courseQuery.gmtCreateDescSort = this.gmtCreateDescSort
      this.courseQuery.priceDescSort = this.priceDescSort
      // 7.4 执行查询
      this.gotoPage(1)
    },
    // 8.根据价格排序
    searchByPrice() {
      // 8.1 重置数据
      this.buyCountDescSort = false
      this.gmtCreateDescSort = false
      this.resetSortClick()
      // 8.2 实现选中效果
      this.isPriceSort = true
      // 7.3 颠倒排序
      this.priceDescSort = !this.priceDescSort
      // 8.3 将销量排序值，赋值查询对象
      this.courseQuery.buyCountDescSort = this.buyCountDescSort
      this.courseQuery.gmtCreateDescSort = this.gmtCreateDescSort
      this.courseQuery.priceDescSort = this.priceDescSort
      // 8.4 执行查询
      this.gotoPage(1)
    },
    // 9.查询全部课程（重置）
    searchAll() {
      // 9.1 重置数据
      this.courseQuery = {}
      this.secondSubjectList = []
      this.firstSubjectIndex = -1 
      this.secondSubjectIndex = -1
      
      this.buyCountDescSort = false
      this.gmtCreateDescSort = false
      this.priceDescSort = false

      this.resetSortClick()
      // 9.2 实现选中效果
      this.isShowAll = true
      // 9.3 执行查询
      this.gotoPage(1)
    },
    // 重置排序选中
    resetSortClick() {
      this.isBuyCountSort = false
      this.isGmtCreateSort = false
      this.isPriceSort = false
    }
  },
};
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
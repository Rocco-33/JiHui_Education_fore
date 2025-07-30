<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{ courseFrontInfo.firstSubjectTitle }}</a>
        \
        <span class="c-333 fsize14">{{ courseFrontInfo.secondSubjectTitle }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img 
              :src="courseFrontInfo.cover"
              :alt="courseFrontInfo.title"
              class="dis c-v-pic"
              height="357px"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseFrontInfo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-green" style="font-size: 24px"
                v-if="Number(courseFrontInfo.price) === 0">免费</b>
              <b class="c-yellow" style="font-size: 24px" v-else>
                ￥{{courseFrontInfo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ courseFrontInfo.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <!-- 已支付课程 | 免费课程 -->
            <section 
              class="c-attr-mt" 
              v-if="isBuy || Number(courseFrontInfo.price) === 0">
              <a 
                href="#" title="立即观看" 
                class="comm-btn c-btn-3">
                立即观看</a>
            </section>
            <!-- 未支付课程 -->
            <section 
              class="c-attr-mt" v-else>
              <a 
                @click="createOrder()" 
                href="#" title="立即购买" 
                class="comm-btn c-btn-3">
                立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseFrontInfo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseFrontInfo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseFrontInfo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseFrontInfo.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li v-for="chapter in chapterList" :key="chapter.id"
                            class="lh-menu-stair">
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              s="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>
                              {{ chapter.title }}
                            </a>

                            <ol class="lh-menu-ol" style="display: block">
                              <li v-for="video in chapter.children" :key="video.id"
                                class="lh-menu-second ml30">
                                <a :href="'/player/' + video.videoSourceId" 
                                  target="_blank" title>
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>
                                  {{ video.title }}
                                </a>
                              </li>
                            </ol>

                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="courseFrontInfo.avatar"
                          width="50"
                          height="50"
                          alt
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{ courseFrontInfo.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseFrontInfo.career }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <div class="mt50 commentHtml"><div>
      <h6 class="c-c-content c-infor-title" id="i-art-comment">
        <span class="commentTitle">课程评论</span>
      </h6>
      <section class="lh-bj-list pr mt20 replyhtml">
        <ul>
          <li class="unBr">
            <aside class="noter-pic">
              <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
            </aside>
            <div class="of">
              <section class="n-reply-wrap">
                <fieldset>
                  <textarea 
                    name="" 
                    v-model="comment.content" 
                    placeholder="输入您要评论的文字" 
                    id="commentContent">
                  </textarea>
                </fieldset>
                <p class="of mt5 tar pl10 pr10">
                  <span class="fl ">
                    <tt class="c-red commentContentmeg" style="display: none;"></tt>
                  </span>
                  <input 
                    type="button" 
                    @click="replyComment()" 
                    value="回复"
                    class="lh-reply-btn">
                </p>
              </section>
            </div>
          </li>
        </ul>
      </section>
      <section class="">
        <section class="question-list lh-bj-list pr">
          <ul class="pr10">
            <li v-for="(comment,index) in commentInfo.items" v-bind:key="index">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" :src="comment.avatar">
              </aside>
              <div class="of">
                <span class="fl">
                  <font class="fsize12 c-blue">{{comment.nickname}}</font>
                  <font class="fsize12 c-999 ml5">评论：</font>
                </span>
              </div>
              <div class="noter-txt mt5">
                <p>{{comment.content}}</p>
              </div>
              <div class="of mt5">
                <span class="fr">
                  <font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font>
                </span>
              </div>
            </li>
          </ul>
        </section>
      </section>

        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{ undisable: !commentInfo.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              >首</a>
            <a
              :class="{ undisable: !commentInfo.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(commentInfo.current - 1)"
              >&lt;</a>
            <a
              v-for="page in commentInfo.pages" :key="page"
              :class="{
                current: commentInfo.current == page,
                undisable: commentInfo.current == page,
              }"
              :title="'第' + page + '页'"
              href="#"
              @click.prevent="gotoPage(page)"
              >{{ page }}</a>
            <a
              :class="{ undisable: !commentInfo.hasNext }"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(commentInfo.current + 1)"
              >&gt;</a>
            <a
              :class="{ undisable: !commentInfo.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(commentInfo.pages)"
              >末</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
    </div>
  </div>
</div>
</template>
<script>
import course from '@/api/course'
import comment from '@/api/comment'
import order from '@/api/order'

export default {

  asyncData({params, error}) {
    return {courseId: params.id}
  },
  data() {
    return {
      current: 1,
      size: 5,
      total: 10,
      comment: {           // 评论对象
        content:'',        // 评论内容
        courseId:'',       // 课程id
        teacherId: '',     // 讲师id
      },
      courseFrontInfo: {}, // 课程基本信息
      commentInfo: {},     // 课程评论信息
      chapterList: [],     // 章节大纲列表
      isBuy: false         // 是否已购付费课程
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 0.初始化操作
    init() {
      this.initCourseInfo()
      this.initComment()
      this.isBuyCourse()
    },
    // 1.初始化课程详情
    initCourseInfo() {
      course.getCourseInfoById(this.courseId)
        .then(response => {
          this.courseFrontInfo = response.data.data.courseFrontInfo
          this.chapterList = response.data.data.chapterList
        })
    },
    // 2.初始化评论列表
    initComment() {
      comment.getCommentPageInfoByCourseId(this.current, this.size, this.courseId)
        .then(response => {
          this.commentInfo = response.data.data.commentInfo
        })
    },
    // 3.切换分页
    gotoPage(current) {
      comment.getCommentPageInfoByCourseId(current, 5, this.courseId)
        .then((response) => {
          this.commentInfo = response.data.data.commentInfo
      });
    },
    // 4.评论回复
    replyComment() {
      // 4.1 执行相关赋值
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.courseFrontInfo.teacherId
      // 4.2 添加评论
      comment.addComment(this.comment)
        .then(response => {
          // 4.3 重置相关数据
          this.comment.content = ''
          this.initComment
        })
    },
    // 5.生成订单
    createOrder() {
      order.createOrder(this.courseId)
        .then(response => {
          // 获取订单编号，并跳转到订单详情页面
          this.$router.push({path: '/order/' + response.data.data.orderNo})
        })
    },
    // 6.判断用户是否已购付费课程
    isBuyCourse() {
      order.isBuyCourse(this.courseId)
        .then(response => {
          this.isBuy = response.data.data.isBuy
        })
    }

  },

};
</script>
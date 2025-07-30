<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
    />

    <!-- 定义播放器DOM -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import video from "@/api/video";

export default {
  asyncData({ params, error }) {
    return video.getPlayAuthById(params.id).then((response) => {
      return {
        // 获取视频id与播放凭证
        playAuth: response.data.data.playAuth,
        vid: params.id,
      };
    });
  },
  // 页面渲染完成后，执行的操作
  mounted() {

    new Aliplayer(
      {
        id: "J_prismPlayer",     // 播放器DOM的id
        vid: this.vid,           // 视频id
        playauth: this.playAuth, // 播放凭证
        encryptType: "1",        // 播放视频是加密类型
        width: "100%",
        height: "500px",
      },
      function (player) {
        console.log("播放器创建成功");
      }
    );

  },
};
</script>
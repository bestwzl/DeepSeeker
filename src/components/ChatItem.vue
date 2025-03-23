

<template>
  <div class="chat_cell_wrapper">
    <div class="avatar_wrapper">
      <VanImage
        width="44"
        height="44"
        class="avatar_box"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="info_wrapper">
      <div class="info_title_wrapper">
        <p class="info_title ellipsis">{{ props.chatInfo.title }}</p>
        <p class="info_time">{{ props.chatInfo.updateTime }}</p>
      </div>
      <div class="info_content_wrapper">
        <p class="info_content ellipsis">{{ props.chatInfo.latestMsg }}</p>
        <p class="info_total">{{ props.chatInfo.msgTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Image as VanImage } from 'vant';


const props = defineProps({
  chatInfo: {
    type: Object,
    required: false,
    default: () => {}
  }
});


</script>

<style scoped lang="less">
.chat_cell_wrapper {
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  display: flex;
  margin-bottom: 5px;
  .avatar_wrapper {
    width: 60px;
    height: 60px;
    padding: 8px;
    flex-shrink: 0;
    .avatar_box {
      border-radius: 4px;
      overflow: hidden;
    }
  }
  .info_wrapper {
    flex: 1;
    overflow: hidden;
    padding: 5px 10px 5px 5px;
    border-bottom: 1px solid #eee;
    .info_title_wrapper,
    .info_content_wrapper {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .info_title_wrapper {
      height: 26px;
      .info_title {
        flex: 1;
        font-size: 14px;
        color: #000;
      }
      .info_time {
        font-size: 12px;
        min-width: 30px;
        margin-left: 10px;
      }
    }
    .info_content_wrapper {
      height: 25px;
      .info_content {
        flex: 1;
        font-size: 12px;
        color: #999;
      }
      .info_total {
        font-size: 12px;
        min-width: 20px;
        height: 20px;
        margin-left: 10px;
        background-color: #ddd;
        padding: 3px;
        border-radius: 50%;
        transform: scale(0.8)
      }
    }

  }
}

.ellipsis {
  white-space: nowrap; /* 强制文本在一行显示 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>

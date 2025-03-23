

<template>
  <div class="msg_item_ai">
    <div class="avatar_wrapper">
      <Icon name="chat-o" color="#009fff"/>
    </div>
    <div class="msg_wrapper">
      <div class="msg_content">
        <MarkdownViewer
          v-if="props.msgInfo.reasoningContent"
          :content="props.msgInfo.reasoningContent"
          contentType="reasoning"
        />
        <MarkdownViewer :content="props.msgInfo.content" />
      </div>
      <div class="status_wrapper">
        <Icon v-if="props.msgInfo.status==='failed'"  name="fire-o" color="#ee0a24" />
        <Loading v-if="props.msgInfo.status==='loading'" type="spinner" size="20px" />
        <Icon v-if="props.msgInfo.status==='success'" name="more-o" color="#ccc" />
      </div>
    </div>
  </div>
</template>

<script setup>

import MarkdownViewer from '../../../components/MarkdownViewer.vue';
import { onMounted, defineProps } from 'vue';
import { Icon, Loading } from 'vant';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  msgInfo: {
    type: Object,
    required: true,
    default: () => {},
  }
});

onMounted(() => {
});
</script>

<style scoped lang="less">
  .msg_item_ai{
    width: 100%;
    min-height: 45px;
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    .avatar_wrapper {
      width: 40px;
      height: 40px;
      background-color: rgba(253, 247, 240, 0.551);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
      font-size: 30px;
    }
    .msg_wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 5px;
      padding-top: 10px;
      overflow-x: hidden;
      .status_wrapper {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
        font-size: 24px;
      }
      .msg_content {
        flex: 1;
        min-height: 45px;
        background-color: #fff;
        border-radius: 0 10px 10px 10px;
        padding: 10px;
        margin-right: 5px;
        overflow-x: scroll;
      }
    }
  }

</style>

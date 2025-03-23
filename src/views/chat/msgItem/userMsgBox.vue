

<template>
  <div class="msg_item_user">
    <div class="msg_wrapper">
      <div class="status_wrapper">
        <Icon v-if="props.msgInfo.status==='failed'"  name="fire-o" color="#ee0a24" />
        <Loading v-if="props.msgInfo.status==='loading'" type="spinner" size="20px" />
        <Icon v-if="props.msgInfo.status==='success'" name="more-o" color="#ccc" />
      </div>
      <div class="msg_content">
        <p>
          {{ userInput }}
        </p>
      </div>
    </div>
    <div class="avatar_wrapper">
      <Icon name="contact-o" color="#009fff"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';
import { Icon, Loading } from 'vant';
const props = defineProps(['msgInfo']);
const userInput = props.msgInfo.content;

const onClickLeft = () => {
  alert('点击了左边')
}

onMounted(() => {

});

</script>

<style scoped lang="less">
  .msg_item_user{
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
      padding-right: 5px;
      padding-top: 10px;
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
        margin-left: 5px;
        display: flex;
        justify-content: flex-end;
        p {
          min-height: 45px;
          border-radius: 10px 0 10px 10px;
          padding: 10px;
          background-color: #a9f7ac;
        }
      }
    }
  }

</style>

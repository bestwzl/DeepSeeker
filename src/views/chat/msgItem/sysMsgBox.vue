

<template>
  <div class="msg_item_sys">
    <p class="sys_tips">{{ msgInfo.content }}</p>
  </div>
</template>

<script setup>

import { defineProps } from 'vue';
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


</script>

<style scoped lang="less">
  .msg_item_sys{
    width: 100%;
    min-height: 45px;
    padding: 0 45px;
    background-color: rgba(0, 0, 0, 0.01);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-bottom: 30px;
    .sys_tips {
      line-height: 20px;
    }
  }

</style>

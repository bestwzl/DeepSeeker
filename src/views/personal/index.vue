

<template>
  <div class="personal_page">
    个人中心
  </div>
</template>

<script setup>

import { reactive, onMounted } from 'vue';
import { NavBar, Icon, SwipeCell, Cell, Button, showToast } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter()

onMounted(() => {

});

</script>

<style scoped lang="less">
  .personal_page{
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

</style>

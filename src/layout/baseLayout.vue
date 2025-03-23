<template>
    <div class="base_layout">
      <div class="base_layout_content">
        <router-view />
      </div>
      <Tabbar route>
        <TabbarItem replace to="/chatlist" icon="chat-o">聊天</TabbarItem>
        <TabbarItem replace to="/assistant" icon="service-o">助理</TabbarItem>
        <TabbarItem replace to="/personal" icon="home-o">我的</TabbarItem>
      </Tabbar>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Tabbar, TabbarItem } from 'vant';

const route = useRouter();


</script>


<style scoped lang="less">
  .base_layout {
    width: 100%;
    height: 100%;
    .base_layout_content {
      width: 100%;
    }
  }

</style>

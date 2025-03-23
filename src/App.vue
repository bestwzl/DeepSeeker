<template>

  <!-- 如果使用keepalive 注意在页面中同时使用 defineOptions({ name: "xxx" }); -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedComponents">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>

  <!-- 带有转场效果的 -->
  <!--
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  -->


  <!--
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  -->

</template>

<script setup>
import { onMounted, computed, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { proxy } = getCurrentInstance();

const cachedComponents = computed(() =>
  route.meta.keepAlive ? route.name : ""
);

// 假的用户信息， 正常在登陆之后获取并存入缓存里


const setUserInfo = () => {
  const operatorDatas = {
    userId: '1',
    nickName: '章亮',
    account: 'wuzl91',
    avatar: '',
    token: 'saisjadifuwef9jieufwu24ir3434789y343ue47urf8j374rjuiofer9ojioeurfu0234234j'
  }
  const params = JSON.stringify(operatorDatas);
  proxy.$commonUtils.setSessionItem("operatorInfo", params);
}

onMounted(() => {
  setUserInfo()
});

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



</style>

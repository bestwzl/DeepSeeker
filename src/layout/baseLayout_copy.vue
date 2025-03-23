<template>
    <div class="base_layout">
      <div class="page_header">
        <div class="logo_wrapepr">
          <span class="sys_logo"></span>
          <p class="sys_name">
            <span class="sys_title">Boger</span>
            <span class="sub_title">博学强识，格物致知</span>
          </p>
        </div>
        <div class="tab_wrapepr">
          <div class="tab_list">
            <p
              v-for="tabItem in tabList"
              :key="tabItem.value"
              class="tab_item"
              :class="activeTab === tabItem.value ? 'tab_active' : 'tab_normal'"
              @click="handleClickTab(tabItem.value)"
            >
              <span class="tab_icon"><component :is="tabItem.icon"></component></span>
              <span class="tab_label">{{ tabItem.label }}</span>
            </p>
          </div>
        </div>
        <div class="seting_wrapepr">
          <img src="../assets/img/user_avatar.jpg" @click="handleClickTab('/setting/profile')" alt="">
        </div>
      </div>
      <div class="page_content">
        <router-view />
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Files, ChatLineRound, Avatar, Share, DocumentCopy, DataLine } from '@element-plus/icons-vue';

const route = useRouter();
const activeTab = ref('/knowledge')




watch(
  () => route.currentRoute.value.name,
  (newPath, oldPath) => {
      // console.log('路由已变更：', newPath);
      if (newPath === 'knowledgeDetail') {
        activeTab.value = '/knowledge'
      } else {
        activeTab.value = `/${newPath}`
      }
  },
  { immediate: true, deep: true }
);




const tabList = [
  {
    icon: Files,
    label: '知识库',
    value: '/knowledge',
  },
  {
    icon: Avatar,
    label: '机器人',
    value: '/robot',
  },
  // {
  //   icon: Share,
  //   label: '图',
  //   value: '/flow',
  // },
  // {
  //   icon: DocumentCopy,
  //   label: '文件管理',
  //   value: '/file',
  // },
  {
    icon: DataLine,
    label: '使用指南',
    value: '/instruction',
  }
];


const handleClickTab = (path) => {
  route.push(path);
}



</script>


<style scoped lang="less">
  .base_layout {
    width: 100%;
    height: 100%;
    .page_header {
      width: 100%;
      height: 73px;
      background-color: #fff;
      border-bottom: 1px solid rgba(5, 5, 5, 0.1);
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo_wrapepr {
        display: flex;
        align-items: center;
        .sys_logo {

        }
        .sys_name {
          .sys_title {
            font-size: 36px;
            font-weight: 700;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          }
          .sub_title {
            margin-left: 5px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
          }
        }

      }
      .tab_wrapepr {
        .tab_list {
          display: flex;
          align-items: center;
          background-color: rgb(249, 249, 249);
          border-radius: 6px;
          .tab_item {
            display: flex;
            padding: 10px 15px;
            align-items: center;
            border-radius: 6px;
            .tab_icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              position: relative;
              top: -2px;
            }
            .tab_label {
              margin-left: 5px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .tab_normal {
            cursor: pointer;
            &:hover {
              color: rgb(22, 119, 255);
            }
          }
          .tab_active {
            background-color: rgb(22, 119, 255);
            color: #fff;
          }
        }
      }
      .seting_wrapepr {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ddd;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .page_content {
      width: 100%;
      min-height: calc(100% - 73px);
      background-color: #fff;
      display: flex;
      flex-direction: column;
    }
  }

</style>

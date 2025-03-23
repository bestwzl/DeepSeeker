

<template>
  <div class="chat_list_page">
    <NavBar
      title="DeepSeeker"
      right-text="+"
      @click-right="onClickRight"
    >
      <template #right>
        <Icon name="add-o" size="18" color="#333"/>
      </template>
    </NavBar>

    <div class="search_tool_wrapper">
      <Icon name="search" size="14" />
      <span class="search_title">搜索</span>
    </div>

    <div class="chat_list_wrapper">
      <SwipeCell v-for="item in chatList" :key="item.chatId" >
        <ChatItem :chatInfo="item" @click="handleClickChatItem(item, 'chat')" />
        <template #right>
          <Button square type="primary" style="height: 60px" text="编辑" @click="handleClickChatItem(item, 'update')" />
          <Button square style="height: 60px" text="置顶" @click="handleClickChatItem(item, 'topUp')" />
          <Button square type="danger" style="height: 60px" text="删除" @click="handleClickChatItem(item, 'delete')" />
        </template>
      </SwipeCell>
    </div>
  </div>

  <Popup
    v-model:show="showAddChat"
    position="right"
    :duration="0.2"
    :overlay="false"
    :style="{ width: '100%', height: '100%' }"
  >
    <div>
      <NavBar
        title="创建新聊天"
        left-text="返回"
        left-arrow
        @click-left="onClickBack"
      />

      <div class="create_chat_content">
        <div class="assistant_avatar_wrapper"></div>

        <div class="form_wrapper">
          <div class="form_item">
            <p class="form_label">聊天标题</p>
            <p class="form_input">
              <Field v-model="formInfo.input_title" type="text" placeholder="为该聊天起个名称" />
            </p>
          </div>
          <div class="form_item">
            <p class="form_label">助理描述</p>
            <p class="form_input">
              <Field v-model="formInfo.input_assistant_desc" type="textarea" rows="2" placeholder="简单的描述这个助理扮演的角色,比如：You are a helpful assistant." />
            </p>
          </div>
        </div>

        <div class="create_chat_btn">
          <Button type="success" @click="handleClickStartBtn">开始聊天</Button>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup>

import ChatItem from '../../components/ChatItem.vue';
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { NavBar, Icon, SwipeCell, Popup, Button, showToast, Field } from 'vant';
import { useRouter } from 'vue-router';
import { testChatList } from './chatList.js';
const router = useRouter();
const { proxy } = getCurrentInstance();

const showAddChat = ref(false);
const chatList = reactive(testChatList)

const formInfo = reactive({
  input_title:"",
  input_assistant_desc:""
})

const handleClickChatItem = (item, type) => {
  const {title, chatId} = item;
  if (type === 'update') {
    showToast('编辑');
  } else if (type === 'topUp') {
    showToast('置顶');
  } else if (type === 'delete') {
    showToast('删除');
  } else {
    router.push({
      path: `/chat/id=${chatId}`,
      query: {
        title: title
      }
    });
  }
}

const onClickRight = () => {
  showToast('创建新聊天'); //
  showAddChat.value = true;
}

const onClickBack = () => {
  showAddChat.value = false;
}

const getChatList = () =>{
  const formParams = {};
  proxy.$httpRequest.get("chatList")
    .then((res) => {
      console.log("请求结果then：：", res)
    })
    .catch((err) => {
      console.log("请求错误catch：：", err)
    })
    .finally((res) => {
      console.log("请求结果finally：：", res)
    });
}

const handleClickStartBtn = ()=>{
  const {input_title, input_assistant_desc} = formInfo;
  const params = {
    title: input_title || '新对话',
    assistant_desc: input_assistant_desc || "You are a helpful assistant.",
  };
  console.log("params:", params)

  proxy.$httpRequest.post("createChat", params)
    .then((res) => {
      console.log("请求结果then：：", res)
    })
    .catch((err) => {
      console.log("请求错误catch：：", err)
    })
    .finally((res) => {
      console.log("请求结果finally：：", res)
    });
}




onMounted(() => {
  getChatList()
});

</script>

<style scoped lang="less">
  .chat_list_page{
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search_tool_wrapper {
      width: 100%;
      height: 30px;
      background-color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      .search_title {
        padding-left: 10px;
      }
    }
    .chat_list_wrapper {
      overflow-y: scroll;
    }
  }

  .create_chat_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .assistant_avatar_wrapper {
      width: 120px;
      height: 120px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .form_wrapper {
      width: 100%;
      padding: 0 40px;
      height: 300px;
      background-color: #fff;
      border-radius: 8px;
      text-align: center;
      .form_item {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-top: 30px;
        .form_label {
          display: block;
          margin-bottom: 10px;
        }
        .form_input {
          width: 100%;
          min-height: 45px;
          border-bottom: 1px solid rgb(245, 245, 245);
        }
      }
    }
    .create_chat_btn {
      margin-top: 40px;
    }
  }

</style>

<style lang="less">
.form_item {
  .form_input {
    .van-cell {
      padding: 0;
    }
  }
}
</style>

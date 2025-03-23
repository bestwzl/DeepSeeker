

<template>
  <div class="chatRoomWrapper">
    <div class="headerWrapper">
      <NavBar
        title="deepSeeker"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>

    <div class="contentWrapper">
      <div v-for="msgItem in allMsgList" :key="msgItem.msgId" :id="`msgBox_${msgItem.msgId}`" class="msg_item_box">
        <component
          :id="msgItem.msgId"
          :is="moduleList[msgItem.role]"
          :msgInfo="msgItem"
          :targetAiMsg="targetAiMsg"
          @handleClickSendMsg="(text) => {handleSendMsg(text)}"
        ></component>
      </div>


      <!-- <div>
        <h1>我：</h1>
        <p>{{userInput}}</p>
      </div>
      <div>
        <h1>deepSeeker：</h1>
        <pre>{{resultMsg}}</pre>
      </div> -->
    </div>

    <div class="footerWrapper">
      <div class="baseToolWrapper" :class="showExpandWrapper ? 'baseToolShow' : 'baseToolHide' ">
        <div class="footer_left" @click="handleChickExpand">
          <Icon name="add-o" />
        </div>
        <div class="footer_center">
          <Field
            v-model="userInput"
            rows="1"
            :autosize="{ maxHeight: 120}"
            type="textarea"
            maxlength="500"
            placeholder="请输入"
          />
        </div>
        <div class="footer_right" :class="sendBtnAbled ? '' : 'sendBtnDisabled'" @click="handleSendMsg(userInput)">
          <Icon name="share-o" />
        </div>
      </div>

      <div class="expandToolWrapper" :class="showExpandWrapper ? 'expandShow' : 'expandHide' ">
        <div
          v-for="item in toolList"
          :key="item.title"
          class="tool_item_box"
          :class="item.isChecked ? 'tool_item_active' : 'tool_item_normal'"
          @click="handleChangeTool(item)"
        >
          <div class="tool_icon"><Icon :name="item.icon" /></div>
          <div class="tool_title">{{item.title}}</div>
        </div>

        <div
          key="item.title"
          class="tool_item_box"
          @click="handleClickUpload"
        >
          <div class="tool_icon"><Icon name="back-top" /></div>
          <div class="tool_title">上传附件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserMsgItem from './msgItem/userMsgBox.vue';
import AIMsgItem from './msgItem/AIMsgBox.vue';
import SysMsgItem from './msgItem/sysMsgBox.vue';

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ref, reactive, getCurrentInstance, onMounted, watch, computed } from 'vue';
import { NavBar, Icon, Field, CellGroup } from 'vant';

const { proxy } = getCurrentInstance();

const moduleList = {
  user: UserMsgItem,
  system: AIMsgItem,
  sys: SysMsgItem,
}

const userInput = ref(''); // 用户输入
const showExpandWrapper = ref(false); // 更多工具栏是否展开
const sendBtnAbled = ref(true); // 发送消息按钮是否可点击


const resultMsg = ref('');

const targetAiMsg = reactive(
  {
    role: "system",
    content: '',
    msgId: '',
    id: '',
    status: '' // success, failed
  }
);

// const parsedMarkdown = computed(() => {
//   return marked(props.content);
// });

let eventSource;


const allMsgList = reactive([
  {
    role: "sys",
    content: "你可以直接问答",
    msgId: '445566',
    status: ''
  },
  {
    role: "user",
    content: '你好',
    msgId: '778899',
    status: 'success'
  },
  {
    role: "system",
    content: "啥好不好的，凑合吧",
    msgId: '112233',
    status: 'success'
  }
])

// watch(
//   () => targetAiMsg,
//   (newValue, oldValue) => {
//     console.log("000000:::", newValue)
//   },
//   { deep: true } // 深度监听
// );


const toolList = reactive([
  {
    icon: 'cluster-o',
    title: '深度思考（R1）',
    key: 'deepseekR1',
    isChecked: false
  },
  {
    icon: 'link-o',
    title: '联网搜索',
    key: 'networking',
    isChecked: false
  }
])



const handleSendMsg = (msg) => {
  if(!msg){
    alert("总得聊点啥吧")
  } else {
    const randomMsgId = proxy.$commonUtils.getRandomKey();

    const userMsgInfo = {
      role: "user",
      content: msg,
      msgId: `user_${randomMsgId}` ,
      status: 'loading' // success, failed
    }

    allMsgList.push(userMsgInfo);

    handleSendMsgStream(randomMsgId);
  }
}

const handleSendMsgStream = (randomMsgId) => {
  const aiMsgId = `ai_${randomMsgId}`;
  resetAiMsgDefault();
  targetAiMsg.msgId = aiMsgId;

  const msgParams = {
    model: "deepseek-chat",
    messages: getHistoryMsgList(allMsgList),
    stream: true
  }

  // const resultArr = []
  eventSource = fetchEventSource("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer sk-09d2637b005a424db3297092795d0137'
    },
    body: JSON.stringify(msgParams),
    onopen(event) {
      sendBtnAbled.value = false;
      console.log("SSE连接已打开:", event);
      changeMsgStatus(`user_${randomMsgId}`, 'success')
      targetAiMsg.status = 'loading';
      allMsgList.push(targetAiMsg);
    },
    onmessage(msg) {
      if (msg && msg.data && msg.data !== '[DONE]') {
        const fragmentString = JSON.parse(msg.data)?.choices[0]?.delta?.content; // 分段获取的字符串
        // console.log("分段获取的字符串：：：：：", fragmentString);
        targetAiMsg.content += fragmentString;
        resultMsg.value += fragmentString;
      }
    },
    onerror(event) {
      sendBtnAbled.value = true;
      console.error("发生错误:", event);
      changeMsgStatus(`ai_${randomMsgId}`, 'failed');
      allMsgList.forEach((msgItemInfo, index) => {
        if(msgItemInfo.msgId === aiMsgId){
          if(msgItemInfo.content){
            const newObj = JSON.parse(JSON.stringify(targetAiMsg));
            msgItemInfo = newObj;
          } else {
            allMsgList.splice(index, 1);
          }

        }
      })
      resetAiMsgDefault();
    },
    onclose() {
      sendBtnAbled.value = true;
      changeMsgStatus(`ai_${randomMsgId}`, 'success');

      console.log("收到的回复：：：：：", targetAiMsg);
      console.log("聊天数据列表：：：：：", allMsgList);

      allMsgList.forEach(msgItemInfo => {
        if(msgItemInfo.msgId === aiMsgId){
          const newObj = JSON.parse(JSON.stringify(targetAiMsg));
          msgItemInfo = newObj;
        }
      })
      resetAiMsgDefault();
    }
  });
}

// 重置初始化消息
const resetAiMsgDefault = () => {
  targetAiMsg.content = '';
  targetAiMsg.msgId = '';
  targetAiMsg.id = '';
  targetAiMsg.status = '';
}

// 获取最近5条聊天记录
const getHistoryMsgList = (allHistoryMsgList) => {
  const lastFiveElements = allHistoryMsgList.slice(-5);
  const history5 = [];
  lastFiveElements.forEach(item => {
    const {role, content} = item;
    if(['system', 'user'].includes(role)){
      history5.push({
        role,
        content
      })
    }
  })
  return history5;
}
// 修改消息状态
const changeMsgStatus = (msgIds, status) => {
  allMsgList.forEach(item => {
    const {msgId} = item;
    if(msgId === msgIds){
      item.status = status;
    }
  })
}

// 更多工具栏
const handleChickExpand = () => {
  showExpandWrapper.value = !showExpandWrapper.value;
}

// 点击某个工具
const handleChangeTool = (row) => {
  const {key} = row;
  toolList.forEach((item) => {
    if(item.key === key){
      item.isChecked = !item.isChecked;
    }
  })
}

const handleClickUpload = () => {
  alert("上传文件")
}

const onClickLeft = () => {
  alert('点击了左边')
}

const onClickRight = () => {
  alert('点击了右边')
}

onMounted(() => {
  
});

</script>

<style scoped lang="less">
  .chatRoomWrapper{
    background-color: antiquewhite;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .headerWrapper{
      width: 100%;
      min-height: 46px;
      flex-shrink: 0;
      background-color: rgb(17, 147, 202);
    }
    .contentWrapper {
      flex: 1;
      width: 100%;
      overflow-y: auto;
      padding: 20px 10px;
    }
    .footerWrapper {
      background-color: rgb(249, 249, 249);
      width: 100%;
      min-height: 50px;
      flex-shrink: 0;
      box-sizing: border-box;
      .baseToolWrapper{
        width: 100%;
        min-height: 50px;
        display: flex;
        align-items: flex-end;
        transition: 0.4s;
        .footer_left,
        .footer_right{
          width: 36px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }
        .footer_center{
          flex: 1;
          height: 100%;
        }
        .sendBtnDisabled {
          opacity: 0.8;
          background-color: #eee;
          pointer-events: none; /* 禁用指针事件 */
          cursor: not-allowed;  /* 更改鼠标指针样式，表示不可点击 */
        }
      }
      .baseToolShow {
        padding: 5px 10px 5px;
        border-bottom: 1px solid rgb(240, 240, 240);
      }
      .baseToolHide {
        padding: 5px 10px 15px;
      }
      .expandToolWrapper{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: 0.4s;
        .tool_item_box {
          width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .tool_icon {
            width: 45px;
            height: 45px;
            font-size: 28px;
            border: 1px solid rgb(245, 244, 244);
            background-color: #fff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tool_title {
            margin-top: 5px;
            font-size: 12px;
            transform: scale(0.8);
          }
        }
        .tool_item_active {
          border-color: #009fff;
          color: #009fff;
        }
        .tool_item_normal {
          border-color: rgb(245, 244, 244);
        }
      }
      .expandShow {
        top: 0px;
        height: 100px;
        padding: 5px 10px 20px;
        // animation: fadeInBottom 0.2s linear;
        // animation-fill-mode: forwards; /* 保留动画结束状态 */
      }
      .expandHide {
        top: 120px;
        height: 0px;
        // animation: fadeOutBottom 0.2s linear;
        // animation-fill-mode: forwards; /* 保留动画结束状态 */
      }
    }
  }

  @keyframes fadeInBottom {
    0% {
      top: 120px;
      height: 0px;
    }
    100% {
      top: 0px;
      height: 100px;
    }
  }
  @keyframes fadeOutBottom {
    0% {
      top: 0px;
      height: 100px;
    }
    100% {
      top: 120px;
      height: 0px;
    }
  }
</style>

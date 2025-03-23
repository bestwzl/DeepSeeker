/*
 * 配置后端接口请求地址
 */
import { urlConfig } from "./ipConfig";

const baseURL = `${urlConfig.baseUrl}`;
const mockURL = `/mock`;

/**
 * 拼接请求的url
 */

const urlUtils = {
  userLogin: `${baseURL}/auth/login`,   // 登录
  userLogout: `${baseURL}/auth/logout`, // 登出

  chatList: `${baseURL}/chat/getChatList`, // 获取聊天聊表
  createChat: `${baseURL}/chat/creatChat`, // 创建新聊天
  deleteChat: `${baseURL}/chat/deleteChat`, // 删除聊天
  editChat: `${baseURL}/chat/updateChat`, // 更新聊天
  searchChatRecord: `${baseURL}/chat/searchChatRecord`, // 查询聊天

};

// =========== mockData ==========
urlUtils.getTestData = `${mockURL}/testApi`; //

export { urlUtils };

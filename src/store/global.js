import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('globals', {
  state: () => {
    return {
      loginPageShow: false,
      operatorTime: '',
      operatorCode: '',
      operatorInfo: '',
      loginUserInfo: {}
    }
  },
  actions: {
    showLoginPage(status) {
      this.loginPageShow = status
    },
    setLoginUserInfo(key, value) {
      this.loginUserInfo[key] = value;
    },
    getLoginUserInfo(key) {
      return this.loginUserInfo[key];
    },
    setOperatorTime(params) {
      this.operatorTime = params;
    },
    setOperatorCode() {
      this.operatorCode = params;
    },
    setOperatorInfo() {
      this.operatorInfo = params;
    },
    getOperatorTime() {
      return this.operatorTime;
    },
    getOperatorCode() {
      return this.operatorCode;
    },
    getOperatorInfo() {
      return this.operatorInfo;
    },
  },
})
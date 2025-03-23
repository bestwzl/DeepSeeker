import { defineStore } from 'pinia'

export const useGlobalInfoStore = defineStore('globalInfo', () => {
  const loginDialog = ref(false)
  function showLogin() {
    loginDialog.value = true
  }
  function hideLogin() {
    loginDialog.value = false
  }
  return { loginDialog, showLogin, hideLogin }
})
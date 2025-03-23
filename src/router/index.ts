import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import BaseLayout from '../layout/baseLayout.vue';
import ChatRoom from '../views/chat/index.vue';
import ChatList from '../views/chatList/index.vue';
import Assistant from '../views/assistant/index.vue';
import Personal from '../views/personal/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/chatlist'
  },
  {
    path: '/baseLayout',
    component: BaseLayout,
    children: [
      {
        path: '/chatlist',
        name: 'ChatList',
        component: ChatList
      },
      {
        path: '/assistant',
        name: 'Assistant',
        component: Assistant
      },
      {
        path: '/personal',
        name: 'Personal',
        component: Personal
      },
    ]
  },
  {
    path: '/chat/:id',
    name: 'ChatRoom',
    component: ChatRoom,
    meta: {
      keepAlive: true
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

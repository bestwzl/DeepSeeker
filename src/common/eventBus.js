import { inject, provide, ref } from 'vue';

export default function useEventBus() {
  const bus = ref({});

  provide('eventBus', bus);

  return {
    busEmit: (event, ...args) => {
      if (bus.value[event]) {
        bus.value[event](...args)
      }
    },
    busOn: (event, callback) => {
      bus.value[event] = callback;
    },
    busOff: (event) => {
      bus.value[event] = null;
    }
  };
}
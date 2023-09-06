import { init } from '@rematch/core';

// 方便重置状态
const inie_state = {
  count_1: 0,
  count_2: 0,
  list: [],
};

// global: store内的单个状态模块
const global = {
  state: {
    ...inie_state,
  },
  reducers: {
    update_state(state, params) {
      return {
        ...state,
        ...params,
      };
    },
    reset_state() {
      return {
        ...inie_state,
      };
    },
  },
  effects: {
    async fetch_list() {
      // ...异步请求逻辑
      this.update_state({
        list: [1, 2, 3],
      });
    },
  },
};

/**
 * 这里因为dumi的文件展示原因 不能将global拆为单独文件
 * 这里的global应该拆出去作为store内单个model模板文件
 * 所有模块集合 可以优化为自动化导入
 * 如在webpack中使用require.context
 * 在vite中使用import.meta.glob
 */
const models = {
  global,
};

const store = init({
  plugins: [],
  models,
});

export default store;

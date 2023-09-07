// 方便重置状态
const inie_state = {
  count_1: 1,
  count_2: 1,
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

export default global;

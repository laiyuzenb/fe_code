import { init } from '@rematch/core';
import global from './global.model.js';

/**
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

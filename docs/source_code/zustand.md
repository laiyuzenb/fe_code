---
nav:
  title: 工具库源码解析
  order: 1
---

# react 状态管理库 zustand

[官网](https://docs.pmnd.rs/zustand/getting-started/introduction)

80行代码 实现 react 状态管理库 Zustand

效果演示
<code src='./demos/zustand/index.jsx'></code>

```js
import { useDebugValue } from 'react';
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector';

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn,
  );

  useDebugValue(slice);

  return slice;
}

function useBoundStore(api) {
  const useStoreSelector = (selector) => {
    return useStore(api, selector);
  };

  useStoreSelector.withEqualityFn = (selector, equalityFn) => {
    return useStore(api, selector, equalityFn);
  };

  return useStoreSelector;
}

const createStoreImpl = (createState) => {
  let state;

  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;

      state =
        replace || typeof nextState !== 'object'
          ? nextState
          : Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api = { setState, getState, subscribe, destroy };

  state = createState(setState, getState, api);

  return api;
};

const createStore = (createState) => {
  return createState ? createStoreImpl(createState) : createStoreImpl;
};

const createImpl = (createState) => {
  const createStateIsFunc = typeof createState === 'function';

  const api = createStateIsFunc ? createStore(createState) : createState;

  const useBoundStore = (selector, equalityFn) => {
    return useStore(api, selector, equalityFn);
  };

  Object.assign(useBoundStore, api);

  return useBoundStore;
};

export const create = (createState) => {
  return createState ? createImpl(createState) : createImpl;
};
```

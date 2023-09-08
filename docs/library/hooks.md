---
nav:
  title: 工具库示例
  order: 0
---

# ahooks 工具库

[官网](https://ahooks.gitee.io/zh-CN)

## 生命周期及effect

### 组件 mount 与 unmount

<code src="./demos/hooks/mount.jsx"></code>

### useUpdate: 返回一个函数，调用会强制组件重新渲染

### useUpdateEffect: 只在依赖更新时执行的useEffect，忽略首次执行

### useAsyncEffect: 支持异步函数的useEffect

### useUnmountedRef: 当前组件是否已经卸载

## 状态控制

### useSetState: 像 Class 组件 this.setState 一样改变状态

<code src="./demos/hooks/useSetState.jsx"></code>

### useReactive: 像 Vue 一样 响应式更新状态

`useReactive` 产生可操作的代理对象一直都是同一个引用 `useEffect` 、 `useMemo` 、 `useCallback` 子组件属性传递 等如果依赖的是这个代理对象是不会引起重新执行。

<code src="./demos/hooks/useReactive.jsx"></code>

### useRafState: 在 requestAnimationFrame callback 时更新 state

### useGetState: 给 useState 增加了一个 getter 方法，以获取当前最新值

### useLatest: 返回当前最新值的 Hook，可以避免闭包问题

### useCreation: 一个useMemo 和 useRef 的替代品

因为 useMemo 不能保证被 memo 的值一定不会被重计算，而 useCreation 可以保证这一点。

而相比于 useRef，你可以使用 useCreation 创建一些常量，这些常量和 useRef 创建出来的 ref 有很多使用场景上的相似，但对于复杂常量的创建，useRef 却容易出现潜在的性能隐患。

```js
const a = useRef(new Subject()); // 每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了
const b = useCreation(() => new Subject(), []); // 通过 factory 函数，可以避免性能隐患
```

### useMemoizedFn: 持久化 function, 代替 useCallback

### useBoolean: 优雅的管理 boolean 状态

### useToggle: 在两个状态值间切换

### useUrlState: 通过 url query 控制 状态

### useCookieState: 将状态存储在 Cookie 中

### useLocalStorageState: 将状态存储在 localStorage 中

### useSessionStorageState: 将状态存储在 sessionStorage 中

### useMap: 管理 Map 类型状态

### useSet: 管理 Set 类型状态

## utils hook

### useDebounceFn: 函数防抖

### useDebounceEffect: useEffect 防抖

### useThrottleFn: 函数节流

### useThrottleEffect: useEffect 节流

### useLockFn: 竞态锁

### useInterval: setInterval hook

### useTimeout: setTimeout hook

### useRafInterval: requestAnimationFrame 模拟的 setInterval

### useRafTimeout: requestAnimationFrame 模拟的 setTimeout

### useDeepCompareEffect: 支持依赖对象深比较的 useEffect

### useVirtualList: 虚拟滚动

### useCountDown: 倒计时

用于给一个异步函数增加竞态锁，防止并发执行。

## DOM 操作

### useFullscreen: 元素全屏

### useClickAway: 监听目标元素外的点击事件

### useHover: 是否有鼠标悬停

### useMutationObserver: 监听指定 DOM 树变化

参考 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

### useInViewport: 元素是否在可见区域

观察元素是否在可见区域，以及元素可见比例。更多信息参考 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。

### useKeyPress: 监听键盘按键，支持组合键，支持按键别名

### useLongPress: 监听目标元素的长按事件

### useMouse: 监听鼠标位置

### useScroll: 监听元素的滚动位置

### useSize: 监听 DOM 节点尺寸变化

### useTextSelection: 实时获取用户当前选取的文本内容及位置

## 开发者调试

### useTrackedEffect: 追踪触发 useEffect 的是哪个依赖

### useWhyDidYouUpdate: 哪个属性改变导致了组件的 rerender

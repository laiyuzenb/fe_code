---
nav:
  title: 工具库源码解析
  order: 1
---

# event emitter库 mitt

[npm](https://www.npmjs.com/package/mitt) | [github](https://github.com/developit/mitt/blob/main/src/index.ts)

```js
function mitt(all) {
  // 传入一个map 或初始化一个空map，用于存储事件类型和对应的处理函数
  all = all || new Map();

  return {
    all,

    on(type, handler) {
      // 从map中获取对应的事件类型的处理函数
      const handlers = all.get(type);

      // 如果存在，就将新的处理函数push进去
      if (handlers) {
        handlers.push(handler);
      } else {
        // 如果不存在，就初始化一个数组，将处理函数push进去
        all.set(type, [handler]);
      }
    },

    off(type, handler) {
      // 从map中获取对应的事件类型的处理函数
      const handlers = all.get(type);

      // 如果不存在处理函数，直接返回
      if (!handlers) {
        return;
      }

      if (handler) {
        // 如果存在处理函数，就将对应的处理函数从数组中删除
        handlers.splice(
          // 保证是个正整数
          handlers.indexOf(handler) >>> 0,
          1,
        );
      } else {
        // 如果不存在处理函数，就将对应的事件类型处理函数数组设为空数组
        all.set(type, []);
      }
    },

    emit(type, event) {
      // 从map中获取对应的事件类型的处理函数
      let handlers = all.get(type);

      if (handlers) {
        // 如果存在处理函数，就遍历执行
        handlers.slice().map((handler) => {
          handler(event);
        });
      }

      // 如果存在通配符*，就执行通配符*的处理函数
      handlers = all.get('*');

      if (handlers) {
        handlers.slice().map((handler) => {
          handler(type, event);
        });
      }
    },
  };
}
```

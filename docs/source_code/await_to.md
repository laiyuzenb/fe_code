---
nav:
  title: 工具库源码解析
  order: 1
---

# 异步错误处理库 await-to

[npm](https://www.npmjs.com/package/await-to-js) | [github](https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts)

```js
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function to(promise, errorExt) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}
```

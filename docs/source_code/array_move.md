---
nav:
  title: 工具库源码解析
  order: 1
---

# 交换数组两项的位置

[npm](https://www.npmjs.com/package/array-move) | [github](https://github.com/sindresorhus/array-move/blob/main/index.js)

```js
// 可变的
export function arrayMoveMutable(array, fromIndex, toIndex) {
  // 开始下标 容错处理
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    // 结束下标容错处理
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    // 将数组中的元素从数组中删除，并返回删除的元素
    const [item] = array.splice(fromIndex, 1);

    // 将删除的元素插入到数组中
    array.splice(endIndex, 0, item);
  }
}

// 不可变的
export function arrayMoveImmutable(array, fromIndex, toIndex) {
  // 通过扩展运算符，将数组展开成一个新的数组
  const newArray = [...array];

  // 将新的数组传入可变数组的函数中 通过可变数组改变数组具体项的值
  arrayMoveMutable(newArray, fromIndex, toIndex);

  // 再返回新的数组
  return newArray;
}
```

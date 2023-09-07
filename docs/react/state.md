---
nav:
  title: React
  order: 0
---

# 状态管理

目前在Github上面有太多的React状态管理工具了

1. Redux
2. Dva
3. mobx
4. jotai
5. recoil
6. valtio
7. redux-toolkit
8. rematch
9. zustand
10. ...

以下只介绍我用过的且觉得好用的

## Rematch

它和redux-toolkit类似 都是对redux的使用做了封装，降低了使用时的心智负担（不用再写一堆模版文件了 如 createAction, reducer...）

<code src='./demos/state/rematch/app.jsx'></code>

### 状态文件结构组织方式建议

#### 集中管理（按文件功能类型划分）

<Tree>
  <ul>
    <li>
      src
      <small>组件库源码目录</small>
      <ul>
        <li>
          store
          <small>在store文件夹内组织所有状态模块文件</small>
          <ul>
            <li>
              index.js
              <small>收集所有model创建store</small>
            </li>
            <li>
               models
              <small>所有model文件夹</small>
              <ul>
                <li>
                  global.js
                  <small>global模块</small>
                </li>
                <li>
                  user.js
                  <small>user模块</small>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          app.js
          <small>项目入口文件</small>
        </li>
      </ul>
    </li>
  </ul>
</Tree>

### 分布管理（按UI模块划分）

<Tree>
<ul>
  <li>
    src
    <small>组件库源码目录</small>
    <ul>
      <li>
        store.js
        <small>收集散落在各个文件夹下的.model.js文件后创建store</small>
      </li>
      <li>
        app.js
        <small>项目入口文件</small>
      </li>
      <li>
        pages
        <small>项目入口文件</small>
        <ul>
          <li>
            page_a
            <small>页面a文件夹</small>
            <ul>
              <li>
                pagea.model.js
               <small>页面a状态model文件</small>
              </li>
            </ul>
          </li>
          <li>
            page_b
            <small>页面b文件夹</small>
            <ul>
              <li>
                pageb.model.js
                <small>页面b状态model文件</small>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</Tree>

## Zustand

就是这么简单 可以根据自己的想法去组织你的状态文件位置

<code src='./demos/state/zustand/index.jsx'></code>

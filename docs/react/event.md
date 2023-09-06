---
nav:
  title: React
  order: 0
---

# addEventListener

在React18版本中调整了事件处理处理机制，导致在以下场景使用，使用`addEventListener`时 与 React18之前的版本处理不一致而导致产生BUG

[Dan Abramov 的回复](https://github.com/facebook/react/issues/24657#issuecomment-1150119055)
[react github discussions](https://github.com/reactwg/react-18/discussions/21)

## 场景

1. 点击按钮弹出弹窗
2. 在弹窗mount后使用 `addEventListener`监听click事件
3. 如果点击的位置不在弹窗内，关闭弹窗

以上场景在React18版本中会导致 点击按钮后 弹窗会立即关闭（在Modal组件内监听的click事件 监听到了上层组件按钮的点击）

```jsx
import { useEffect, useState, useRef } from 'react';

function Modal({ onClose }) {
  const ref = useRef();

  const handle_click = (event) => {
    // 判断点击的位置是否在弹窗内
    if (!ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handle_click);
    return () => {
      document.removeEventListener('click', handle_click);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ccc',
      }}
    >
      Modal
    </div>
  );
}

export default function App() {
  const [open, set_open] = useState(false);

  const handle_click = () => {
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '关闭弹窗' : '打开弹窗'}</button>
      {open ? (
        <Modal
          onClose={() => {
            set_open(false);
          }}
        />
      ) : null}
    </div>
  );
}
```

## 解决方案

在上面的issues中 Dan提出了 可以使用 0 timeout 或者 忽略特定事件

以下再补充几点及列出具体代码

### 1：0 timeout

```jsx
import { useEffect, useState, useRef } from 'react';

function Modal({ onClose }) {
  const ref = useRef();

  const handle_click = (event) => {
    // 判断点击的位置是否在弹窗内
    if (!ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const clock = setTimeout(() => {
      document.addEventListener('click', handle_click, false);
    }, 0);

    return () => {
      clearTimeout(clock);
      document.removeEventListener('click', handle_click, false);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ccc',
      }}
    >
      Modal
    </div>
  );
}

export default function App() {
  const [open, set_open] = useState(false);

  const handle_click = () => {
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '关闭弹窗' : '打开弹窗'}</button>
      {open ? (
        <Modal
          onClose={() => {
            set_open(false);
          }}
        />
      ) : null}
    </div>
  );
}
```

### 2：忽略特定事件

该方案 来自微软的一个UI库的 [PR](https://github.com/microsoft/fluentui/pull/18323) 使用了一个已经废弃但依然有效的api [window.event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/event)

```jsx
import { useEffect, useState, useRef } from 'react';

const getWindowEvent = (target: Node | Window): Event | undefined => {
  if (target) {
    if (
      typeof (target as Window).window === 'object' &&
      (target as Window).window === target
    ) {
      return target.event;
    }

    return (target as Node).ownerDocument?.defaultView?.event ?? undefined;
  }

  return undefined;
};

function Modal({ onClose }) {
  const ref = useRef();

  const handle_click = (event) => {
    // 判断点击的位置是否在弹窗内
    if (!ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const conditional_handler = (event) => {
      let currentEvent = getWindowEvent(window);

      if (event === currentEvent) {
        currentEvent = undefined;
        return;
      }

      handle_click(event);
    };

    document.addEventListener('click', conditional_handler);

    return () => {
      document.removeEventListener('click', conditional_handler);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ccc',
      }}
    >
      Modal
    </div>
  );
}

export default function App() {
  const [open, set_open] = useState(false);

  const handle_click = () => {
    console.log('111');
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '关闭弹窗' : '打开弹窗'}</button>
      {open ? (
        <Modal
          onClose={() => {
            set_open(false);
          }}
        />
      ) : null}
    </div>
  );
}
```

### 3：忽略首次事件

```jsx
import { useEffect, useState, useRef } from 'react';

function Modal({ onClose }) {
  const ref = useRef();

  const handle_click = (event) => {
    // 判断点击的位置是否在弹窗内
    if (!ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    let is_first = false;
    const conditional_handler = (event) => {
      if (is_first === false) {
        is_first = true;
        return;
      }

      handle_click(event);
    };

    document.addEventListener('click', conditional_handler);

    return () => {
      document.removeEventListener('click', conditional_handler);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ccc',
      }}
    >
      Modal
    </div>
  );
}

export default function App() {
  const [open, set_open] = useState(false);

  const handle_click = () => {
    console.log('111');
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '关闭弹窗' : '打开弹窗'}</button>
      {open ? (
        <Modal
          onClose={() => {
            set_open(false);
          }}
        />
      ) : null}
    </div>
  );
}
```

### 4：按钮click时中阻止冒泡

```jsx
import { useEffect, useState, useRef } from 'react';

function Modal({ onClose }) {
  const ref = useRef();

  const handle_click = (event) => {
    // 判断点击的位置是否在弹窗内
    if (!ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handle_click);
    return () => {
      document.removeEventListener('click', handle_click);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        border: '1px solid #ccc',
      }}
    >
      Modal
    </div>
  );
}

export default function App() {
  const [open, set_open] = useState(false);

  const handle_click = (event) => {
    event.stopPropagation();
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '关闭弹窗' : '打开弹窗'}</button>
      {open ? (
        <Modal
          onClose={() => {
            set_open(false);
          }}
        />
      ) : null}
    </div>
  );
}
```

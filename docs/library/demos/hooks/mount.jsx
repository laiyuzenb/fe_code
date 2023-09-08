import { useState } from 'react';
import { useMount, useUnmount } from 'ahooks';

const App = () => {
  useMount(() => {
    alert('mount');
  });

  useUnmount(() => {
    alert('unmount');
  });

  return <div>app组件</div>;
};

export default () => {
  const [open, set_open] = useState(false);

  const handle_click = () => {
    set_open(!open);
  };

  return (
    <div>
      <button onClick={handle_click}>{open ? '卸载app' : '载入app'}</button>
      {open ? <App /> : null}
    </div>
  );
};

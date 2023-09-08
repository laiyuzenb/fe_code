import { useSetState } from 'ahooks';

export default () => {
  const [state, setState] = useSetState({
    name: 'ahooks',
    age: 1,
  });

  const handle_update = () => {
    setState({
      name: state.name + '1',
    });
  };

  const handle_callback_update = () => {
    setState((prev) => ({ age: prev.age + 1 }));
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button onClick={handle_update}>直接调用更新 name: {state.name}</button>

      <button onClick={handle_callback_update}>
        回调更新 age: {state.age}
      </button>
    </div>
  );
};

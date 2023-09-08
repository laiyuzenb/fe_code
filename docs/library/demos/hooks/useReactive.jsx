import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive({
    count: 1,
  });

  const handle_update = () => {
    state.count = state.count + 1;
  };

  return (
    <div>
      <button onClick={handle_update}>+1 count: {state.count}</button>
    </div>
  );
};

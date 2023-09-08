import { useDispatch, useSelector } from 'react-redux';

function RematchDemo() {
  const {
    global: { count_1, count_2, list },
  } = useSelector((state) => state);

  const {
    global: { fetch_list, update_state, reset_state },
  } = useDispatch();

  const handle_count = () => {
    update_state({ count_1: count_1 + 1, count_2: count_2 - 1 });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200 }}
    >
      <div>count_1: {count_1}</div>

      <div>count_2: {count_2}</div>

      <div>list.length: {list.length}</div>

      <button onClick={handle_count}>count_1 + 1 且 count_2 - 1</button>

      <button onClick={fetch_list}>fetch_list</button>

      <button onClick={reset_state}>重置状态</button>
    </div>
  );
}

export default RematchDemo;

import { create } from './zustand';

const use_demo_store = create((set) => ({
  count_1: 0,
  count_2: 0,
  update_demo_state: (payload) =>
    set(() => ({
      ...payload,
    })),
}));

export default function App() {
  const { count_1, count_2, update_demo_state } = use_demo_store();

  const handle_click = () => {
    update_demo_state({ count_1: count_1 + 1, count_2: count_2 - 1 });
  };

  return (
    <div>
      <div>
        count_1: {count_1} count_2: {count_2}
      </div>
      <button onClick={handle_click}>count1 + 1 且 count2 - 1</button>
    </div>
  );
}

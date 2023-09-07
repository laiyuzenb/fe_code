import { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import './index.less';

const SortableItem = sortableElement(({ value }) => (
  <li className="drag_demo_li">{value}</li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="drag_demo_ul">{children}</ul>;
});

export default () => {
  const [data, set_data] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
  ]);

  const handle_sort_end = ({ oldIndex, newIndex }) => {
    const new_data = arrayMoveImmutable(data, oldIndex, newIndex);
    set_data(new_data);
  };

  return (
    <SortableContainer
      onSortEnd={handle_sort_end}
      helperClass="sortableHelper"
      axis="xy"
      distance={8}
    >
      {data.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </SortableContainer>
  );
};

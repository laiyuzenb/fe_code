import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

function Card(props) {
  const { data, swapIndex, index } = props;

  const ref = useRef(null);

  const [{ dragging }, drag] = useDrag({
    type: 'card',
    item: {
      id: data.id,
      index: index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });
  const [, drop] = useDrop({
    accept: 'card',
    hover(item) {
      swapIndex(index, item.index);
      item.index = index;
    },
    // drop(item: DragData) {
    //     swapIndex(index, item.index)
    // }
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div ref={ref} className={dragging ? 'card dragging' : 'card'}>
      {data.content}
    </div>
  );
}

export default Card;

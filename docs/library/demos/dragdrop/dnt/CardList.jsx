import { useEffect, useCallback, useRef, useState } from 'react';
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
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div ref={ref} className={dragging ? 'dnd_card dnd_dragging' : 'dnd_card'}>
      {data.content}
    </div>
  );
}

function CardList(props) {
  const [cardList, setCardList] = useState([
    {
      id: 0,
      content: '000',
    },
    {
      id: 1,
      content: '111',
    },
    {
      id: 2,
      content: '222',
    },
    {
      id: 3,
      content: '333',
    },
    {
      id: 4,
      content: '444',
    },
  ]);

  const swapIndex = useCallback((index1, index2) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;

    setCardList([...cardList]);
  }, []);

  return (
    <div className="card-list">
      {cardList.map((item, index) => (
        <Card
          data={item}
          key={'card_' + item.id}
          index={index}
          swapIndex={swapIndex}
        />
      ))}
    </div>
  );
}
export default CardList;

import { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardList from './CardList';
import './index.less';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CardList />
    </DndProvider>
  );
}

export default App;

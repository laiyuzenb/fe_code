import { Provider } from 'react-redux';
import RematchDemo from './RematchDemo.jsx';
import store from './store.js';

export default function App() {
  return (
    <Provider store={store}>
      <RematchDemo />
    </Provider>
  );
}

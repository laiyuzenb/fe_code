import Tooltip from './Tooltip';
import './tooltip.less';

function App() {
  return (
    <Tooltip title="提示文字" placement="top">
      <button>按钮</button>
    </Tooltip>
  );
}

export default App;

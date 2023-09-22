import { useRive } from '@rive-app/react-canvas';
import './index.less';

function App() {
  const { RiveComponent } = useRive({
    src: 'https://public.rive.app/community/runtime-files/3462-7242-shooting-range-game.riv',
    stateMachines: 'State Machine - GAME',
    artboard: 'Main',
    autoplay: true,
  });

  return (
    <div>
      <RiveComponent className="rive_container" />
    </div>
  );
}

export default App;

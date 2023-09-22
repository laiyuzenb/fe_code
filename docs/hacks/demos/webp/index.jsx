import { useState, useRef } from 'react';
import image from '../../../../public/crystalcard.webp';
import { base64 } from './base64';
import './index.less';

function App() {
  const webp_ref = useRef(null);
  const [show, set_show] = useState(true);

  return (
    <div className="webp_demo_wrapper">
      {show ? (
        <img src={image} alt="" id="webp_animation" ref={webp_ref} />
      ) : null}

      <div className="actions">
        <button
          onClick={() => {
            set_show(!show);
          }}
        >
          {show ? '隐藏' : '显示'}
        </button>

        <button
          onClick={() => {
            if (webp_ref.current) {
              webp_ref.current.src = '';
              webp_ref.current.src = image;
            }
          }}
        >
          重置 ref src
        </button>
        <button
          onClick={() => {
            if (webp_ref.current) {
              webp_ref.current.src = `${base64}#${Date.now()}`;
            }
          }}
        >
          base64 + 时间戳
        </button>
      </div>
    </div>
  );
}

export default App;

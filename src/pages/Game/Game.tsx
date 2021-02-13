import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import block from 'bem-cn-lite';
import { Topping } from '@/components/Topping';
import { Engine } from '@/pages/Game/script/Game';

import './Game.scss';

const b = block('game');

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState({});
  const [isStart, setStart] = useState(false);
  const [isPause, setPause] = useState(false);
  const [pauseText, setPauseText] = useState('Пауза');

  useEffect(() => {
    setEngine(new Engine(canvasRef.current));
  }, []);

  const handlerStart = useCallback(() => {
    if (isStart) {
      (engine as Engine).newGame();
    } else {
      (engine as Engine).startGame();
      setStart(true);
    }
  }, [engine, isStart]);

  const handlerPause = useCallback(() => {
    if (engine) {
      (engine as Engine).pauseGame();
    }

    if (isPause) {
      setPauseText('Пауза');
      setPause(false);
    } else {
      setPauseText('Продолжить');
      setPause(true);
    }
  }, [engine, isPause]);

  return (
    <div className={b()}>
      <Topping title="Игра Pac-Man" />
      <div className={b('header')}>
        <button className={b('button')} type="button" onClick={handlerStart}>
          Начть заново
        </button>
        <button
          disabled={!isStart}
          className={b('button')}
          type="button"
          onClick={handlerPause}
        >
          {pauseText}
        </button>
      </div>
      <canvas
        className={b('canvas')}
        ref={canvasRef}
        width={700}
        height={400}
      />
    </div>
  );
};

const WrappedGame = memo(Game);

export { WrappedGame as Game };

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { Prompt } from 'react-router-dom';
import block from 'bem-cn-lite';
import { Topping } from '@/components/Topping';
import { Button } from '@/components/Button';
import { Engine } from '@/pages/Game/script/Engine';

import './Game.scss';

const b = block('game');

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState({});
  const [isStart, setStart] = useState(false);
  const [isPause, setPause] = useState(false);
  const [pauseText, setPauseText] = useState('Пауза');

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

  const handleStop = useCallback(() => {
    if (engine) {
      (engine as Engine).finishGame();
    }

    setStart(false);
    setPause(false);
    setPauseText('Пауза');
  }, [engine, isPause]);

  const preventReload = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const engine = new Engine(canvas, ctx);
      setEngine(engine);
      // --
      // (engine as Engine).startGame();
      // setStart(true);

      if (preventReload) {
        if (engine) {
          (engine as Engine).pauseGame();
        }
        window.addEventListener('beforeunload', preventReload);
      }
    }
  }, []);

  return (
    <div className={b()}>
      <Prompt
        when={isStart}
        message="Вы действительно хотите завершить игру?"
      />
      <Topping title="Игра Pac-Man" />
      <div className={b('header')}>
        <Button onClick={handlerStart} size="small game__button">
          Начть заново
        </Button>
        <Button
          disabled={!isStart}
          onClick={handlerPause}
          size="small game__button"
        >
          {pauseText}
        </Button>
        <Button disabled={!isStart} onClick={handleStop} size="small">
          Заверишить
        </Button>
      </div>
      <canvas
        className={b('canvas')}
        ref={canvasRef}
        width={800}
        height={500}
      />
    </div>
  );
};

const WrappedGame = memo(Game);

export { WrappedGame as Game };

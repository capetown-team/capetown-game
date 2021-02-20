import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import block from 'bem-cn-lite';
import { Topping } from '@/components/Topping';
import { Button } from '@/components/Button';
import { Engine } from '@/pages/Game/script/Engine';

import './Game.scss';

const b = block('game');

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [isStart, setStart] = useState(false);
  const [isPause, setPause] = useState(false);

  const handlerStart = useCallback(() => {
    if (isStart) {
      (engine as Engine).newGame();
      setPause(false);
    } else {
      (engine as Engine).startGame();
      setStart(true);
    }
  }, [engine, isStart, isPause]);

  const handlerPause = useCallback(() => {
    if (engine) {
      (engine as Engine).pauseGame();
    }

    if (isPause) {
      setPause(false);
    } else {
      setPause(true);
    }
  }, [engine, isPause]);

  const handleStop = useCallback(() => {
    if (engine) {
      (engine as Engine).finishGame();
    }

    setStart(false);
    setPause(false);
  }, [engine, isPause]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const engine = new Engine(
      canvas,
      canvas.getContext('2d') as CanvasRenderingContext2D
    );
    setEngine(engine);
    // engine.startGame();

    return () => {
      if (engine && (engine as Engine).started) {
        (engine as Engine).finishGame();
      }
    };
  }, []);

  return (
    <div className={b()}>
      <Topping title="Игра Pac-Man" />
      <div className={b('header')}>
        <Button onClick={handlerStart} size="small game__button">
          Новая игра
        </Button>
        <Button
          disabled={!isStart}
          onClick={handlerPause}
          size="small game__button"
        >
          {isPause ? 'Продолжить' : 'Пауза'}
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

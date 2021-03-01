import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import block from 'bem-cn-lite';
import { Topping } from '@/components/Topping';
import { Button } from '@/components/Button';
import { Engine } from '@/pages/Game/script/Engine';
import {
  deactivateFullscreen,
  fullScreen,
  HTMLElementFullScreen,
  DocumentFullScreen
} from '@/modules/webApi';

import './Game.scss';

const b = block('game');

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLElementFullScreen>(null);

  const [engine, setEngine] = useState<Engine | null>(null);
  const [isStart, setStart] = useState(false);
  const [isPause, setPause] = useState(false);
  const [messageFullScreen, setMessageFullScreen] = useState('На весь экран');

  const handlerStart = useCallback(() => {
    if (isStart && engine) {
      engine.newGame();
      setPause(false);
    } else if (engine) {
      engine.startGame();
      setStart(true);
    }
  }, [engine, isStart]);

  const handlerPause = useCallback(() => {
    if (engine) {
      engine.pauseGame();
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

  const handlerFS = () => {
    const target = gameRef.current;
    if (messageFullScreen === 'На весь экран') {
      setMessageFullScreen('Обычный режим');
      fullScreen(target as HTMLElementFullScreen);
    } else {
      setMessageFullScreen('На весь экран');
      deactivateFullscreen(document as DocumentFullScreen);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const engine = new Engine(
      canvas,
      canvas.getContext('2d') as CanvasRenderingContext2D
    );
    setEngine(engine);
    // engine.startGame();

    return () => {
      if (engine && engine.started) {
        engine.finishGame();
      }
    };
  }, []);

  return (
    <div className={b()}>
      <Topping title="Игра Pac-Man" />
      <div className={b('game')} ref={gameRef}>
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
          <Button
            disabled={!isStart}
            onClick={handleStop}
            size="small game__button"
          >
            Завершить
          </Button>
          <Button size="small game__button" onClick={handlerFS}>
            {messageFullScreen}
          </Button>
        </div>
        <canvas
          className={b('canvas')}
          ref={canvasRef}
          width={800}
          height={500}
        />
      </div>
    </div>
  );
};

const WrappedGame = memo(Game);

export { WrappedGame as Game };

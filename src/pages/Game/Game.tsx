import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import block from 'bem-cn-lite';

import { Topping } from '@/components/Topping';
import { Button } from '@/components/Button';
import { Popup } from '@/components/Notification';
import { BodyNotification } from '@game/BodyNotification';
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
  const [isInfo, setInfo] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  let messageFullScreen = 'На весь экран';

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
    if (engine && !engine.gameOver) {
      engine.pauseGame();

      if (isPause) {
        setPause(false);
      } else {
        setPause(true);
      }
    }
  }, [engine, isPause]);

  const handlerInfo = useCallback(() => {
    if (engine && isStart && !isPause) {
      setPause(true);
      engine.pauseGame();
    }

    setInfo(true);
  }, [engine, isPause, isStart]);

  const handlerClosePopup = useCallback(() => {
    setInfo(false);
  }, []);

  const handleStop = useCallback(() => {
    if (engine) {
      (engine as Engine).finishGame();
    }

    setStart(false);
    setPause(false);
  }, [engine, isPause]);

  const handlerFS = () => {
    const target = gameRef.current;
    if (isFullScreen) {
      setFullScreen(true);
      fullScreen(target as HTMLElementFullScreen);
    } else {
      setFullScreen(false);
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

  useEffect(() => {
    messageFullScreen = 'На весь экран';
    if (isFullScreen) messageFullScreen = 'Обычный режим';
  }, [isFullScreen]);

  return (
    <div className={b()}>
      {isInfo && (
        <Popup
          title="Правила игры"
          component={BodyNotification}
          size="a"
          onCancel={handlerClosePopup}
        />
      )}
      <Topping title="Игра Pac-Man" />
      <div className={b('game')} ref={gameRef}>
        <div className={b('header')}>
          <Button onClick={handlerStart} size="small game__button">
            Новая игра
          </Button>
          <Button size="small game__button" onClick={handlerFS}>
            На весь экран
          </Button>
          <Button onClick={handlerInfo} size="small game__button">
            Правила
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

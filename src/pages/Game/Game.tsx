import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent
} from 'react';
import block from 'bem-cn-lite';

import { Topping } from '@/components/Topping';
import { Button } from '@/components/Button';
import { Popup } from '@/components/Popup';
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

  const handlerFS = (e: MouseEvent) => {
    const elemButton = e.target as HTMLElement;
    const target = gameRef.current;
    if (elemButton.innerHTML === 'На весь экран') {
      elemButton.innerHTML = 'Обычный режим';
      fullScreen(target as HTMLElementFullScreen);
    } else {
      elemButton.innerHTML = 'На весь экран';
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

  const bodyPopup = () => (
    <div>
      <p>Управление персонажем происходит через стрелки:</p>
      <p>&larr; &nbsp; &uarr; &nbsp; &rarr; &nbsp; &darr;</p>
      <p>
        Игрок управляет Пакманом через лабиринт, поедая пак-точки во время
        движения.
      </p>
      <p>
        Когда все точки съедены, Pac-Man переходит к следующему этапу (все тот
        же лабиринт) с повышенным уровнем сложности.
      </p>
      <p>
        Призраки бродят по лабиринту, все время пытаясь поймать Пак-Мэна. Если
        призрак касается Pac-Man, жизнь потеряна. Когда все жизни потеряны,
        неудивительно, что игра заканчивается.
      </p>
    </div>
  );

  return (
    <div className={b()}>
      {isInfo && (
        <Popup
          title="Правила игры"
          component={bodyPopup}
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

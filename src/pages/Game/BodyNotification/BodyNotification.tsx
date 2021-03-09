import React from 'react';

import './BodyNotification.scss';

export const BodyNotification = () => (
  <>
    <p className="bodyNotification__text">
      Управление персонажем происходит через стрелки:
    </p>
    <p className="bodyNotification__text">
      &larr; &nbsp; &uarr; &nbsp; &rarr; &nbsp; &darr;
    </p>
    <p className="bodyNotification__text">
      Игрок управляет Пакманом через лабиринт, поедая пак-точки во время
      движения.
    </p>
    <p className="bodyNotification__text">
      Когда все точки съедены, Pac-Man переходит к следующему этапу (все тот же
      лабиринт) с повышенным уровнем сложности.
    </p>
    <p className="bodyNotification__text">
      Призраки бродят по лабиринту, все время пытаясь поймать Пак-Мэна. Если
      призрак касается Pac-Man, жизнь потеряна. Когда все жизни потеряны,
      неудивительно, что игра заканчивается.
    </p>
  </>
);

import React from 'react';
import block from 'bem-cn-lite';

const b = block('table');

type UserType = {
  displayName: string;
  avatar: null | string;
  score: number;
  index: number;
};

const LeaderList = ({ avatar, displayName, score, index }: UserType) => {
  return (
    <div className={b('list')}>
      <div className={b('item')}>{index + 1}</div>
      <div className={b('item')}>
        <div className={b('avatar')}>
          {avatar ? (
            <img className={b('img')} src={avatar} alt={displayName} />
          ) : null}
        </div>
      </div>
      <div className={b('item', { main: true })}>{displayName}</div>
      <div className={b('item')}>{score}</div>
    </div>
  );
};

export default React.memo(LeaderList);

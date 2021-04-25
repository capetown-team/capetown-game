import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';

import { Props as LeaderProps } from '@/pages/Leaders/Leaders';
import { baseUrl } from '@/constants';

const b = block('table');

type Props = Omit<LeaderProps, 'id'>;

const LeaderList: FC<Props> = ({ avatar, displayName, score, index }) => {
  return (
    <li className={b('list')}>
      <div className={b('item')}>{index ? index + 1 : 1}</div>
      <div className={b('item')}>
        <div className={b('avatar')}>
          {avatar ? (
            <img
              className={b('img')}
              src={`${baseUrl}/api/v2/resources/${avatar}`}
              alt={displayName}
            />
          ) : null}
        </div>
      </div>
      <div className={b('item', { main: true })}>{displayName}</div>
      <div className={b('item')}>{score}</div>
    </li>
  );
};

const WrappedLeaderList = memo(LeaderList);

export { WrappedLeaderList as LeaderList };

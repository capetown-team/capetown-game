import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import './SomeError.scss';

const b = block('error');

type Props = {
  text?: string;
};

const SomeError: FC<Props> = ({ text }) => (
  <div className={b()}>
    <div className={b('sketch')}>
      <div className={b('bee-sketch', { red: true })} />
      <div className={b('bee-sketch', { blue: true })} />
    </div>
    <div className={b('info')}>
      <div className={b('title')}>{text || 'The game over'}</div>
      <Link className={b('link')} to="/">
        На главную?
      </Link>
    </div>
  </div>
);
const WrappedSomeError = memo(SomeError);

export { WrappedSomeError as SomeError };

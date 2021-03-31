import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';

import './SomeError.scss';

const b = block('error');

type Props = {
  match: {
    path: string;
  };
};

const SomeError: FC<Props> = ({ match }) => {
  const text =
    match.path === '/error' ? 'Oops! Something wrong :(' : 'Oops! Not found :(';
  const code = match.path === '/error' ? '500' : '404';

  return (
    <div className={b()}>
      <PageMeta title={code} description={text} />
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
};
const WrappedSomeError = memo(SomeError);

export { WrappedSomeError as SomeError };

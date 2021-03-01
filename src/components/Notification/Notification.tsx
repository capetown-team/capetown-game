import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';
import { Button } from '@/components/Button';

import './Notification.scss';

const b = block('Notification');

type Props = {
  title: string;
  component?: FC;
  onCancel: ClickType;
  size: string;
};

const Notification: FC<Props> = ({ title, component, size, onCancel }) => {
  const Component = component;
  return (
    <div className={b()}>
      <div className={b('wrap', { size })}>
        <header>
          <div className={b('title')}>{title}</div>
        </header>
        <div className={b('body')}>{Component && <Component />}</div>
        <footer className={b('footer')}>
          <Button size="small" onClick={onCancel}>
            Подтвердить
          </Button>
        </footer>
      </div>
    </div>
  );
};

const WrappedPopup = memo(Notification);

export { WrappedPopup as Popup };

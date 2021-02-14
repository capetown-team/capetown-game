import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';
import { Button } from '@/components/Button';

import './Popup.scss';

const b = block('popup');

type Props = {
  message: string;
  onCancel: ClickType;
  onConfirm: ClickType;
};

const Popup: FC<Props> = ({ message, onCancel, onConfirm }) => {
  return (
    <div className={b()}>
      <div className={b('wrap')}>
        <header>
          <button className={b('close')} type="button" onClick={onCancel}>
            &nbsp;
          </button>
          <div className={b('title')}>{message}</div>
        </header>
        <footer className={b('footer')}>
          <Button size="small popup__button" onClick={onConfirm}>
            Подтвердить
          </Button>
          <Button size="small" onClick={onCancel}>
            Вернуться
          </Button>
        </footer>
      </div>
    </div>
  );
};

const WrappedPopup = memo(Popup);

export { WrappedPopup as Popup };

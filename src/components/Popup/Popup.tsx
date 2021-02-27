import React, { memo, FC, Component } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';
import { Button } from '@/components/Button';

import './Popup.scss';

const b = block('popup');

type Props = {
  message?: string;
  component?: Component;
  onCancel: ClickType;
  onConfirm?: ClickType;
};

const Popup: FC<Props> = ({ message, onCancel, onConfirm }) => {
  // const Component = component;
  return (
    <div className={b()}>
      <div className={b('wrap')}>
        <header>
          {onConfirm && (
            <button className={b('close')} type="button" onClick={onCancel}>
              &nbsp;
            </button>
          )}

          <div className={b('title')}>{message}</div>
        </header>
        <footer className={b('footer', { center: !onConfirm })}>
          {onConfirm ? (
            <>
              <Button size="small popup__button" onClick={onConfirm}>
                Подтвердить
              </Button>
              <Button size="small" onClick={onCancel}>
                Отмена
              </Button>
            </>
          ) : (
            <Button size="small" onClick={onCancel}>
              Подтвердить
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};

const WrappedPopup = memo(Popup);

export { WrappedPopup as Popup };

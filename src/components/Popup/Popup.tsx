import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';
import { Button } from '@/components/Button';

import './Popup.scss';

const b = block('popup');

type Props = {
  title: string;
  component?: FC;
  onCancel: ClickType;
  onConfirm?: ClickType;
  size: string;
};

const Popup: FC<Props> = ({ title, component, size, onCancel, onConfirm }) => {
  const Component = component;
  return (
    <div className={b()}>
      <div className={b('wrap', { size })}>
        <header>
          {onConfirm && (
            <button className={b('close')} type="button" onClick={onCancel}>
              &nbsp;
            </button>
          )}
          <div className={b('title')}>{title}</div>
        </header>
        <div className={b('body')}>{Component && <Component />}</div>
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

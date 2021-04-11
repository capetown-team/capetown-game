import React, { FC, memo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn-lite';

import { baseUrl } from '@/constants';
import { ClickType } from '@/types.d';

import './Dropdown.scss';

const b = block('dropdown');

export type DropNavType = {
  name: string;
  redirect?: string;
  handler?: ClickType;
};

type Props = {
  name: string;
  avatar: string | null;
  nav: DropNavType[];
};

const Dropdown: FC<Props> = ({ name, avatar, nav }) => {
  const [isShow, setShow] = useState(false);
  const history = useHistory();

  const handlerToggleNav = useCallback(() => {
    setShow(!isShow);
  }, [isShow]);

  const handlerHideNav = useCallback(() => {
    setShow(false);
  }, []);

  const handlerRedirect = useCallback(
    (name) => {
      history.replace(name);
      setShow(false);
    },
    [history]
  );

  return (
    <div onMouseLeave={handlerHideNav} className={b()}>
      <div
        role="presentation"
        className={b('panel', { avatar: true, active: isShow })}
        onClick={handlerToggleNav}
      >
        <div className={b('title')}>{name}</div>
        <div className={b('avatar')}>
          <img
            className={b('img')}
            src={avatar ? `${baseUrl}${avatar}` : ''}
            alt=""
          />
        </div>
        <div className={b('arrow')} />
      </div>

      <ul className={b('nav', { active: isShow })}>
        {nav.map(({ name, redirect, handler }) => {
          return redirect ? (
            <li
              key={name}
              role="presentation"
              className={b('list')}
              onClick={() => handlerRedirect(redirect)}
            >
              {name}
            </li>
          ) : (
            <li
              key={name}
              role="presentation"
              className={b('list')}
              onClick={handler}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const WrappedDropdown = memo(Dropdown);

export { WrappedDropdown as Dropdown };

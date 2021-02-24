import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { authSelector, userSelector } from '@/reducer/user/selectors';
import { logout } from '@/reducer/user/actions';
import { Dropdown } from '@/components/Dropdown';
import { DropNavType } from '@/components/Dropdown/Dropdown';
import { ROUTES } from '@/constants';
import { AppState } from '@/reducer';
import { overLinks, userLinks } from './data';

import './Header.scss';

const b = block('header');

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, user } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      user: userSelector(state)
    };
  });

  const [links, setLinks] = useState(overLinks);

  const handlerLogout = useCallback(() => {
    dispatch(logout());

    if (!isAuth) {
      history.replace(ROUTES.SIGNIN);
    }
  }, []);

  const dropLists: DropNavType[] = [
    {
      redirect: '/profile',
      name: 'Профиль'
    },
    {
      handler: handlerLogout,
      name: 'Выйти'
    }
  ];

  useEffect(() => {
    if (isAuth) {
      setLinks(userLinks);
    } else {
      setLinks(overLinks);
    }
  }, [isAuth]);

  return (
    <header className={b()}>
      <div className={b('wrap')}>
        <Link className={b('logo')} to="/">
          Pac-Man
        </Link>
        <nav className={b('nav')}>
          {links.map(({ exact, name, linkTo }) => (
            <li key={name} className={b('list')}>
              <NavLink
                exact={!!exact}
                activeClassName={b('link', { active: true })}
                className={b('link')}
                to={linkTo}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </nav>

        {isAuth && (
          <Dropdown
            name={user.first_name}
            avatar={user.avatar}
            nav={dropLists}
          />
        )}
      </div>
    </header>
  );
};

const WrappedHeader = memo(Header);

export { WrappedHeader as Header };

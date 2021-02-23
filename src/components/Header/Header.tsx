import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { getAuth, getUser } from '@/reducer/user/selectors';
import { logout } from '@/reducer/user/actions';
import { logOut } from '@/api';
import { Dropdown } from '@/components/Dropdown';
import { DropNavType } from '@/components/Dropdown/Dropdown';
import { ROUTES } from '@/constants';
import { overLinks, userLinks } from './data';

import './Header.scss';

const b = block('header');

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useSelector(getAuth);
  const user = useSelector(getUser);
  const [links, setLinks] = useState(overLinks);

  const handlerLogout = useCallback(() => {
    logOut()
      .then(() => {
        dispatch(logout());
        history.replace(ROUTES.SIGNIN);
      })
      .catch((error) => {
        const logError = (error.response && error.response.data) || {};

        // временно alert
        alert(logError.error || error.message);
      });
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

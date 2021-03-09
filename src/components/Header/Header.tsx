import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { AppState } from '@/reducers';
import {
  authSelector,
  userSelector,
  loadSelector
} from '@/reducers/user/selectors';
import { logout } from '@/reducers/user/actions';
import { Dropdown } from '@/components/Dropdown';
import { DropNavType } from '@/components/Dropdown/Dropdown';
import { Loading } from '@/components/Loading';
import { ROUTES } from '@/constants';
import { overLinks, userLinks } from './data';

import './Header.scss';

const b = block('header');

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, user, isLoad } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      user: userSelector(state),
      isLoad: loadSelector(state)
    };
  });

  const [links, setLinks] = useState(overLinks);

  const handlerLogout = useCallback(() => {
    dispatch(logout());

    if (!isAuth) {
      history.replace(ROUTES.SIGNIN);
    }
  }, [dispatch, history, isAuth]);

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
      {isLoad && <Loading />}

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

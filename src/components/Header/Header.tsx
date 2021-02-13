import React, { memo, useEffect, useState } from 'react';
import block from 'bem-cn-lite';
import { Link } from 'react-router-dom';

import { overLinks, userLinks } from './data';

import './Header.scss';

const b = block('header');

const Header = () => {
  const [isAuth, setAuth] = useState(false);
  const [links, setLinks] = useState(overLinks);

  useEffect(() => {
    setAuth(true);

    if (isAuth) {
      setLinks(userLinks);
    }
  }, [isAuth]);

  return (
    <header className={b()}>
      <div className={b('wrap')}>
        <Link className={b('logo')} to="/">
          Pac-Man
        </Link>
        <nav className={b('nav')}>
          {links.map(({ name, linkTo }) => (
            <li key={name} className={b('list')}>
              <Link className={b('link')} to={linkTo}>
                {name}
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </header>
  );
};

const WrappedHeader = memo(Header);

export { WrappedHeader as Header };

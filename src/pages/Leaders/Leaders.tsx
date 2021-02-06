import React from 'react';

import './Leaders.scss';

export const Leaders = (): JSX.Element => (
  <main className="container">
    <header className="topping">
      <div className="search">
        <input className="search__input" type="text" placeholder="Поиск" />
      </div>
      <h2 className="topping__title">Доска лидеров</h2>
    </header>

    <ul className="pagination">
      <li className="pagination__list">
        <span className="pagination__link">«</span>
      </li>
      <li className="pagination__list">
        <span className="pagination__link">1</span>
      </li>
      <li className="pagination__list">
        <span className="pagination__link pagination__link_active">2</span>
      </li>
      <li className="pagination__list">
        <span className="pagination__link">3</span>
      </li>
      <li className="pagination__list">
        <span className="pagination__link">»</span>
      </li>
    </ul>

    <div className="table">
      <div className="table__list table__list_header">
        <div className="table__item">#</div>
        <div className="table__item">Ава</div>
        <div className="table__item table__item_main">Игрок</div>
        <div className="table__item">Очки</div>
      </div>
      <div className="table__list">
        <div className="table__item">1</div>
        <div className="table__item">
          <div className="table__avatar">
            <img src="" alt="" />
          </div>
        </div>
        <div className="table__item table__item_main">Арина</div>
        <div className="table__item">1170</div>
      </div>
      <div className="table__list">
        <div className="table__item">1</div>
        <div className="table__item">
          <div className="table__avatar">
            <img
              className="table__img"
              src="https://ca.slack-edge.com/TPV9DP0N4-U018E7Z0T1B-a4ca2e163b27-512"
              alt=""
            />
          </div>
        </div>
        <div className="table__item table__item_main">Арина</div>
        <div className="table__item">1170</div>
      </div>
    </div>
  </main>
);

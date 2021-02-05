import React from 'react';

import './Forum.scss';

export const Forum = () => (
  <main className="container">
    <header className="topping">
      <div className="search">
        <input className="search__input" type="text" placeholder="Поиск" />
      </div>
      <h2 className="topping__title">Форум</h2>
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
        <div className="table__item">Статус</div>
        <div className="table__item table__item_main">Тема</div>
        <div className="table__item table__item_message">Сообщения</div>
      </div>
      <div className="table__list">
        <div className="table__item">
          <div className="table__page" />
        </div>
        <div className="table__item table__item_main">
          Делимся секретами игры
        </div>
        <div className="table__item table__item_message">1170</div>
      </div>
    </div>
  </main>
);

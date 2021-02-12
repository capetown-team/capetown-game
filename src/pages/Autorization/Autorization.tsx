import React from 'react';

import './Autorization.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import block from 'bem-cn-lite';
import { Link } from 'react-router-dom';

const b = block('form');

export const Autorization = () => {
  return (
    <div className={b('wrapper')}>
      <form className={b('login')}>
        <div className={b('title')}>Авторизация</div>
        <div className={b('main')}>
          <div className={b('row')}>
            <div className={b('title-input')}>Логин</div>
            <Input placeholder="Логин" />
          </div>
          <div className="row">
            <div className={b('title-input')}>Пароль</div>
            <Input placeholder="Пароль" />
          </div>
          <div className={b('row-button')}>
            <Button type="submit" size="s">
              Вход
            </Button>
          </div>
          <div className={b('row')}>
            <Link className={b('link')} to="/registration">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

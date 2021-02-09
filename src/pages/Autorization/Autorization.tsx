import React from 'react';

import './Autorization.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export const Autorization = (): JSX.Element => (
  <div className="body">
    <form className="login">
      <div className="title">Авторизация</div>
      <div className="main">
        <div className="row">
          <div className="title-input"> Логин</div>
          <Input placeHolder="Логин" />
        </div>
        <div className="row">
          <div className="title-input"> Пароль </div>
          <Input placeHolder="Пароль" />
        </div>
        <div className="row-button">
          <Button type="submit" size="s">
            Вход
          </Button>
        </div>
        <div className="row">
          <div className="link">
            <a href="/registration">Регистрация</a>
          </div>
        </div>
      </div>
    </form>
  </div>
);

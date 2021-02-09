import React from 'react';

import './Registration.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export const Registration = (): JSX.Element => (
  <div className="body">
    <form className="login">
      <div className="title">Регистрация</div>
      <div className="row">
        <div className="title-input"> Email </div>
        <Input placeHolder="Email" />
      </div>
      <div className="row">
        <div className="title-input"> Логин </div>
        <Input placeHolder="Логин" />
      </div>
      <div className="row">
        <div className="title-input"> Имя </div>
        <Input placeHolder="Имя" />
      </div>
      <div className="row">
        <div className="title-input"> Пароль </div>
        <Input placeHolder="Пароль" />
      </div>
      <div className="row">
        <div className="title-input"> Пароль (еще раз) </div>
        <Input placeHolder="Пароль (еще раз) " />
      </div>
      <div className="row-button">
        <Button type="submit" size="s">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  </div>
);

import React from 'react';

import './Registration.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import block from 'bem-cn-lite';

const b = block('form');

export const Registration = () => {
  return (
    <div className={b('wrapper')}>
      <form className={b('login')}>
        <div className={b('title')}>Регистрация</div>
        <div className={b('row')}>
          <div className={b('title-input')}>Email</div>
          <Input placeholder="Email" />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Логин</div>
          <Input placeholder="Логин" />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Имя</div>
          <Input placeholder="Имя" />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Пароль</div>
          <Input placeholder="Пароль" />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Пароль (еще раз)</div>
          <Input placeholder="Пароль (еще раз)" />
        </div>
        <div className={b('row-button')}>
          <Button type="submit" size="s">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};

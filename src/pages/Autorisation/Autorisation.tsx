import React from 'react';

import './Autorisation.scss';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const Autorisation = (): JSX.Element => (
    <div className="body">
        <form className="login" >
            <div className="title">
                Авторизация
            </div>
            <div className="main">
                <div className="row">
                    <div className="title-input"> Логин</div>
                    <Input id="login" placeHolder="Логин">
                    </Input>
                </div>
                <div className="row">
                    <div className="title-input"> Пароль </div>
                    <Input id="password" placeHolder="Пароль">
                    </Input>
                </div>
                <div className="row-button">
                    <Button> Вход </Button>
                    <div className="link"> <a href="#"> 
                        Регистрация</a>
                    </div>
                </div>
            </div>
        </form>
    </div>
)
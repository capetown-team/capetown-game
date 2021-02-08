import React from 'react';

import './Registration.scss';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const Registration = (): JSX.Element => (
    <div className="body">
        <form className="login" >              
            <div className="title">
                Регистрация
            </div>                
            <div className="row">
                <div className="title-input"> Email </div>
                <Input id="email" placeHolder="Email"></Input>           
            </div>
            <div className="row">
                <div className="title-input"> Логин </div>
                <Input id="lobin" placeHolder="Логин"></Input>
            </div>  
            <div className="row">
                <div className="title-input"> Имя </div>
                <Input id="name" placeHolder="Имя"></Input>
            </div>           
            <div className="row">
                <div className="title-input"> Пароль </div>
                <Input id="password" placeHolder="Пароль"></Input>
            </div>           
            <div className="row">
                <div className="title-input"> Пароль (еще раз) </div>
                <Input id="passwordConfirm" placeHolder="Пароль (еще раз) "></Input>
            </div>
            <div className="row-button">
                <Button>Зарегистрироваться</Button>
            </div>
        </form>
    </div>
);
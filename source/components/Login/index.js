//Добавляем компоненет с базовой разметкой
//Просто кнопка войти
//В app описать условный рендеринг компонентов, при условии доступа к закрытым роутам надо рендерить их, а если доступа нет, делать редирект на роут /login
//Хранить состояние возможности доступа к закрытым роутам. Подойдет state компонента app
//Сделать логаут, добавив соответствующую кнопку компоненту статусбар
//Состояние логина хорошо бы хранить в контексте, чтобы иметь возможность его удобно менять из компонента статусбар
//Сделать сохранение состояния логина между перезагрузками страницы через локалсторедж

//Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//instruments
import Styles from './styles.m.css';

export default class Login extends Component {
    render() {
        const { loginSuccess } = this.props;

        return (
            <div className = { Styles.login }>
                <Link
                    to = '/feed'
                    onClick = { () => loginSuccess(true) }>Войти
                </Link>
            </div>
        );
    }
}

import React from 'react'

import ReactDOM from 'react-dom';
import {useForm} from 'react-hook-form';
import DEMO from "../../store/constant";
import {NavLink} from "react-router-dom";

function SignUpHook() {

    const {register, handleSubmit, errors} = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body text-center">
                <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon"/>
                </div>
                <h3 className="mb-4">Регистрация</h3>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Имя пользователя"
                           ref={register({required: true, maxLength: 20})}/>
                </div>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Эл. почта"/>
                </div>
                <div className="input-group mb-4">
                    <input type="password" className="form-control" placeholder="Пароль"/>
                </div>
                <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"
                               ref={register({required: true})}/>
                        <label htmlFor="checkbox-fill-2" className="cr">Согласен с<a
                            href={DEMO.BLANK_LINK}> политикой сервиса</a>.</label>
                    </div>
                </div>
                <input type="submit"
                       className="btn btn-primary shadow-2 mb-4">Зарегистрироваться</input>
                <p className="mb-0 text-muted">Уже есть аккаунт? <NavLink
                    to="/auth/signin-1">Войти</NavLink></p>
            </div>
        </form>
    )
}

//export default SignUpHook;
//ReactDOM.render(<SignUpHook />, document.getElementById('root'));

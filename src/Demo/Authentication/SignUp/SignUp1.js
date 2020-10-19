import React from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from "react-hook-form";

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import {ErrorMessage} from '@hookform/error-message';

export default function SignUp1() {

    const {formState, trigger, getValues, register, handleSubmit, errors} = useForm({mode: "all", criteriaMode: "all"});
    const onSubmit = data => {
        console.log(formState.isValid)
        console.log(data)

    }
    const repeatVal = passwordRepeat =>
        passwordRepeat === getValues().password || "Пароли должны совпадать";
    const validateRepeat = () => {
        if (formState.touched || formState.isSubmitting) {
            // adjust this accordingly to differen validation modes. I assume "onSubmit" and "onChange" for revalidation here.
            trigger("retry_password");
        }
    };
    return (

        //TODO: yup schema validation
        <Aux>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <div className="card">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Регистрация</h3>

                                <div className="input-group mb-3">
                                    <input name="username" type="text" className="form-control"
                                           placeholder="Имя пользователя" style={{
                                        boxShadow: errors.username ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                                        border: errors.username ? "rgba(255, 0, 0, 1)" : ""

                                    }}
                                           ref={register({required: true, maxLength: 50})}/>

                                </div>

                                <div className="input-group mb-3">
                                    <input name="email" type="email" className="form-control" placeholder="Эл. почта"
                                           style={{
                                               boxShadow: errors.email ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                                               border: errors.email ? "rgba(255, 0, 0, 1)" : ""
                                           }}
                                           ref={register({
                                               required: true,
                                               maxLength: 100,
                                               pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
                                           })}/>
                                </div>

                                <div className="input-group mb-4">
                                    <input name="password" type="password" className="form-control"
                                           placeholder="Пароль"
                                           style={{
                                               boxShadow: errors.password ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                                               border: errors.password ? "rgba(255, 0, 0, 1)" : ""
                                           }}
                                           ref={register({
                                               required: "Это обязательное поле",
                                               maxLength: 100,
                                               minLength: {
                                                   value: 8,
                                                   message: "Минимальная длина пароля - 8 символов"
                                               }
                                           })} onChange={validateRepeat}
                                    />
                                </div>
                                <div className="text-left mb-4 error-block">
                                    <ErrorMessage errors={errors} name="password">
                                        {({messages}) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                "<span>{message}</span>"
                                            ))
                                        }
                                    </ErrorMessage>
                                </div>
                                <div className="input-group mb-4">
                                    <input name="retry_password" type="password" className="form-control"
                                           placeholder="Повторите пароль"
                                           style={{
                                               boxShadow: errors.retry_password ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                                               border: errors.retry_password ? "rgba(255, 0, 0, 1)" : ""
                                           }}
                                           ref={register({
                                               validate: repeatVal,
                                               required: true,
                                           })}/>

                                </div>
                                <div className="text-left mb-4 error-block">
                                    <ErrorMessage errors={errors} name="retry_password">
                                        {({messages}) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                "<span>{message}</span>"
                                            ))
                                        }
                                    </ErrorMessage>
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
                                       className="btn btn-primary shadow-2 mb-4"
                                       value="Зарегистрироваться"/>
                                <p className="mb-0 text-muted">Уже есть аккаунт? <NavLink
                                    to="/auth/signin-1">Войти</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );
}



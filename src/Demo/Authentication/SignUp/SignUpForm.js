import React, {useContext} from 'react';
import {Formik, Form, useField, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import DEMO from "../../../store/constant";
import './../../../assets/scss/style.scss';

import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../Backend/Auth";
import {useSelector} from "react-redux";


const AchTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <div className="input-group mb-3">
                <input className="text-input" {...field} {...props}
                       style={{
                           boxShadow: meta.error && meta.touched ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                           border: meta.error && meta.touched ? "rgba(255, 0, 0, 1)" : ""
                       }}/>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-left mb-4 error-block">
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};

const UsernameInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <div className="input-group mb-3">
                <input className="text-input" {...field} {...props}
                       style={{
                           boxShadow: meta.error && meta.touched ? "0 0 5px rgba(255, 0, 0, 1)" : "",
                           border: meta.error && meta.touched ? "rgba(255, 0, 0, 1)" : ""
                       }}/>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-left mb-4 error-block">
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};


const SignUpForm = () => {
    const auth = useContext(AuthContext);
    const usernameTaken = useSelector(state => state.usernameTaken);
    const emailTaken = useSelector(state => state.emailTaken);
    const registerError = useSelector(state => state.registerError);

    Yup.addMethod(Yup.string, 'checkUsername', function () {
        return this.test({
            name: 'username',
            message: 'Такой пользователь уже зарегистрирован',
            test: async (value) => {
                auth.isUsernameRegistered(value)
                return !usernameTaken
            },
        });
    });

    Yup.addMethod(Yup.string, 'checkEmail', function () {
        return this.test({
            name: 'email',
            message: 'Такая почта уже зарегистрирована',
            test: async (value) => {
                auth.isEmailRegistered(value)
                return !emailTaken
            },
        });
    });

    // to keep them separate so you can reuse schemas (e.g. address) across your application.
    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .email('Неверный формат адреса')
            .required('Обязательное поле')
            .checkEmail(),
        username: Yup.string()
            .min(3, 'Имя пользователя должно содержать больше чем 2 символа')
            .max(20, 'Имя пользователя должно содержать больше чем 20 символов')
            .required('Обязательное поле')
            .checkUsername(),
        password: Yup.string()
            .min(8, 'Пароль должен быть больше 8 символов')
            .max(40, 'Пароль должен быть короче 40 символов')
            .required('Обязательное поле'),
        repeatPassword: Yup.string()
            .min(8, 'Пароль должен быть больше 8 символов')
            .max(40, 'Пароль должен быть короче 40 символов')
            .required('Обязательное поле')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
        acceptTerms: Yup.boolean()
            .required('Согласитесь с политикой сервиса')
            .oneOf([true], 'Согласитесь с политикой сервиса')
    });

    return (
        <div className="card">
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    repeatPassword: '',
                    acceptTerms: false,
                }}
                validationSchema={SignUpSchema}
                onSubmit={values => {
                    console.log(values)
                    setTimeout(() => {
                        auth.register(values.username, values.email, values.password)
                    }, 500);
                }}
            >{({errors, touched, isSubmitting, validateField}) => (
                <Form>
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-user-plus auth-icon"/>
                        </div>
                        <h3 className="mb-4">Регистрация</h3>

                        {/* *** Username *** */}
                        <AchTextInput className="form-control" name="username" placeholder="Имя пользователя"
                                      type="text"/>


                        {/* *** Email *** */}
                        <AchTextInput className="form-control" name="email" placeholder="Эл. почта" type="email"/>


                        {/* *** Password *** */}
                        <AchTextInput className="form-control" name="password" placeholder="Пароль"
                                      type="password"/>

                        {/* *** RepeatPassword *** */}
                        <AchTextInput className="form-control" name="repeatPassword" placeholder="Повтор пароля"
                                      type="password"/>

                        {/* *** AcceptTerms *** */}
                        <div className="form-group text-left">
                            <div className="checkbox checkbox-fill d-inline">
                                <Field type="checkbox" name="acceptTerms" id="acceptTerms"/>
                                <label htmlFor="acceptTerms" className="cr">Согласен с<a
                                    href={DEMO.BLANK_LINK}> политикой сервиса</a>.</label>
                            </div>
                        </div>
                        <div className="text-left mb-4 error-block">
                            <ErrorMessage name="acceptTerms"/>
                        </div>

                        {registerError !== '' ? (
                            <div className="text-center mb-4 error-block">
                                {registerError}
                            </div>
                        ) : null
                        }

                        <input type="submit"
                               className="btn btn-primary shadow-2 mb-4"
                               value="Зарегистрироваться" disabled={isSubmitting}/>
                        <p className="mb-0 text-muted">Уже есть аккаунт? <NavLink
                            to="/auth/signin-1">Войти</NavLink></p>
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    )
};

export default SignUpForm;

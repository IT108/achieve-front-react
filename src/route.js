import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const SignUpForm = React.lazy(() => import('./Demo/Authentication/SignUp/SignUpForm'))

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/auth/signup-2', exact: true, name: 'SignUP form', component: SignUpForm}
];

export default route;

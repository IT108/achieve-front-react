export const ISREGISTERED = 'isreg'

export const IsRegisteredMethod = (data) => {
    return {
        type: ISREGISTERED,
        payload: data
    }
}

export const IS_USER_REGISTERED = 'isreg_u'

export const IsUserRegisteredMethod = (data) => {
    return {
        type: IS_USER_REGISTERED,
        payload: data
    }
}

export const IS_EMAIL_REGISTERED = 'isreg_e'

export const IsEmailRegisteredMethod = (data) => {
    return {
        type: IS_EMAIL_REGISTERED,
        payload: data
    }
}

export const REGISTER = 'register'

export function RegisterMethod(data) {
    return {
        type: REGISTER,
        payload: data
    }
}
export const AUTHENTICATE = 'authenticate'

export function AuthenticateMethod(data) {
    return {
        type: AUTHENTICATE,
        payload: data
    }
}

export const AUTHORIZE = 'authorize'

export function AuthorizeMethod(data) {
    return {
        type: AUTHORIZE,
        payload: data
    }
}

export const AUTH_REFRESH_KEY = 'auth_refresh'

export function AuthRefreshMethod(data) {
    return {
        type: AUTH_REFRESH_KEY,
        payload: data
    }
}

import {
    AUTHENTICATE,
    AuthenticateMethod, AUTHORIZE, AuthorizeMethod,
    ISREGISTERED,
    IsRegisteredMethod,
    REGISTER,
    RegisterMethod
} from "./Models/methods";

const initialState = {
    usernameTaken: false
}

export default function chatReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case ISREGISTERED:
            state.usernameTaken = action.payload.IsUsernameRegistered
            break
        case REGISTER:
            dispatch(RegisterMethod(data))
            break
        case AUTHENTICATE:
            dispatch(AuthenticateMethod(data))
            break
        case AUTHORIZE:
            dispatch(AuthorizeMethod(data))
            break
        default:
            break
    }

    return state
}

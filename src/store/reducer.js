import * as actionTypes from './actions';
import config from './../config';
import {
    AUTHENTICATE,
    AUTHORIZE, IS_EMAIL_REGISTERED, IS_USER_REGISTERED,
    ISREGISTERED,
    REGISTER,
} from "../Backend/Models/methods";

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    usernameTaken: false,
    emailTaken: false,
    registerError: ''
};

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];
    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        case ISREGISTERED:
            return {
                ...state,
                usernameTaken: action.payload.is_username_registered,
                emailTaken: action.payload.is_email_registered
            };
        case IS_EMAIL_REGISTERED:
            return {
                ...state,
                emailTaken: action.payload.is_email_registered
            };
        case IS_USER_REGISTERED:
            return {
                ...state,
                usernameTaken: action.payload.is_username_registered
            };
        case REGISTER:
            console.log(action.payload)
            return {
                ...state,
                registerError: action.payload.error
            }
        case AUTHENTICATE:
            return state;
        case AUTHORIZE:
            return state;
        default:
            return state;
    }
};

export default reducer;

import React, {createContext, useContext} from "react";
import IsRegisteredRequest from "./Models/Auth/IsRegisteredRequest";
import {WebSocketContext} from "./WSConn";
import IsUserRegisteredRequest from "./Models/Auth/IsUserRegisteredRequest";
import IsEmailRegisteredRequest from "./Models/Auth/IsEmailRegisteredRequest";
import RegisterRequest from "./Models/Auth/RegisterRequest";

const AuthContext = createContext(null)
export {AuthContext}

export default ({children}) => {

    const ws = useContext(WebSocketContext)
    console.log('registered auth functions')

    const isRegistered = (email, username) => {
        let req = new IsRegisteredRequest()
        req.data.email = email
        req.data.username = username
        ws.sendMessage(req)
    }

    const isUsernameRegistered = (username) => {
        let req = new IsUserRegisteredRequest()
        req.data.username = username
        ws.sendMessage(req)
    }

    const isEmailRegistered = (email) => {
        let req = new IsEmailRegisteredRequest()
        req.data.email = email
        ws.sendMessage(req)
    }
    const register = (username, email, password) => {
        let req = new RegisterRequest()
        req.data.username = username
        req.data.email = email
        req.data.password = password
        ws.sendMessage(req)
    }


    const auth = {
        ws: ws,
        isRegistered,
        isEmailRegistered,
        isUsernameRegistered,
        register
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

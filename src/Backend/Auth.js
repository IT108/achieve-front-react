import React, {createContext, useContext} from "react";
import IsRegisteredRequest from "./Models/Auth/IsRegisteredRequest";
import {WebSocketContext} from "./WSConn";

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
        isRegistered("", username)
    }

    const isEmailRegistered = (email) => {
        isRegistered(email, "")
    }

    const auth = {
        ws: ws,
        isRegistered,
        isEmailRegistered,
        isUsernameRegistered,
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

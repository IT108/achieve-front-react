import React, {createContext, useContext} from "react";
import AuthContextProvider, {AuthContext} from "./Auth";
import WebSocketContextProvider from "./WSConn";


export default function BackendComponent({children}) {

    return (
        <WebSocketContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </WebSocketContextProvider>
    );
}

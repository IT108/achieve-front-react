import React from "react";
import AuthContextProvider from "./Auth";
import WebSocketContextProvider from "./WSConn";
import WSComponent from "./WSConn";


export default function BackendComponent({children}) {



    return (
        <WebSocketContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </WebSocketContextProvider>
    );
}

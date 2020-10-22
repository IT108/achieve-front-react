import React, {createContext, useCallback} from "react";
import {useDispatch, useStore} from "react-redux";
import {
    AUTHENTICATE,
    AuthenticateMethod, AUTHORIZE, AuthorizeMethod, IS_EMAIL_REGISTERED, IS_USER_REGISTERED, IsEmailRegisteredMethod,
    ISREGISTERED,
    IsRegisteredMethod, IsUserRegisteredMethod,
    REGISTER,
    RegisterMethod
} from "./Models/methods";

const WebSocketContext = createContext({})
export {WebSocketContext}

export default function WSComponent({children}) {

    let ws
    let socket
    const dispatch = useDispatch()
    let store = useStore()


    let timeout = 250; // Initial timeout duration as a class variable

    const sendMessage = (data) => {
        console.log(data)
        try {
            let req = JSON.stringify(data)
            console.log(req)
            ws.send(req) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    }

    function processResponse(data) {
        console.log(data)
        switch (data.Method) {
            case IS_USER_REGISTERED:
                dispatch(IsUserRegisteredMethod(data))
                break
            case IS_EMAIL_REGISTERED:
                dispatch(IsEmailRegisteredMethod(data))
                break
            case ISREGISTERED:
                dispatch(IsRegisteredMethod(data))
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
    }


    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    const connect = () => {
        ws = new WebSocket("ws://localhost:8080/ws");
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            timeout = 250; // reset timer to 250 on open of websocket connection
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };


        ws.onmessage = (message) => {
            let data = message.data.split('}\n{')
            for (let i = 1; i < data.length; i++) {
                if (i === 1) {
                    data[0] += '}'
                }
                if (i === data.length - 1) {
                    data[i] = '{' + data[i]
                } else {
                    data[i] = '{' + data[i] + '}'
                }
            }
            data.forEach(e => processResponse(JSON.parse(e)))

        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (timeout + timeout) / 1000
                )} second.`,
                e.reason
            );

            timeout = timeout + timeout; //increment retry interval
            connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    if (!ws) {
        connect()
        socket = {
            ws: ws,
            sendMessage,
            check,
            dispatch,
            processResponse
        }
    }


    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    const check = () => {
        if (!ws || ws.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
}

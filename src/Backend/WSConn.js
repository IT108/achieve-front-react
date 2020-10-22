import React, {createContext} from "react";
import json from "querystring";

const WebSocketContext = createContext({})
export {WebSocketContext}

export default ({children}) => {

    let ws
    let socket

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
            console.log(message.data);
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
            check
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

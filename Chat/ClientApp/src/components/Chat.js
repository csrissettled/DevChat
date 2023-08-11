﻿import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Chat() {

    const [connection, setConnection] = useState(null);
    const [conStatus, setConStatus] = useState("");
    const [user, setUser] = useState(null);
    const [messageOut, setMessageOut] = useState(null);
    const [msgArrIn, setMsgArrIn] = useState([]);

 
    const hubChatEndPoint = '/hubs/chat' 

    useEffect(() => {
        const con = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_WebApiBaseURL??""}${hubChatEndPoint}`)
            .withAutomaticReconnect()
            .build();

        setConnection(con);
        setConStatus("Inital signalR connection...");

    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(_ => {
                    console.log("signalR hub connected")
                    setConStatus('Connected!');
                    connection.on('ReceiveMessage', (user, message) => {
                        console.log(user, message, "------------->ReceiveMessage");
                        setMsgArrIn(prev => [...prev, { user, message }]);
                    });
                })
                .catch(e => {
                    setConStatus(`Connection failed`)
                    console.log("signalR error---------->", e)
                });
        }
    }, [connection]);

    const setUpUser = (e) => {
        setUser(e.target.value);
        localStorage.setItem("user", JSON.stringify(e.target.value));
    }

    const sendMessage = _ => {
        console.log(user, messageOut, "user - messageout")
        if (messageOut === null || user === null) return;
        connection.invoke("SendMessage", user, messageOut).then(res => {
            console.log(res, "signalR SendMessage response");
            setMessageOut(null);
        }).catch(function (err) {
            console.error(err.toString(), "signalR error");
        });
    }

    const sendMessageOnEnter = (e) => {
        if (e.charCode === 13) {
            sendMessage();
        }
    }

    return (
        <>
            <h1>{conStatus}</h1>
            <input onChange={e => setUpUser(e)} placeholder="enter user name" value={user === null ? "" : user}></input>
            <div className='message-container'>
                {msgArrIn.map((msg, index) =>
                    <pre key={index}>
                        {msg.user === user ?
                            <div>
                                <div className="rightMsg">
                                    <div className="messageUserLine">{msg.user} (YOU)</div>
                                </div>
                                <div className="rightMsg">
                                    <div>{msg.message}</div>
                                </div>
                            </div>
                            :
                            <div style={{ textAlign: 'left' }}>
                                <div className="messageUserLine2">{msg.user}</div>
                                <div>{msg.message}</div>
                            </div>
                        }

                    </pre>
                )
                }
            </div>
            <p><input type="input" placeholder="enter message" className='message' onChange={e => setMessageOut(e.target.value)} value={messageOut === null ? "" : messageOut} onKeyPress={sendMessageOnEnter}></input></p>
            <p><button disabled={user === null || conStatus === ""} onClick={sendMessage} className='SendBtn'>Send</button></p>
        </>
    );
}

export default Chat;
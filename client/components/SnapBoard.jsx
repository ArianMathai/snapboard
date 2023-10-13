import React, {useContext, useEffect, useState} from 'react';
import MessageInput from "./MessageInput";
import {json, Link} from "react-router-dom";
import AuthContext, {useAuth} from "../context/AuthContext";

const SnapBoard = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const {auth} = useAuth();

    async function fetchMessages(){
        try {
            const response = await fetch("/api/snapboard/getAllMessages");

            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
                console.log(messages);
            }
        } catch (error){
            throw error;
        }
    }

    useEffect(() => {
        fetchMessages().then(loading=>true);
    }, []);

    return (
        <>
        {auth ?
        <div className="message-board">
            <h2>SnapBoard 👻</h2>
            <ul className="message-list">
                {!loading ? messages.map((m, index) => (
                    <li key={index} className="message-item">
                        <div className={"message-list-message"}>
                            {m.user} : {m.message}
                        </div>
                    </li>
                )):<div>loading ...</div>}
            </ul>
            <MessageInput fetchMessages={fetchMessages} />
        </div>: <div><Link to={"/login"}><button>Login</button></Link> to see SnapBoard 👻</div>}
        </>


    );
};

export default SnapBoard;
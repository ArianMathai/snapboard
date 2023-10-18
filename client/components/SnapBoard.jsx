import React, {useContext, useEffect, useRef, useState} from 'react';
import MessageInput from "./MessageInput";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const SnapBoard = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const{isAuthorized, setIsAuthorized, isCookiePresent} = useAuth();

    const messageRef = useRef(null);


    async function fetchMessages(){
        try {
            const response = await fetch("/api/snapboard/getAllMessages");

            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
            }
        } catch (error){
            throw error;
        }
    }

    async function deletePost(postId){
        try {

            const response = await fetch(`/api/snapboard/delete/${postId}`,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                }
            })

        } catch (error){
            throw error;
        }

        await fetchMessages();
    }

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages]);


    useEffect(() => {
        setIsAuthorized(isCookiePresent('authorization'));
    }, []);

    useEffect(() => {
        console.log(messages)
    }, [messages]);


    useEffect(() => {
        isAuthorized?fetchMessages().then(loading=>true) : false;
    }, [isAuthorized]);

    return (
        <>
        {isAuthorized?
        <div className="message-board">
            <h2>SnapBoard 👻</h2>

            <ul className="message-list" ref={messageRef}>
                {!loading ? messages.map((m, index) => (
                    <li key={index} className="message-item">
                        <div className={"message-list-message"}>
                            {m.user} : {m.message}
                        </div>
                        {m.canDelete?<button onClick={()=>deletePost(m._id)}>Delete</button>:null}
                    </li>
                )):<div>loading ...</div>}
            </ul>
            <MessageInput fetchMessages={fetchMessages} />
        </div> : <div><Link to={"/login"}><button>Login</button></Link> to see SnapBoard 👻</div>}
        </>
    );
};

export default SnapBoard;
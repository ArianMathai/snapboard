import {useState} from "react";

function MessageInput({fetchMessages}){

    const [message,setMessage] = useState("");
    const [time, setTime] = useState("1");

    async function handleSubmitMessage(e){
        e.preventDefault()
        console.log(message);
        console.log(time);

        try {
            const response = await fetch("/api/snapboard/postmessage", {
                method: "POST",
                body: JSON.stringify({message, time}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMessage("");
            await fetchMessages();

        } catch (error){
            throw error;
        }
    }


    return (
        <div id="massage-input-container">
            <label>Enter Text:</label>
            <textarea
                id="text"
                name="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                cols={50}
            ></textarea>
            <label style={{padding: "0.5em"}}>
                Disappearing message:
            <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="1">One Minute</option>
                <option value="5">Five Minutes</option>
                <option value="10">Ten Minutes</option>
                <option value="forever">Forever Baby</option>
            </select>
            </label>
            <button style={{
                width: '20%',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
            }} onClick={(e) => handleSubmitMessage(e)}>Post SnapMessage</button>
        </div>
    )
}
export default MessageInput;
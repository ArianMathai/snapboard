import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function LoginCallback(){

    const [username, setUsername] = useState("");
    const [hasUser, setHasUser] = useState(true);
    const navigate = useNavigate();

    const {setIsAuthorized} = useAuth();



    async function handleHasUser(){

        const hashObject = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1)),
        );

        const {access_token} = hashObject;
        console.log(access_token);

        const response = await fetch(`/api/authentication/login/get-user/${access_token}`, {
            headers: {
                "content-type": "application/json"
            }
        })

        if(!response.ok){
            setHasUser(false);
        }else {
            setHasUser(true);
            navigate("/snapboard");
        }
    }

    async function handleCallback(e){
        e.preventDefault()

        const hashObject = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1)),
        );

        const {access_token} = hashObject;

        const res = await fetch("/api/authentication/login/access_token", {
            method: "POST",
            body: JSON.stringify({access_token,username}),
            headers: {
                "content-type": "application/json"
            }
        })

        if (!res.ok){
            throw new Error("Something went wrong " + res.statusText)
        }

        setIsAuthorized(true);

        navigate("/snapboard")
    }

    useEffect(() => {
        handleHasUser();
    }, []);



    return(
        <>
            {!hasUser ? (
                <div>
                    <input
                        type="text"
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleCallback}>Register Username</button>
                </div>
            ) : <h2>...loading</h2>}
        </>
    )
}
export default LoginCallback;
import React, { useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState();
    const [hover, setHover] = useState(false);

    const navigate = useNavigate()

    const isValidCredentials = useMemo(() => {
        return username.length === 0 && password.length === 0;
    }, [ username, password])

        const onHover = () => {
            setHover(true);
        };

        const onLeave = () => {
            setHover(false);
        };

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/authentication/login", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            setUsername("");
            setPassword("");
            navigate("/snapboard");
        }

        const data = await res.json();

        setErrorMessage(data.message)
        setUsername("");
        setPassword("");
    }


    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <label>
                    Username:
                    <div>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="username"

                        />
                    </div>
                </label>
                <label>
                    Password:
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password"
                        />
                    </div>
                </label>
                <div>
                    <button type="submit"
                            disabled={isValidCredentials}
                    >
                        Sign in
                    </button>
                    <Link to="/signup"
                    onMouseOver={onHover}
                    onMouseLeave={onLeave}>
                        <button>Sign up</button>
                    </Link>
                    {hover?<p>Chose username and password, or sign up with google - still just username and password. <password className=""></password></p> : null}
                    {errorMessage?<div>{errorMessage}</div>:null}
                </div>
            </form>
            <LoginWithGoogle />
        </div>
    );
}

export default Login;

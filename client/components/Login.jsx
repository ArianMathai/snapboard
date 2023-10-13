import React, {useContext, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext, {useAuth} from "../context/AuthContext";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setAuth} = useAuth();

    const navigate = useNavigate()

    const isValidCredentials = useMemo(() => {
        return username.length === 0 && password.length === 0;
    }, [ username, password])



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
            setAuth(true);
            navigate("/snapboard");
        }
        setUsername("");
        setPassword("");
    }


    return (
        <div>
            <form>
                <label>
                    Username:
                    <div>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" />
                    </div>
                </label>
                <label>
                    Password:
                    <div>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                    </div>
                </label>
                <div>
                    <button type="button" onClick={(e) => (handleLogin(e))} disabled={isValidCredentials}>
                        Sign in
                    </button>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

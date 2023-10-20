import {useContext, useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";





const DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
function LoginWithGoogle (){


    const [authorizationUrl, setAuthorizationUrl] = useState("");
    const {client_id} = useAuth();

    async function loadAuthorizationUrl(){
        const res = await fetch(DISCOVERY_URL);

        const discoveryDoc = await res.json();
        setAuthorizationUrl(discoveryDoc.authorization_endpoint + "?" + new URLSearchParams({
            response_type: "token",
            client_id,
            redirect_uri: window.location.origin + "/login/callback",
            scope: "email"
        }));
    }
    useEffect(() => {
        loadAuthorizationUrl();
    }, []);


    return(

        <a className="google-button" href={authorizationUrl}>Login with google</a>

    )
}

export default LoginWithGoogle;


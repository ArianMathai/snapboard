import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(undefined, undefined);


export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const client_id = "630435203967-bkfglrv5uao1krpc41adpjdshn1ikutd.apps.googleusercontent.com"

    function isCookiePresent(cookieName){
        const cookie = document.cookie;
        return cookie.includes(`${cookieName}=`)
    }

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, isCookiePresent, client_id }}>
            {children}
        </AuthContext.Provider>
    );
};
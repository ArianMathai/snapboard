import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(undefined, undefined);

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    function isCookiePresent(cookieName){
        const cookie = document.cookie;
        return cookie.includes(`${cookieName}=`)
    }

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, isCookiePresent }}>
            {children}
        </AuthContext.Provider>
    );
};
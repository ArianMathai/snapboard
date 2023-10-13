import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext(undefined, undefined);

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
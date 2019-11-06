import React, { useState, useEffect, useContext } from 'react';
import { useFirebaseAuth } from '../firebase/useFirebaseAuth';

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    const auth = useFirebaseAuth();

    return(
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}




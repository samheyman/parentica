import React, { createContext, useState, useEffect } from 'react';
import firebase from '../config/firebase';

export const AuthContext = createContext();


const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;


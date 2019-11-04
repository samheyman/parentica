import React, { createContext, useState, useEffect } from 'react';
import firebase from '../config/firebase';

export const AuthContext = createContext();


const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        setFetchingUser(true);
        firebase.auth()
        .onAuthStateChanged((user) => {
            setCurrentUser(user);
            setFetchingUser(false)
        })
    }, []);

    // const isAdmin = () => currentUser.email.indexOf('parentica')!==-1;

    return(
        <AuthContext.Provider value={{currentUser, fetchingUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;


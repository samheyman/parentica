import { useState, useEffect } from 'react';
import firebase from './index';

export const useFirebaseAuth = () => {
    const [state, setState] = useState({
        isLoading: false,
        isAdmin: false,
        user: null
    });

    // const [user, setUser] = useState(null);

    useEffect(() => {
        setState({...state, isLoading: true});
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    setState({...state, user: user, isLoading: false});
                } else {
                    setState({...state, user: false, isLoading: false});
                }
            });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const signUp = (email, password, provider, companyName=null) => {
        console.log("Signing user up");
        setState({...state, isLoading:true});
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password) 
            .then(response => {
                let user = {};
                (provider) ?
                    user = {
                        name: companyName,
                        email: email,
                        url: null,
                        logo: null,
                        listings: [],
                        companyId: null,
                        address: null,
                        city: null,
                        country: null,
                        createdOn: new Date()
                    }
                    :
                    user = {
                        name: '',
                        email: email,
                        avatar: null,
                        city: null,
                        country: null,
                        createdOn: new Date()
                    } 
                firebase.firestore().collection('users').doc(response.user.uid).set(user)
            })
            .then((response) => {
                setState({...state, user:response.user, isLoading: false});
                console.log("User successfully signed in");
                return response.user;
            })
            .catch ((error) => {
                setState({...state, user:false, isLoading: false});
                console.log("Error signing up: " + error);
            })
    }

    const signIn = (email, password) => {
        console.log("Signing user in");
        setState({...state, isLoading:true});
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setState({...state, user:response.user, isLoading: false});
                console.log("user signed in");
                console.log(response.user);
                return response.user;
            })
            .catch ((error) => {
                setState({...state, user:false, isLoading: false});
                console.log("Error signing up: " + error);
            })     
    };

    const signOut = () => {
        console.log("Signing user out");
        setState({...state, isLoading:true});
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setState({...state, user:false, isLoading: false});
                console.log("User signed out.");
            })
    }

    const sendPasswordResetEmail = email => {
        setState({...state, isLoading:true});
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                setState({...state, isLoading:false});
                return true;
            })
            .catch(e => {
                console.log("Error sending email: " + e);
                setState({...state, isLoading:false});
                return false;
            })
    }
    
    return {
        signUp,
        signIn,
        signOut,
        user:state.user,
        sendPasswordResetEmail,
        isLoading: state.isLoading,
        // isAdmin: state.currentUser 
        //     && state.currentUser.email !== null
        //     // && !state.currentUser.email.indexOf('parentica')!==-1
        //     ,
    }
};
import React, { createContext, useState, useEffect } from 'react';
import firebase from '../config/firebase';

export const ListingsContext = createContext();

function useListings() {
    const [times, setTimes] = useState([]);
   
    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('listings').where("active", "==", true).onSnapshot((snapshot) => {
            const newListings = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTimes(newListings);
        });
        return () => unsubscribe();

    }, [])

    return times;
}


const ListingsContextProvider = (props) => {
    const listings = useListings();
    

    // let listings = data;
    // console.log(listings);
    // const [listings, dispatch] = useReducer(listingsReducer, LISTINGS);
    
    // fbConfig.firestore().collection('listings').get().then(
    //     [listings, dispatch] = useReducer(listingsReducer, LISTINGS)
    // );
    
    return(
        <ListingsContext.Provider value={{listings}}>
            { props.children }
        </ListingsContext.Provider>
    );
}

export default ListingsContextProvider;

import React, { createContext, useReducer } from 'react';
// import { LISTINGS } from '../shared/listingsJSON';
import { listingsReducer } from '../reducers/lisingsReducer';
// import fbConfig from './FirebaseContext';

export const ListingsContext = createContext();



const ListingsContextProvider = (props) => {
    let LISTINGS = [];
    const [listings, dispatch] = useReducer(listingsReducer, LISTINGS);
    
    // fbConfig.firestore().collection('listings').get().then(
    //     [listings, dispatch] = useReducer(listingsReducer, LISTINGS)
    // );
    
    return(
        <ListingsContext.Provider value={{listings, dispatch}}>
            { props.children }
        </ListingsContext.Provider>
    );
}

export default ListingsContextProvider;

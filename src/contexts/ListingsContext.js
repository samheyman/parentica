import React, { createContext, useReducer } from 'react';
import { LISTINGS } from '../shared/listingsJSON';
import { listingsReducer } from '../reducers/lisingsReducer';
import uuid from 'uuid/v1';

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
    const [listings, dispatch] = useReducer(listingsReducer, LISTINGS);
    
    return(
        <ListingsContext.Provider value={{listings, dispatch}}>
            { props.children }
        </ListingsContext.Provider>
    );
}

export default ListingsContextProvider;

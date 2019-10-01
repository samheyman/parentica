import React, { createContext, useState } from 'react';
import { LISTINGS } from '../shared/listingsJSON';

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
    const [listings, setListings] = useState(LISTINGS);

    return(
        <ListingsContext.Provider value={{listings}}>
            { props.children }
        </ListingsContext.Provider>
    );
}

export default ListingsContextProvider;

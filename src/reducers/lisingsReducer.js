import uuid from 'uuid/v1';

export const listingsReducer = (state, action) => {
    switch(action.listing.type) {
        case 'ADD_LISTING':
            return [...state, {
                className: action.listing.className, 
                tags: action.listing.tags, 
                city: action.listing.city, 
                district: action.listing.district, 
                address: action.listing.address, 
                date: action.listing.date, 
                duration: action.listing.duration, 
                url: action.listing.url, 
                image: action.listing.image, 
                companyName: action.listing.companyName, 
                companyLogo: action.listing.companyLogo, 
                price: action.listing.price, 
                priceCouples: action.listing.priceCouples, 
                language: action.listing.language, 
                description: action.listing.description,
                id: uuid() 
            }];
        case 'DELETE_LISTING':
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import ListingCard from '../components/ListingCard';

import CityCard from '../components/CityCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

function Online(props) {
    let listings = useListings();

    function useListings() {
        const [listings, setListings] = useState([]);
        useEffect(() => {
            const unsubscribe = firebase.firestore()
                .collection('listings')
                .where("active", "==", true)
                .where("online", "==", true)
                // .orderBy('date', 'asc')
                .onSnapshot((snapshot) => {
                const newListings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(newListings);
                // setLoading(false);
            });
            return () => unsubscribe();
        }, [])
    
        return listings;
    }

    console.log("Listings: " + listings);
    const { locale } = useContext(LocaleContext);

    return(
        <Container className="main-content"> 
            <h2>
                <FormattedMessage id={`homepage.tagline.online.button.${locale}`} defaultMessage="Online"/>    
            </h2>  
            <Grid container spacing={2} alignContent="center">
            {listings.map((listing) => {
                return(
                    <Grid item key={listing.id}>
                        <ListingCard
                            nameId={listing.nameId}
                            format={listing.format}
                            online={listing.online}
                            listingImage={listing.listingImage}
                            listingTitle={(listing.hasOwnProperty('listingTitle')) ? listing.listingTitle : listing.listingName}
                            companyLogo={listing.companyLogo}
                            companyName={listing.companyName}
                            date={listing.date}
                            duration={listing.duration}
                            district={listing.district}
                            address={listing.address}
                            city={listing.city}
                            language={listing.language}
                            tags={listing.tags}
                        />      
                    </Grid>
                );
            })}
            </Grid>
        </Container>
    );
}

export default Online; 
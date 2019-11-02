import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListingCard from '../components/ListingCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import { ListingsContext } from '../contexts/ListingsContext';
import { transform } from '@babel/core';
import Icon from '@material-ui/core/Icon';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
        >
        <Box p={3}>{children}</Box>
        </Typography>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


function Explore(props) {
    const [value, setValue] = useState(props.tab);
    const { listings } = useContext(ListingsContext);
    const { locale } = useContext(LocaleContext);
    // console.log(listings);
    // const [tab, setTab] = useState(props.tab);
    
    function handleChange(event, newValue) {
        // scroll down 1px to trigger lazy loading of cards
        window.scrollBy(0, 1);
        setValue(newValue);
    }

    const classesList = listings.map(
        (listing) => {
            console.log(props.city + " " + listing.city);
            if (( 
                !listing.online && listing.city.toLowerCase() === props.city && (
                listing.format === 'group' || 
                listing.format === 'class' ||
                listing.format === 'workshop'))
                ) {
                return(
                    <Grid item xs={12} sm={6} md={4} key={listing.id}>
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
            }
        }
    );

    const meetupsList = listings.map((listing) => {
        if( !listing.online && listing.city.toLowerCase() === props.city && listing.format === 'meetup') {
            return (
                <Grid item xs={12} sm={6} md={4} key={listing.id}>
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
        } else {
            return(
                null
            );
        }
    });

    const seminarsList = listings.map((listing) => {
        if(!listing.online && listing.city.toLowerCase() === props.city && (listing.format === 'seminar' || listing.format === 'webinar')) {
            return (
                <Grid item xs={12} sm={6} md={4} key={listing.id}>
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
        } else {
            return(
                null
            );
        }
    });
    // TODO better way to do this
    let classesCount = classesList.filter((item) => item !== '' && item != null).length;
    let seminarsCount = seminarsList.filter((item) => item !== '' && item != null).length;
    let meetupsCount = meetupsList.filter((item) => item !== '' && item != null).length;

    // console.log(props.classes.length + " classes: " + props.classes);
    console.log(classesCount + " classes");
    console.log(seminarsCount + " seminars");
    console.log(meetupsCount + " meetups");

    return(
        <Container className="main-content">
                <h2 style={{textTransform:'capitalize'}}>{
                    props.format === 'online' ?
                    <FormattedMessage 
                        id={`explore.tab.online.${locale}`}
                        defaultMessage="Online"
                    />
                    :
                    <FormattedMessage 
                        id={`explore.tab.${props.city}.${locale}`}
                        defaultMessage={props.city}
                    />
                    
                }</h2>
                <div className="result-filters">
                    {(props.topic && props.topic!=="all" && props.topic!==null)?
                        <React.Fragment>
                            <span className={`tag tag-${props.topic}`}>
                                <FormattedMessage 
                                    id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                                    defaultMessage={props.topic}
                                />
                            </span>
                            
                            <Link to={{pathname:`/${locale.split('-')[0]}/${props.format}/explore`}}>
                                <span className="tag">
                                    <FormattedMessage 
                                        id={`general.clear.${locale}`}
                                        defaultMessage="clear"
                                    />
                                </span>
                            </Link>
                            
                        </React.Fragment>
                        :
                        null
                    }
                    {(props.classLanguage==="spanish" || props.classLanguage==="english")?
                        <React.Fragment>
                            <span className={`tag tag-${props.topic}`}>
                                <FormattedMessage 
                                    id={`general.${props.classLanguage}.${locale}`}
                                    defaultMessage=""
                                />
                            </span>
                            
                            <Link to={{pathname:`/${locale.split('-')[0]}/madrid/explore`}}>
                                <span className="tag">
                                    <FormattedMessage 
                                        id={`general.clear.${locale}`}
                                        defaultMessage="clear"
                                    />
                                </span>
                            </Link>
                            
                        </React.Fragment>
                        :
                        null
                    }
                </div>
        <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example">
                <Tab
                    label={
                        <div className="listing-type-count">
                            <Icon>school</Icon>
                            &nbsp;
                            <strong>{classesCount}</strong>
                            &nbsp;
                            <FormattedMessage 
                                id={`explore.tab.classes.${locale}`}
                                defaultMessage="classes"
                            />
                        </div>
                    } 
                    {...a11yProps(0)} 
                />
                <Tab 
                    label={
                        <div className="listing-type-count">
                            <Icon>record_voice_over</Icon>
                            &nbsp;
                            <strong>{seminarsCount}</strong>
                            &nbsp;
                            <FormattedMessage 
                                id={`explore.tab.seminars.${locale}`}
                                defaultMessage="seminars"
                            />
                        </div>
                    } 
                    {...a11yProps(2)} 
                />
                {
                props.format!=='online' ?
                    <Tab 
                        label={
                            <div className="listing-type-count">
                                <Icon>people_alt</Icon>
                                &nbsp;
                                <strong>{meetupsCount}</strong>
                                &nbsp;
                                <FormattedMessage 
                                    id={`explore.tab.meetups.${locale}`}
                                    defaultMessage="meetups"
                                    values={{
                                        count: meetupsCount
                                    }}
                                />
                            </div>
                        } 
                        {...a11yProps(1)} 
                    />
                : null
                }
            </Tabs>
        </AppBar>
        <TabPanel className="search-results" value={value} index={0}>
            {(classesCount > 0 ) ?
            <Grid container spacing={2} alignContent="center">
                {classesList.filter((item) => item !== '')}
            </Grid>
            :
            <p>
                <FormattedMessage 
                    id={`explore.results.city.none.${locale}`}
                    defaultMessage=""
                    // values={{
                    //     topicLabel: <FormattedMessage 
                    //                     id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                    //                     defaultMessage={props.topic}
                    //                 />
                    // }}
                />
            </p>}
        </TabPanel>
        <TabPanel className="search-results" value={value} index={1}>
            {(seminarsCount > 0 ) ?
            <Grid container spacing={2} alignContent="center">
                {seminarsList.filter((item) => item !== '')}
            </Grid>
            :
            <p>
                <FormattedMessage 
                    id={`explore.results.seminars.none.${locale}`}
                    defaultMessage="Sorry no seminars found."
                    // values={{
                    //     topicLabel: 
                    //         <FormattedMessage 
                    //             id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                    //             defaultMessage={props.topic}
                    //         />
                    // }}
                />
            </p>}
        </TabPanel>
        <TabPanel className="search-results" value={value} index={2}>
            {(meetupsCount > 0 ) ?
            <Grid container spacing={2} alignContent="center">
                {meetupsList.filter((item) => item !== '')}
            </Grid>
            :
            <p>
                <FormattedMessage 
                    id={`explore.results.meetups.none.${locale}`}
                    defaultMessage="Sorry no meetups found."
                    // values={{
                    //     topicLabel: 
                    //         <FormattedMessage 
                    //             id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                    //             defaultMessage={props.topic}
                    //         />
                    // }}
                />
            </p>}
        </TabPanel>
        </Container>)
}

export default Explore;
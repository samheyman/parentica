import React, {useState, useEffect, useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import * as moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/es';
import Loader from '../components/Widgets/Loader';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import { LocaleContext } from '../contexts/LocaleContext';
import { Button } from '@material-ui/core';


function RenderTags({tags, locale, online}) {
    let i=0;
    let rootUrl = (online==="online") ? 'online' : 'madrid';
    const output = tags.map((tag) => {
        return (
            <Link key={i++} to={{pathname:`/${locale.split('-')[0]}/${rootUrl}/explore`, topic:`${tag}`}}
                onClick={()=>{
                    window.gtag("event", "topic tag from class details", {
                        event_category: "topics",
                        event_label: tag
                    }); 
                }}
            >
                <span className={`tag tag-${tag}`}>
                    <FormattedMessage 
                        id={`topics.${tag.split(" ")[0]}.${locale}`}
                        defaultMessage={tag}
                    />
                </span>
            </Link>
        );
    });
    return output;
}

function RenderDescription({description}) {
    let i=0;
    const formatedDescription = description.map((paragraph) => {
        return (
            <p key={i++}>{paragraph}</p>
        );
    });
    return formatedDescription;
}

function ClassDate({classDate, locale}, {icon}) {
    moment.locale(locale);
    if (classDate != null) {
        return(
            <div className="value date-time-section">
                <Icon className={icon}>
                calendar_today
                </Icon>
                <span className="date-time">
                    {moment(new Date(classDate.seconds * 1000)).format("dddd, MMMM D, YYYY ")}
                <br/>
                    {moment(new Date(classDate.seconds * 1000)).format("LT")}
                </span>
            </div>
        );
    } else {
        return null;
    }
}

function ClassPrice({classPrice, classPriceCouple, locale}) {
    let price = null;
    let couplePrice = null;

    if (classPrice != null && classPrice > 0) {
        price =  <span className="class-price">
                    <FormattedMessage 
                        id={`classDetails.price.${locale}`}
                        defaultMessage="Price"
                    />:
                    &nbsp;{classPrice}€
                </span>;
    } else {
        price =  <span className="class-price">
                    <FormattedMessage 
                        id={`classDetails.price.${locale}`}
                        defaultMessage="Price"
                    />:
                    &nbsp;
                    <FormattedMessage 
                        id={`classDetails.price.free.${locale}`}
                        defaultMessage="free"
                    />
                </span>;
    }
    if (classPriceCouple >= 0) {
        couplePrice = <span className="price-couples"> 
                ({classPriceCouple}€&nbsp;
                    <FormattedMessage 
                        id={`classDetails.price.forCouples.${locale}`}
                        defaultMessage="for couples"
                    />
                )
            </span>;
    } 
   
    return(
        <div>
            {price} <br/> {couplePrice}
        </div>
    );
}

function ClassLocation({address, icon}) {
    if (address != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                location_on
                </Icon>
                <span>{address}</span>
            </div>
        );
    } else {
        return null;
    }
}

function ClassLanguage({language, locale}, {icon}) {
    if ((language==='english' && locale==='es-ES') || (language==='spanish' && locale==='en-GB')) {
        return(
            <div className="value">
                <Icon className={icon}>
                language
                </Icon>
                <span className="language">
                    <FormattedMessage 
                        id={`general.${language}.${locale}`}
                        defaultMessage=""
                    />
                </span>
                <img className="language-flag" src={`../../images/flags/${language}.png`} alt={`${language}`} />
            </div>
        );
    } else {
        return null;
    }
}

function ClassDuration({duration, sessions, locale}, {icon}) {
    if (duration != null) {
        return(
            <div className="value">
                <Icon className={icon}>
                timelapse
                </Icon>
                <span>{duration/60}h
                    { (sessions != null && sessions > 1) ? 
                        <span>&nbsp;({sessions}&nbsp; 
                            <FormattedMessage 
                                id={`classDetails.sessions.${locale}`}
                                defaultMessage="sessions"
                            />
                        )</span>
                        :
                        null
                    }
                </span>
            </div>
        );
    } else {
        return null;
    }
}

export default function ListingDetails(props) {
    let listingDetails = useListingDetails();
    const locale = 'en-GB';

    const storage = firebase.storage();
    const [imageLink, setImageLink] = useState('');
    const [logo, setLogo] = useState('');

    function useListingDetails() {
        const [listingDetails, setListingDetails] = useState([]);
        console.log("UseEffect running: " + props.match.params.listingId);

        useEffect(() => {
            const unsubscribe = firebase.firestore()
                .collection('listings')
                .where("active", "==", true)
                .where("nameId", "==", props.match.params.listingId)
                .onSnapshot((snapshot) => {
                const listing = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListingDetails(listing);
                // setLoading(false);
            });
            return () => unsubscribe();
        }, [])
        return listingDetails;
    }

    if (listingDetails.length === 1) {
        
        const imageUrl = getImage();
        const companyLogo = getLogo(listingDetails[0].companyLogo);
        
        function getImage() { 
            const blocks = listingDetails[0].listingImage.split('.');
            let listingImage = '';
            if (blocks.length === 1) {
                listingImage = listingDetails[0].listingImage + "_330x140.jpg"
            } else {
                listingImage = listingDetails[0].listingImage.split('.')[0] + "_330x140." + listingDetails[0].listingImage.split('.')[1];
            }
            storage
            .refFromURL(`gs://app23980.appspot.com/listings/${listingImage}` )
            .getDownloadURL()
            .then( url => {
                setImageLink(url);
                } )
            .catch( (err) => "Error getting image url: " + err);
        }

        function getLogo() { 
            const blocks = listingDetails[0].companyLogo.split('.');
            let companyLogo = '';
            if (blocks.length === 1) {
              companyLogo = listingDetails[0].companyLogo + ".jpg"
            } else {
                companyLogo = listingDetails[0].companyLogo
            }
            storage
                .refFromURL(`gs://app23980-providers-data/logos/${companyLogo}` )
                .getDownloadURL()
                .then( url => {
                    setLogo(url);
                    } )
                .catch( (err) => "Error getting logo url: " + err);
        }
    }

    const divStyle = {
        backgroundImage: 'url(' +  imageLink + ')',
    };
    const useStyles = makeStyles({
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
        companyName: {
          fontSize: 16,
        },
        className: {
          fontSize: 22,
          fontWeight: 600,
        },
        icon: {
          fontSize:20,
          verticalAlign: 'middle',
          display: 'inline-flex',
        },
        cardFooter: {
          fontSize: 14,
        },
        root: {
            backgroundColor: 'ffffff',
          //   width: 1000,
        },
    });
    const classes = useStyles();


    return(
        (listingDetails && listingDetails.length == 0) ?
            <Container className="content">
                <Grid container className="class-details-container">    
                    <Loader/>
                </Grid>
            </Container>
            :
            <Container className="content">
            <Grid container className="class-details-container">
                <div className="class-image-mobile hide-on-med-and-up" style={divStyle}></div>
                <div className="class-image hide-on-med-and-down" style={divStyle}></div>
                <Grid item xs={12} sm={12} md={12} className="class-details">
                    
                    <div className="header">
                        <h2 className="class-title">
                        {/* Support for old lisiting title name */}
                        {(listingDetails[0].hasOwnProperty('listingName')) ?
                            listingDetails[0].listingName
                            :
                            listingDetails[0].listingTitle
                        }
                        </h2>
                        <div className="company">
                            <img className="logo" src={logo} alt={`${listingDetails[0].companyLogo} logo`}></img>
                            <div className="company-name">
                                {listingDetails[0].companyName}
                            </div>
                        </div>
                        <div className="class-top-info">
                                {/* <Icon className={classes.icon} color="">
                                price
                                </Icon> */}
                                {/* <span>{listingDetails[0].price}€</span> */}
                            <ClassDate classDate={listingDetails[0].date} classTime={listingDetails[0].classTime} classes={classes.icon} locale={locale} />
                            {/* <OtherSessions otherDates={listingDetails[0].otherDates} classes={classes.icon} /> */}
                            {/* <ClassTime classTime={listingDetails[0].time} classes={classes.icon} /> */}
                            <ClassDuration sessions={listingDetails[0].sessions} duration={listingDetails[0].duration} locale={locale} classes={classes.icon} />
                            <ClassLocation address={listingDetails[0].address} classes={classes.icon} />
                            <ClassLanguage language={listingDetails[0].language} locale={locale} classes={classes.icon} />
                            <div className="class-tags">
                                <FormattedMessage 
                                    id={`classDetails.topics.${locale}`}
                                    defaultMessage=""
                                /> 
                                <RenderTags tags={listingDetails[0].tags} locale={locale} online={listingDetails[0].type} />
                            </div>
                        </div>
                        <div className="redirect-div">
                            <ClassPrice classPrice={listingDetails[0].price} classPriceCouple={listingDetails[0].priceCouple} locale={locale} />
                            <div>
                                <span>
                                    <FormattedMessage 
                                        id={`classDetails.infoLinkToWebsite.${locale}`}
                                        defaultMessage=""
                                    />
                                </span>
                            </div>
                            <div className="button-div">
                                <a href={listingDetails[0].website} target="_blank" rel="noopener noreferrer" 
                                    onClick={()=>{
                                        window.gtag("event", listingDetails[0].companyName, {
                                            event_category: "conversions",
                                            event_label: listingDetails[0].companyName + " - " + listingDetails[0].className
                                        }); 
                                    }}
                                >
                                <Button variant="contained">
                                    <FormattedMessage 
                                        id={`classDetails.linkToWebsite.${locale}`}
                                        defaultMessage="Go to website"
                                    />
                                    <Icon className={classes.icon}>
                                    &nbsp;keyboard_arrow_right
                                    </Icon>
                                </Button>
                                </a>
                            </div>
                        </div>
                        <div>
                            <RenderDescription description={listingDetails[0].description}/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
import React, { useState, useContext} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import LazyLoad from 'react-lazy-load';
import * as moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/es';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardFooter: {
    fontSize: 14,
  }
});

function RenderTags({tags, locale}) {
  let i = 0;
  const output = tags.map((tag) => {
      i++;
      return (
        // <Link key={i++} to={{pathname:`/${lang.split('-')[0]}/explore`, topic:`${tag}`}}
        //         onClick={()=>{
        //           window.scrollTo(0, 0);
        //           console.log("Tag selected: " + tag);
        //             window.gtag("event", "topic tag from class card", {
        //                 event_category: "topics",
        //                 event_label: tag
        //             }); 
        //         }}
        //     >
          <span key={i} className={`tag tag-${tag}`}>
            <FormattedMessage 
              id={`topics.${tag}.${locale}`}
              defaultMessage={tag}
            />
          </span>
        // </Link>
      );
  });

  return output;
}

function RenderFlag(language, locale) {
  if ((language==='english' && locale==='es-ES') || (language==='spanish' && locale==='en-GB')) {
      return (
        <React.Fragment>
          <span className="dot"></span>
          <img className="class-details-flag language-flag" src={`/images/flags/${language}.png`} alt={`${language}`} />
        </React.Fragment>
      );
  } else {
    return null;
  }
}



function ListingCard({
  nameId,
  format,
  online,
  listingImage,
  listingTitle,
  companyLogo,
  companyName,
  date,
  duration,
  district,
  address,
  city,
  language,
  tags,
}) {
    const classes = useStyles();
    const storage = firebase.storage();
    const [imageLink, setImageLink] = useState('someurl');
    const [logo, setLogo] = useState('');
    const imageUrl = getImage(listingImage);
    const avatar = getLogo(companyLogo);

    function getImage() { 
      storage
        .ref( `/listings/${listingImage}_330x140.jpg` )
        .getDownloadURL()
        .then( url => {
          setImageLink(url);
          } )
        .catch( (err) => "Error getting image url: " + err);
    }
    function getLogo() { 
      storage
        .refFromURL(`gs://app23980-providers-data/logos/${companyLogo}.jpg` )
        .getDownloadURL()
        .then( url => {
          setLogo(url);
          } )
        .catch( (err) => "Error getting logo url: " + err);
    }

    const { locale } = useContext(LocaleContext);
    moment.locale(locale);

    return (
      <Card className={classes.card}>
          <CardActionArea>
            <Link className="class-card-link" to={`/${locale.split('-')[0]}/listings/${nameId}`}
                onClick={()=>{
                  window.gtag("event", companyName, {
                      event_category: "listing details",
                      event_label: companyName + " - " + listingTitle
                  }); 
                }}
            >
            <LazyLoad 
                    width={327}
                    height={140}
                    debounce={false}
                    offsetVertical={500}
                    >
                
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={imageLink}
                  title={listingTitle}
                />
                
            </LazyLoad>
            <CardContent>
              <Typography className={`class-name`} gutterBottom variant="h3" component="h3">
                {listingTitle.toLowerCase()}
              </Typography>
              <div className="company">
                <LazyLoad 
                      width={25}
                      height={25}
                      debounce={false}
                      offsetVertical={500}
                      >
                  <img className="company-logo" src={logo} alt={`${companyLogo} logo`} />
                </LazyLoad>
                <span className="company-name">{companyName}</span>
              </div> 

              <div className={`card-footer ${classes.cardFooter}`}>
                  <div className="class-details">
                    {(date !== null) ?
                      (<React.Fragment>
                        <span className="class-details-date">
                          {moment(new Date(date.seconds * 1000)).format("MMM D")}
                        </span>
                        <span className="dot"></span>
                        <span className="class-details-time">
                          {moment(new Date(date.seconds * 1000)).format("HH:mm")} 
                        </span>
                      </React.Fragment>)
                      :
                      null
                    }
                       
                    {(district !== null && district !== "") ?
                        (<React.Fragment>
                            <span className="dot"></span>
                            <span className="class-details-district">
                            { (district.length > 13) ?
                                district.substring(0,13) + "..."
                                :
                                district
                            }
                            </span>
                          </React.Fragment>                     
                        )
                        :
                        (null)
                    }
                    <RenderFlag language={language} locale={locale} />

                  </div>
                  
              </div>
            </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            <RenderTags tags={tags} locale={locale} />
          </CardActions>
        </Card>)
  }

  export default ListingCard;
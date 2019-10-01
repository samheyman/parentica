import React from 'react';
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

const mapStateToProps = (state) => {
  return(
      {
          classes: state.classes,
          providers: state.providers,
          resources: state.resources,
          tab: state.tab,
          locale: state.locale
      }
  );
};

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

function RenderTags({tags, lang}) {
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
              id={`topics.${tag.split(" ")[0]}.${lang}`}
              defaultMessage={tag}
            />
          </span>
        // </Link>
      );
  });

  return output;
}

function RenderFlag({language, locale}) {
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

function MediaCard(props) {
    const classes = useStyles();
    return (
      <LocaleContext.Consumer>{(context) => {
        const locale = context.locale;
        moment.locale(props.locale);
        return(<Card className={classes.card}>
          <CardActionArea>
            <Link className="class-card-link" to={`/${locale.split('-')[0]}/${props.classEntry.nameId}`}
                onClick={()=>{
                  window.gtag("event", props.classEntry.companyName, {
                      event_category: "class details",
                      event_label: props.classEntry.companyName + " - " + props.classEntry.className
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
                  className={classes.media}
                  image={`../../images/classes/${props.classEntry.image}_sm.jpg`}
                  title={props.classEntry.className}
                />
            </LazyLoad>
            <CardContent>
              <Typography className={`class-name`} gutterBottom variant="h3" component="h3">
                {props.classEntry.className.toLowerCase()}
              </Typography>
              <div className="company">
                <LazyLoad 
                      width={25}
                      height={25}
                      debounce={false}
                      offsetVertical={500}
                      >
                  <img className="company-logo" src={`../../images/logos/${props.classEntry.companyLogo}.jpg`} alt={`${props.classEntry.companyLogo} logo`} />
                </LazyLoad>
                <span className="company-name">{props.classEntry.companyName}</span>
              </div> 

              <div className={`card-footer ${classes.cardFooter}`}>
                  <div className="class-details">
                    {(props.classEntry.date != null)?
                    
                      <span className="class-details-date">

                        {moment(props.classEntry.date).format("MMM D")}
                      
                      </span>
                      :
                      <span className="class-details-date">
                      <FormattedMessage 
                            id={`classDetails.time.anytime.${locale}`}
                            defaultMessage="Anytime"
                        />
                      </span>
                    }
                    {(props.classEntry.time != null)?
                        (
                          <React.Fragment>
                          <span className="dot"></span>
                          <span className="class-details-time">
                            <FormattedDate
                              value={props.classEntry.date}
                              hour="2-digit"
                              minute="2-digit"
                            />
                          </span>
                          </React.Fragment>                     
                        )
                        :
                        (null)
                    }
                    {(props.classEntry.district != null)?
                        (
                          <React.Fragment>
                          <span className="dot"></span>
                          <span className="class-details-district">
                          {props.classEntry.district}
                          </span>
                          </React.Fragment>                     
                        )
                        :
                        (null)
                    }
                    <RenderFlag language={props.classEntry.language} locale={locale} />

                  </div>
                  
              </div>
            </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            <RenderTags tags={props.classEntry.tags} lang={locale} />
          </CardActions>
        </Card>)}}</LocaleContext.Consumer>
    );
  }

  export default connect(mapStateToProps)(MediaCard);
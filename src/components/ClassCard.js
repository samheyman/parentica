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
        <Link key={i++} to={{pathname:"/explore", topic:`${tag}`}}
                onClick={()=>{
                  console.log("Tag selected: " + tag);
                    window.gtag("event", "topic tag from class card", {
                        event_category: "topics",
                        event_label: tag
                    }); 
                }}
            >
          <span key={i} className={`tag tag-${tag}`}>
            <FormattedMessage 
              id={`topics.${tag.split(" ")[0]}.${lang}`}
              defaultMessage={tag}
            />
          </span>
        </Link>
      );
  });

  return output;
}

function RenderFlag({language, locale}) {
  if ((language==='english' && locale==='es-SP') || (language==='spanish' && locale==='en-GB')) {
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
        <Card className={classes.card}>
          <CardActionArea>
            <Link className="class-card-link" to={`../classes/${props.classEntry.nameId}`}
                onClick={()=>{
                  window.gtag("event", props.classEntry.companyName, {
                      event_category: "class details",
                      event_label: props.classEntry.companyName + " - " + props.classEntry.className
                  }); 
                }}
            >  
            <CardMedia
              className={classes.media}
              image={`../images/classes/${props.classEntry.image}`}
              title={props.classEntry.className}
            />
            <CardContent>
              <Typography className={`class-name`} gutterBottom variant="h3" component="h3">
                {props.classEntry.className.toLowerCase()}
              </Typography>
              <div className="company">
                <img className="company-logo" src={`../images/logos/${props.classEntry.companyLogo}`} alt={`${props.classEntry.companyLogo} logo`} />
                <span className="company-name">{props.classEntry.companyName}</span>
              </div> 

              <div className={`card-footer ${classes.cardFooter}`}>
                  <div className="class-details">
                    {(props.classEntry.date != null)?
                      <span className="class-details-date">
                        <FormattedDate
                          value={props.classEntry.date}
                          day="2-digit"
                          month="2-digit"
                        />
                      </span>
                      :
                      <span className="class-details-date">Anytime</span>
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
                    <RenderFlag language={props.classEntry.language} locale={props.locale} />

                  </div>
                  
              </div>
            </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            <RenderTags tags={props.classEntry.tags} lang={props.locale} />
          </CardActions>
        </Card>
    );
  }

  export default connect(mapStateToProps)(MediaCard);
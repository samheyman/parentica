import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  companyName: {
    fontSize: 16,
    fontWeight: 600
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
  }
});

function RenderTags({tags, lang}) {
  let i = 0;
  const output = tags.map((tag) => {
      i++;
      return (
          <span key={i} className={`tag tag-${tag}`}>
            <FormattedMessage 
              id={`topics.${tag.split(" ")[0]}.${lang}`}
              defaultMessage={tag}
            />
          </span>
      );
  });

  return output;
}

function RenderFlag({language, locale}) {
  if ((language==='english' && locale==='es-SP') || (language==='spanish' && locale==='en-GB')) {
      return (
          <img className="language-flag" src={`/images/flags/${language}.png`} alt={`${language}`} />
      );
  } else {
    return null;
  }
}

function MediaCard(props) {
    const classes = useStyles();
    return (
      <Link className="class-card-link" to={`../classes/${props.classEntry.nameId}`}
          onClick={()=>{
            window.gtag("event", props.classEntry.companyName, {
                event_category: "class detail views",
                event_label: props.classEntry.companyName + " - " + props.classEntry.className
            }); 
          }}
      >  
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`../images/classes/${props.classEntry.image}`}
              title={props.classEntry.className}
            />
            <CardContent>
              <Typography className={classes.className} gutterBottom variant="h3" component="h3">
                {props.classEntry.className.toLowerCase()}
              </Typography>
              <Typography className={`class-name ${classes.companyName}`} component="h4" gutterBottom>
                {props.classEntry.companyName}
              </Typography>

              <div className={`card-footer ${classes.cardFooter}`}>

                <RenderFlag language={props.classEntry.language} locale={props.locale} />

                  <div className="value">
                    
                    <span className="date-time">
                      <FormattedDate
                          value={props.classEntry.date}
                          day="2-digit"
                          month="2-digit"
                      />
                      
                    </span>
                  
                    <span className="dot"></span>
                  
                    <span>
                      <FormattedDate
                        value={props.classEntry.date}
                        hour="2-digit"
                        minute="2-digit"
                      />
                    </span>
                  
                    <span className="dot"></span>
                  
                    <span>{props.classEntry.district}</span>
                  </div>
                  
              </div>
              <RenderTags tags={props.classEntry.tags} lang={props.locale} />
              
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
            <span>
              <Icon className={classes.icon} color="secondary">
                map
              </Icon>
              <span> {props.classEntry.district}</span>
            </span>
            <span size="small" color="primary">
              <Icon className={classes.icon} color="secondary">
                hourglass_full
              </Icon>
              <span>{props.classEntry.duration}</span>
            </span>
            <span size="small" color="primary">
                {props.classEntry.price}€
            </span>
          </CardActions> */}
        </Card>
      </Link>
    );
  }

  export default connect(mapStateToProps)(MediaCard);
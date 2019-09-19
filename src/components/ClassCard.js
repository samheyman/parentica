import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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

function RenderTags({tags}) {
  let i = 0;
  const output = tags.map((tag) => {
      i++;
      return (
          <span key={i} className={`tag tag-${tag}`}>{tag}</span>
      );
  });

  return output;
}

function RenderFlag({language}) {
  if (language==='spanish' || language==='english') {
      return (
          <img className="language-flag" src={`/images/flags/${language}.png`} alt={`${language}`} />
      );
  } else {
    return null;
  }
}

export default function MediaCard(props) {
    const classes = useStyles();
    return (
      <Link className="class-card-link" to={`../classes/${props.classEntry.nameId}`}
          onClick={()=>{
            window.gtag("event", props.classEntry.companyName, {
                event_category: "class details",
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
{/*                 
                  {props.classEntry.price}€  */}
              <RenderFlag language={props.classEntry.language} />

                  <div className="value">
                    {/* <Icon className={classes.icon}>
                    calendar_today
                    </Icon> */}
                    <span className="date-time">{new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(Date.parse(props.classEntry.date)))}</span>
                  {/* </div>
                  <div className="value left-spacer"> */}
                    <span className="dot"></span>
                  {/* </div>
                  <div className="value left-spacer"> */}
                    {/* <Icon className={classes.icon}>
                    location_on
                    </Icon> */}
                    <span>{props.classEntry.time}</span>
                  {/* </div>
                  <div className="value left-spacer"> */}
                    <span className="dot"></span>
                  {/* </div>
                  <div className="value left-spacer"> */}
                    {/* <Icon className={classes.icon}>
                    location_on
                    </Icon> */}
                    <span>{props.classEntry.district}</span>
                  </div>
                  
              </div>
              <RenderTags tags={props.classEntry.tags} />
              
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
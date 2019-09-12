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

export default function MediaCard(props) {
    const classes = useStyles();
  
    return (
      <Link className="class-card-link" to={`../classes/${props.classEntry.id}`}>  
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`../images/classes/${props.classEntry.image}`}
              title={props.classEntry.className}
            />
            <CardContent>
              <Typography className={classes.className} gutterBottom variant="h3" component="h3">
                {props.classEntry.className}
              </Typography>
              <Typography className={classes.companyName} color="textSecondary" component="h4" gutterBottom>
                {props.classEntry.companyName}
              </Typography>
            
              
              <div className={`card-footer ${classes.cardFooter}`}>
                
                  {/* {props.classEntry.price}€  */}

                  <div className="value">
                    {/* <Icon className={classes.icon}>
                    timelapse
                    </Icon> */}
                    <span>{props.classEntry.duration}</span>
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
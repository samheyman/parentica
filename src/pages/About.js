import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
        height: 140,
    },
    card: {
        maxWidth: 345,
    },
    h3: {
        fontSize:12,
    },
}));

function About(props) {
    const classes = useStyles();

    return(
        <Container className="main-content">
            <div className="col content">
                <div className={classes.root}>
                    <h2>
                        <FormattedMessage 
                            id={`about.about.${props.locale}`}
                            defaultMessage=""
                        />
                    </h2>
                    <p><FormattedMessage 
                            id={`about.mission.p1.${props.locale}`}
                            defaultMessage=""
                        />
                        <br/>
                    </p>
                    <Paper className={`quote ${classes.root}`}>
                        <Typography component="p">
                            <FormattedMessage 
                                id={`about.mission.statement.${props.locale}`}
                                defaultMessage=""
                            />
                        </Typography>
                    </Paper>
                    
                    <h3>
                        <FormattedMessage 
                            id={`about.manifesto.${props.locale}`}
                            defaultMessage=""
                        />
                    </h3>
                    <ol>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p1.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q1.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p2.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q2.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p3.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q3.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p4.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q4.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p5.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q5.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p6.${props.locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q6.${props.locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                    </ol>
                    <h3>
                        <FormattedMessage 
                            id={`about.team.meet.${props.locale}`}
                            defaultMessage=""
                        />
                    </h3>
                    <Grid container spacing={2}>
                        <Grid item sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                    className={`sam ${classes.media}`}
                                    image="/images/brand/sam.jpg"
                                    title="Sam Heyman"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h4" component="h4" className="team-name">
                                        Sam Heyman
                                    </Typography>
                                    <Typography gutterBottom variant="h4" component="h4" className="job-title">
                                        <FormattedMessage 
                                            id={`about.team.samJob.${props.locale}`}
                                            defaultMessage=""
                                        />
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <FormattedMessage 
                                            id={`about.team.samDescription.${props.locale}`}
                                            defaultMessage=""
                                        />     
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={`eline ${classes.media}`}
                                        image="/images/brand/eline.jpg"
                                        title="Eline Lund"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h4" component="h4" className="team-name">
                                        Eline Lund
                                    </Typography>
                                    <Typography gutterBottom variant="h4" component="h4" className="job-title">
                                        <FormattedMessage 
                                            id={`about.team.elineJob.${props.locale}`}
                                            defaultMessage=""
                                        /> 
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <FormattedMessage 
                                            id={`about.team.elineDescription.${props.locale}`}
                                            defaultMessage=""
                                        /> 
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    <br/>
                </div>
            </div>
        </Container>
    );
}

export default About; 
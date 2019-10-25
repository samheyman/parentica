import React, { useContext } from 'react';
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
import { LocaleContext } from '../contexts/LocaleContext';
 
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
    const { locale } = useContext(LocaleContext);
    return(
        <Container className="content">
            <div className="col content">
                <div className={classes.root}>
                    <h2>
                        <FormattedMessage 
                            id={`about.about.${locale}`}
                            defaultMessage=""
                        />
                    </h2>
                    <p><FormattedMessage 
                            id={`about.mission.p1.${locale}`}
                            defaultMessage=""
                        />
                        <br/>
                    </p>
                    <Paper className={`quote ${classes.root}`}>
                        <Typography component="p">
                            <FormattedMessage 
                                id={`about.mission.statement.${locale}`}
                                defaultMessage=""
                            />
                        </Typography>
                    </Paper>
                    
                    {/* <h3>
                        <FormattedMessage 
                            id={`about.manifesto.${locale}`}
                            defaultMessage=""
                        />
                    </h3>
                    <ol>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p1.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q1.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p2.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q2.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        <li>
                            <FormattedMessage 
                                id={`about.manifesto.p3.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q3.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                        {/* <li>
                            <FormattedMessage 
                                id={`about.manifesto.p4.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q4.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li> */}
                        {/* <li>
                            <FormattedMessage 
                                id={`about.manifesto.p5.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q5.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li> */}
                        {/* <li>
                            <FormattedMessage 
                                id={`about.manifesto.p6.${locale}`}
                                defaultMessage=""
                            />
                            <div className="manifesto-quote">
                                <FormattedMessage 
                                    id={`about.manifesto.q6.${locale}`}
                                    defaultMessage=""
                                />
                            </div>
                        </li>
                    </ol> */}
                    <h3>
                        <FormattedMessage 
                            id={`about.team.meet.${locale}`}
                            defaultMessage=""
                        />
                    </h3>
                    <Grid container spacing={2}>
                        <Grid item sm={6} md={4}>
                            <Card className={`${classes.card} profile-div`}>
                                <CardActionArea>
                                    <CardMedia
                                    className={`sam ${classes.media}`}
                                    image="/images/brand/sam_sm.jpg"
                                    title="Sam Heyman"
                                    />
                                    <CardContent>
                                    <h3 className="profile-div-title">
                                        Sam Heyman
                                    </h3>
                                    <p className="profile-div-subtitle">
                                        <FormattedMessage 
                                            id={`about.team.samJob.${locale}`}
                                            defaultMessage=""
                                        />
                                    </p>
                                    <p className="profile-div-text">
                                        <FormattedMessage 
                                            id={`about.team.samDescription.${locale}`}
                                            defaultMessage=""
                                        />     
                                    </p>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={6} md={4}>
                        <Card className={`${classes.card} profile-div`}>
                                <CardActionArea>
                                    <CardMedia
                                        className={`eline ${classes.media}`}
                                        image="/images/brand/eline_sm2.jpg"
                                        title="Eline Lund"
                                    />
                                    <CardContent>
                                    <h3 className="profile-div-title">
                                        Eline Lund
                                    </h3>
                                    <p className="profile-div-subtitle">
                                        <FormattedMessage 
                                            id={`about.team.elineJob.${locale}`}
                                            defaultMessage=""
                                        /> 
                                    </p>
                                    <p className="profile-div-text">
                                        <FormattedMessage 
                                            id={`about.team.elineDescription.${locale}`}
                                            defaultMessage=""
                                        /> 
                                    </p>
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
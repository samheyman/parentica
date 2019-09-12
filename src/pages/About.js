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
                    <h2>About</h2>
                    <p>The mission of Parentica is simple...<br/></p>
                    <Paper className={`quote ${classes.root}`}>
                        <Typography component="p">
                        Help parents and parents-to-be to find classes that will inspire them to become even better parents.
                        </Typography>
                    </Paper>
                    
                    <h3>Manifesto</h3>
                    <ol>
                        <li>The latest research in neurology, medicine, mental science, and all other disciplines is pushing the boundaries of what we know and assumed to be true, challenging preconceived thoughts.                                <br/>
                            <div className="manifesto-quote">"The only true wisdom is in knowing you know nothing" - Socrates</div>
                        </li>
                        <li>Opinions and knowledge change from culture to culture, and generation to generation.
                            <br/>
                            <div className="manifesto-quote">“There’s no way to be a perfect mother and a million ways to be a good one.” - Jill Churchill</div>
                        </li>
                        <li>People tend to live further from their families, often in diffent countries, reducing the chances of family and community knowledge sharing.
                        <br/>
                            <div className="manifesto-quote">"It takes a village to raise a child." - African proverb</div>
                        </li>
                        <li>Online teaching is opening the doors to knowledge sharing and learning to all.
                            <br/>
                            <div className="manifesto-quote">"There are only two lasting bequests we can hope to give our children. One of these is roots, the other, wings." - Johann Wolfgang von Goethe</div>
                        </li>
                        <li>Learning to raise children is a challenge that is worth taking.
                            <br/>
                            <div className="manifesto-quote">“The important thing is not to win the children but to earn them, for this the adult must invest time in motivating and teaching essential competences for life.” - R. Dreikurs</div>
                        </li>
                        <li>
                            Happiness and well-being are of the upmost importance.
                            <br/>
                            <div className="manifesto-quote">“Children learn more from what you are than what you teach.” - W.E.B. DuBois</div>
                        </li>
                    </ol>
                    <h3>Meet the team</h3>
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
                                        Founder and developer
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Sam is a software engineer and father-to-be. He has a breadth of experience in 
                                        building web applications having worked as a 
                                        software developer for companies such as Skyscanner and Amadeus IT Group. He now wants to use his skills to help parents like himself with the daunting but exciting challenge of raising children.
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
                                        Provider Manager
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    Eline is the co-founder of two NGOs that help empower children to become change agents in their communities through education. 
                                    She loves to work with those who want to create a better world and solve the major challenges of today and tomorrow.
                                    She specializes in 21st century skills, school transformation and social impact, and is always eager to meet others on the same journey.
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
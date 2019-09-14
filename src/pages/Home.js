import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}));

function MadridProviders({providers}) {
    const providersList = providers.map((provider) => {
        return(
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <a href={`${provider.url}`} target="_blank" rel="noopener noreferrer"> 
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                    </a>
                </div>
            </Grid>
        );
    });

    return(
        <Grid container spacing={2}>
            {providersList}
        </Grid>
    );
}

function OnlineProviders({providers}) {
    const providersList = providers.map((provider) => {
        return(
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <Link to={`classes/${provider.id}`}> 
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                    </Link>
                </div>
            </Grid>
        );
    });

    return(
        <Grid container spacing={2}>
            {providersList}
        </Grid>
    );
}

function Home(props) {
    const classes = useStyles();

    return(
        <Container className="main-content">
            <div className="tagline">
                <h2 className="tagline-header">Skilled parents <br/>for happy, thriving children</h2>  
                <p className="tagline-paragraph">
                    Find <em>pregnancy and parenting classes and events,</em> either online or in one of the cities we are in
                </p>
                <div className="main-links">
                    <Link to={{pathname:"/explore/online", topic:"all"}}>
                        <Button variant="contained" className={`btn-first ${classes.button}`}>
                            online
                        </Button>
                    </Link>
                    <Link to={{pathname:"/explore/madrid", topic:"all"}}>
                        <Button variant="contained" className={`btn-second ${classes.button}`}>
                            Madrid
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="popular-topics">
                <h2>Popular topics</h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TopicCard topic="parenting" resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard topic="pregnancy" resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard topic="nutrition" resultCount={props.classEntries.filter((item) => item.tags.includes("nutrition")).length}/>
                    <TopicCard topic="music" resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}/>
                    <TopicCard topic="postpartum" resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}/>
                </Grid>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2>Providers in Madrid</h2> 
                    <MadridProviders providers={props.madridProviders}/>
                    {/* <RenderProviderCard provider={props.providers} /> */}
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2>Online Providers</h2> 
                    <OnlineProviders providers={props.onlineProviders}/>
                </div>
            </div>
        </Container>
    );
}

export default Home; 
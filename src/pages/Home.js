import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}));

function RenderPregnancyLink({classes}) {
    const numberClasses = classes.length;
    return(
        <Link to={{pathname:"/explore", topic:"pregnancy"}}>
        <Grid item xs={12} sm={6} md={4} key="1">
            <Card className="topic-card">
                <CardActionArea>
                    <CardMedia
                    image="../images/brand/pregnancy.jpg"
                    title="Pregnancy"
                    />
                    <CardContent>
                        <h4>Pregnancy</h4>
                        <p>{numberClasses} classes</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        </Link>
    );
}

function RenderParentingLink({classes}) {
    const numberClasses = classes.length;
    return(
        <Link to={{pathname:"/explore", topic:"parenting"}}>
        <Grid item xs={12} sm={6} md={4} key="2">
            <Card className="topic-card">
                <CardActionArea>
                    <CardMedia
                    image="../images/brand/parenting.png"
                    title="Parenting"
                    />
                    <CardContent>
                        <h4>Parenting</h4>
                        <p>{numberClasses} classes</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        </Link>
    );
}

function RenderNutritionLink({classes}) {
    const numberClasses = classes.length;
    return(
        <Link to={{pathname:"/explore", topic:"nutrition"}}>
        <Grid item xs={12} sm={6} md={4} key="3">
            <Card className="topic-card">
                <CardActionArea>
                    <CardMedia
                    image="../images/brand/nutrition.jpg"
                    title="Nutrition"
                    />
                    <CardContent>
                        <h4>Nutrition</h4>
                        <p>{numberClasses} classes</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        </Link>
    );
}

function RenderOnlineClassCard({classes}) {
    const numberClasses = classes.length;
    return(
        <Link to={{pathname:"/explore/online", topic:"all"}}>
            <Grid item xs={12} sm={6} md={4} key="4">
                <Card className="topic-card">
                    <CardActionArea>
                        <CardMedia
                        image="../images/brand/manonlaptop.jpg"
                        title="Online classes"
                        />
                        <CardContent>
                            <h4>Online classes</h4>
                            <p>{numberClasses} classes</p>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Link>
    );
}

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
                    <RenderPregnancyLink classes={props.classEntries.filter((item) => item.tags.includes("pregnancy"))} />
                    <RenderParentingLink classes={props.classEntries.filter((item) => item.tags.includes("parenting"))} />
                    <RenderOnlineClassCard classes={props.onlineClasses} />
                    <RenderNutritionLink classes={props.classEntries.filter((item) => item.tags.includes("nutrition"))} />
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
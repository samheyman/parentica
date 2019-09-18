import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import { FormattedMessage } from 'react-intl';

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
    console.log("Props: \n" + props.locale);
    return(
        <Container className="main-content">
            <div className="tagline">
                <h2 className="tagline-header">
                    <FormattedMessage 
                        id={`homepage.tagline_header.${props.locale}`}
                        defaultMessage="Parenting and pregnancy classes for all"
                    />
                </h2>  
                <p className="tagline-paragraph">
                    <FormattedMessage 
                        id={`homepage.tagline_paragraph.${props.locale}`}
                        defaultMessage="Find pregnancy and parenting classes and events, either online or in one of the cities we are in"
                    />
                </p>
                <div className="main-links">
                    <Link to={{pathname:"/explore/online", topic:"all"}}>
                        <Button variant="contained" className={`btn-first ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline_online_button.${props.locale}`} />
                        </Button>
                    </Link>
                    <Link to={{pathname:"/explore/madrid", topic:"all"}}>
                        <Button variant="contained" className={`btn-second ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline_madrid_button.${props.locale}`} />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="popular-topics">
                <h2>
                    <FormattedMessage id={`homepage.popular_topics_header.${props.locale}`} />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TopicCard 
                        topic="parenting" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.parenting.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        topic="baby" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.baby.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("baby")).length}/>
                    <TopicCard 
                        topic="nutrition" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.nutrition.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("nutrition")).length}/>
                    <TopicCard 
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}/>
                    <TopicCard 
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}/>
                    <TopicCard 
                        topic="yoga" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.yoga.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}/>
                    <TopicCard 
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${props.locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}/>
                </Grid>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers_madrid_header.${props.locale}`} /></h2> 
                    <MadridProviders providers={props.madridProviders}/>
                    {/* <RenderProviderCard provider={props.providers} /> */}
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers_online_header.${props.locale}`} /></h2> 
                    <OnlineProviders providers={props.onlineProviders}/>
                </div>
            </div>
        </Container>
    );
}

export default Home; 
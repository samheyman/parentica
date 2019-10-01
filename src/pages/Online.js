import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import CityCard from '../components/CityCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}));

function RenderTags({tags, locale}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link className="homepage-tags" key={i++} to={{pathname:`/${locale.split('-')[0]}/explore`, topic:`${tag.name}`}}
                onClick={()=>{
                    window.gtag("event", "topic tag from homepage", {
                        event_category: "topics",
                        event_label: tag.name
                    }); 
                }}
            >
                <span className={`tag tag-${tag.id}`}>
                    <FormattedMessage 
                        id={`topics.${tag.name.split(" ")[0]}.${locale}`}
                        defaultMessage={tag.name}
                    />
                </span>
            </Link>
        );
    });
    return output;
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

function Online(props) {
    const classes = useStyles();
    console.log(props.onlineProviders);
    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            
            <div className="popular-topics">
                <h2>
                    <FormattedMessage id={`homepage.popularTopics.${locale}`} defaultMessage="Topics"/>    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TopicCard
                        locale={`${locale}`}
                        topic="parenting" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.parenting.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="baby" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.baby.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("baby")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="nutrition" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.nutrition.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("nutrition")).length}/>
                    {/* <TopicCard 
                        locale={`${locale}`}
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="yoga" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.yoga.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}/> */}
                </Grid>
            </div>
            <div className="all-topics">
                <h2>
                <FormattedMessage id={`homepage.allTopics.${locale}`} />        
                </h2>  
                <RenderTags tags={props.topics} locale={`${locale}`} /> 
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers.online.header.${locale}`} /></h2> 
                    <OnlineProviders providers={props.onlineProviders}/>
                </div>
            </div>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Online; 
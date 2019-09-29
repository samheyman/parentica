import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CityCard from '../components/CityCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import ClassCard from '../components/ClassCard';
import LazyLoad from 'react-lazy-load';
import TypeCard from '../components/TypeCard';
import LanguageCard from '../components/LanguageCard';
import TopicCard from '../components/TopicCard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';

function RenderTags({tags, locale}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link className="homepage-tags" key={i++} to={{pathname:`/${locale.split('-')[0]}/online/explore`, topic:`${tag.name}`}}
                onClick={()=>{
                    window.gtag("event", "online topic tag from homepage", {
                        event_category: "online topics",
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
                    <a href={`${provider.url}`} target="_blank" rel="nofollow">
                        <LazyLoad 
                            
                            debounce={false}
                            offsetVertical={500}
                            >
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                        </LazyLoad>
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

function Home(props) {
    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            <div className="tagline">
                <h2 className="tagline-header">
                    <FormattedMessage 
                        id={`homepage.tagline.header.${locale}`}
                        defaultMessage="Parenting and pregnancy classes for all"
                    />
                </h2>  
                <p className="tagline-paragraph">
                    <FormattedMessage 
                        id={`homepage.tagline.paragraph.${locale}`}
                        defaultMessage="Find pregnancy and parenting classes and events, either online or in one of the cities we are in"
                    />
                </p>
                {/* <div className="main-links">
                    <Link to={{pathname:`/${locale.split('-')[0]}/explore/online`, topic:"all"}}>
                        <Button id="online-classes-btn" variant="contained" className={`btn-first ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline.online.button.${locale}`} />
                        </Button>
                    </Link>
                    <Link to={{pathname:`/${locale.split('-')[0]}/explore/madrid`, topic:"all"}}>
                        <Button id="madrid-classes-btn" variant="contained" className={`btn-second ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline.madrid.button.${locale}`} />
                        </Button>
                    </Link>
                </div> */}
            </div>
            
            <div className="cities">
                <h2>
                    <FormattedMessage 
                        id={`homepage.searchByCity.${locale}`} 
                        defaultMessage="Search by city" />    
                </h2>  
                <Grid container className="cities-links" spacing={2} alignContent="center">
                    <CityCard
                        locale={`${locale}`}
                        topic="madrid" 
                        topicLocalised="Madrid"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <Grid item xs={6} sm={4} md={3} key="3">
                        <Card className="more-cities">
                            <CardActionArea>
                                <CardContent>
                                <h4><FormattedMessage 
                                    id={`home.moreCities.${locale}`} 
                                    defaultMessage="More cities to come!" /></h4>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                
            </div>
            <div className="types">
                <h2>
                    <FormattedMessage 
                        id={`homepage.searchOnline.${locale}`} 
                        defaultMessage="Search online" />    
                </h2>  
                <Grid container className="topic-cards " spacing={2} alignContent="center">
                    <TypeCard
                        locale={`${locale}`}
                        topic="online classes" 
                        topicLocalised={<FormattedMessage 
                            id={`general.classes.${locale}`} 
                            defaultMessage="Classes" />}
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <TypeCard   
                        locale={`${locale}`}
                        topic="webinars" 
                        topicLocalised={<FormattedMessage 
                            id={`general.webinars.${locale}`} 
                            defaultMessage="Webinars" />}
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    {/* <TopicCard
                        locale={`${locale}`}
                        topic="blog" 
                        topicLocalised={<FormattedMessage 
                            id={`general.blog.${locale}`} 
                            defaultMessage="Blog" />}
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    /> */}
                </Grid>
            </div>
            <div className="online-classes">
                <h2>
                    <FormattedMessage id={`homepage.popularOnlineClasses.${locale}`} defaultMessage="Popular online classes"/>    
                </h2> 
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    {props.onlineClasses.map((item) => {                        
                        return(
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <ClassCard 
                                    classEntry={item}
                                />
                            </Grid>);
                    })
                    }
                </Grid>
                <div className="show-all-link">
                    <Link to={{pathname:`/${locale.split('-')[0]}/online/explore`}}>
                        <FormattedMessage id={`general.showAll.${locale}`} defaultMessage="show all" />    
                    </Link>
                    <Icon>keyboard_arrow_right</Icon>
                </div>
                
            </div>
            <div className="popular-topics">
                <h2>
                    <FormattedMessage id={`homepage.onlinePopularTopics.${locale}`} defaultMessage="Topics"/>    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TopicCard
                        locale={`${locale}`}
                        topic="parenting" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.parenting.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}
                        />
                    <TopicCard 
                        locale={`${locale}`}
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}
                        />
                    <TopicCard 
                        locale={`${locale}`}
                        topic="baby" 
                        topicLocalised={<FormattedMessage id={`topics.baby.${locale}`} defaultMessage="baby"/>}
                        rootUrl="/online"
                        // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("baby")).length}
                        />
                    <TopicCard 
                        locale={`${locale}`}
                        topic="nutrition" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.nutrition.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("nutrition")).length}
                        />
                    <TopicCard 
                        locale={`${locale}`}
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="fitness" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.fitness.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${locale}`} />
                        }
                        rootUrl="/online"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}
                        />
                </Grid>
            </div>
            <div className="all-topics">
                <h2>
                <FormattedMessage id={`homepage.allTopics.${locale}`} />        
                </h2>  
                <RenderTags tags={props.topics} locale={`${locale}`} rootUrl="/online" /> 
            </div>
            <div className="types">
                <h2>
                    <FormattedMessage id={`homepage.onlineByLanguage.${locale}`} defaultMessage="By language" />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <LanguageCard
                        locale={`${locale}`}
                        topic="english" 
                        rootUrl="/online"
                        topicLocalised={<FormattedMessage 
                            id={`general.english.${locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <LanguageCard
                        locale={`${locale}`}
                        topic="spanish"
                        rootUrl="/online" 
                        topicLocalised={<FormattedMessage 
                            id={`general.spanish.${locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    
                </Grid>
            </div>
        
            <div className="providers">
                <h2>
                    <FormattedMessage id={`homepage.onlineProviders.${locale}`} defaultMessage="Online providers"/>    
                </h2> 
                {/* <p>List your classes</p> */}
                <OnlineProviders providers={props.onlineProviders}/>

            </div>
            
            
            
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Home; 
import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import LanguageCard from '../components/LanguageCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import ClassCard from '../components/ClassCard';
import TypeCard from '../components/TypeCard';
import LazyLoad from 'react-lazy-load';
import Icon from '@material-ui/core/Icon';


function RenderTags({tags, locale}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link className="homepage-tags" key={i++} to={{pathname:`/${locale.split('-')[0]}/madrid/explore`, topic:`${tag.name}`}}
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

function MadridProviders({providers}) {
    const providersList = providers.map((provider) => {
        return(
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <a href={`${provider.url}`} target="_blank" rel="noopener noreferrer"> 
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

// function OnlineProviders({providers}) {
//     const providersList = providers.map((provider) => {
//         return(
//             <Grid item xs={4} sm={3} md={2} key={provider.id}>
//                 <div className="logo-container">
//                     <Link to={`classes/${provider.id}`}> 
//                         <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
//                     </Link>
//                 </div>
//             </Grid>
//         );
//     });

//     return(
//         <Grid container spacing={2}>
//             {providersList}
//         </Grid>
//     );
// }

function City(props) {
    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            
            <div className="upcoming-classes">
                <h2>
                    <FormattedMessage 
                        id={`city.thisWeek.${locale}`} 
                        defaultMessage="This week in Madrid"/>    
                </h2>
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    {props.classesThisWeek.map((item) => {                        
                        return(
                            // <div className="item" key={item.id}>
                            <Grid item xs={12} sm={6} md={3} key={item.id}>
                                    <ClassCard 
                                        classEntry={item}
                                    />
                            </Grid>
                            /* </div> */
                        );
                    })
                    }
                </Grid>
                <div className="show-all-link">
                    <Link to={{pathname:`/${locale.split('-')[0]}/madrid/explore`}}>
                    <FormattedMessage id={`general.showAll.${locale}`} defaultMessage="show all" />    
                    </Link>
                    <Icon>keyboard_arrow_right</Icon>
                </div>
                {/* </div> */}
            </div>

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
                        rootUrl="/madrid"
                        resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${locale}`} />
                        }
                        rootUrl="/madrid"

                        resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="baby" 
                        topicLocalised={<FormattedMessage id={`topics.baby.${locale}`} defaultMessage="baby"/>}
                        rootUrl="/madrid"

                        resultCount={props.classesThisWeek.filter((item) => item.tags.includes("baby")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="nutrition" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.nutrition.${locale}`} />
                        }
                        rootUrl="/madrid"

                        resultCount={props.classesThisWeek.filter((item) => item.tags.includes("nutrition")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${locale}`} />
                        }
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${locale}`} />
                        }
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="yoga" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.yoga.${locale}`} />
                        }
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}
                        />
                    <TopicCard
                        locale={`${locale}`}
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${locale}`} />
                        }
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}
                        />
                </Grid>
            </div>
            <div className="all-topics">
                <h2>
                <FormattedMessage id={`homepage.allTopics.${locale}`} />        
                </h2>  
                <RenderTags tags={props.topics} locale={`${locale}`} /> 
            </div>
            <div className="types">
                <h2>
                    <FormattedMessage id={`city.searchByType.${locale}`} defaultMessage="Search by type" />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TypeCard
                        locale={`${locale}`}
                        topic="classes" 
                        topicLocalised={<FormattedMessage id={`general.classes.${locale}`} defaultMessage="classes"/>}
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <TypeCard
                        locale={`${locale}`}
                        topic="seminars" 
                        topicLocalised={<FormattedMessage id={`general.seminars.${locale}`} defaultMessage="seminars"/>}
                        rootUrl="/madrid"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <TypeCard
                        locale={`${locale}`}
                        topic="meetups" 
                        topicLocalised={<FormattedMessage id={`general.meetups.${locale}`} defaultMessage="meetups"/>}
                        rootUrl="/madrid"

                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    
                </Grid>
            </div>
            <div className="types">
                <h2>
                    <FormattedMessage id={`homepage.byLanguage.${locale}`} defaultMessage="By language" />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <LanguageCard
                        locale={`${locale}`}
                        topic="spanish"
                        rootUrl="/madrid" 
                        topicLocalised={<FormattedMessage 
                            id={`general.spanish.${locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <LanguageCard
                        locale={`${locale}`}
                        topic="english" 
                        rootUrl="/madrid"
                        topicLocalised={<FormattedMessage 
                            id={`general.english.${locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                </Grid>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers.madrid.header.${locale}`} /></h2> 
                    <MadridProviders providers={props.madridProviders}/>
                    {/* <RenderProviderCard provider={props.providers} /> */}
                </div>
            </div>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default City; 
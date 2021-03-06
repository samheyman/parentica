import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import LanguageCard from '../components/LanguageCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import ListingCard from '../components/ListingCard';
import TypeCard from '../components/TypeCard';
import LazyLoad from 'react-lazy-load';
import Icon from '@material-ui/core/Icon';

// Translated text
import TranslatedText from '../components/TranslatedText';


function RenderTags({tags, locale}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link className="homepage-tags" key={i++} to={{pathname:`/${locale.split('-')[0]}/madrid/explore`, topic:`${tag.name}`}}
                onClick={()=>{
                    window.gtag("event", "topic tag from Madrid", {
                        event_category: "Madrid topics",
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

function Providers({providers}) {
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

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function City(props) {
    const locale = useContext(LocaleContext);
    return(
        <Container className="main-content">
            
            <div className="upcoming-classes">
                <h2>
                    <TranslatedText id={`city.upcoming`} defaultMessage="Upcoming in"/>  
                    &nbsp;{capitalize(props.city)}  
                </h2>
                <div className="scroll-container">
                    {props.upcomingListings.map((listing) => {  
                        return(
                            <ListingCard 
                                key={listing.id}
                                nameId={listing.nameId}
                                format={listing.format}
                                online={listing.online}
                                listingImage={listing.listingImage}
                                listingTitle={(listing.hasOwnProperty('listingTitle')) ? listing.listingTitle : listing.listingName}
                                companyLogo={listing.companyLogo}
                                companyName={listing.companyName}
                                date={(listing.date !== "") ? listing.date : null }
                                duration={listing.duration}
                                district={listing.district}
                                address={listing.address}
                                city={listing.city}
                                language={listing.language}
                                tags={listing.tags}
                            />
                        );
                    })
                    }
                </div>
                <div className="show-all-link">
                    <Link to={{pathname:`/${locale.locale.split('-')[0]}/${props.city}/explore`}}>
                    <FormattedMessage id={`general.showAll.${locale.locale}`} defaultMessage="show all" />    
                    </Link>
                    <Icon>keyboard_arrow_right</Icon>
                </div>
                {/* </div> */}
            </div>

            <div className="popular-topics">
                <h2>
                    <FormattedMessage id={`homepage.popularTopics.${locale.locale}`} defaultMessage="Topics"/>    
                </h2>  
                <div className="scroll-container">
                    <TopicCard 
                        locale={`${locale.locale}`}
                        topic="baby" 
                        topicLocalised={<FormattedMessage id={`topics.baby.${locale.locale}`} defaultMessage="baby"/>}
                        rootUrl="madrid"

                        resultCount={props.upcomingListings.filter((item) => item.tags.includes("baby")).length}/>
                    <TopicCard 
                        locale={`${locale.locale}`}
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${locale.locale}`} />
                        }
                        rootUrl="madrid"

                        resultCount={props.upcomingListings.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard
                        locale={`${locale.locale}`}
                        topic="massage" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.massage.${locale.locale}`} />
                        }
                        rootUrl="madrid"
                        resultCount={props.upcomingListings.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale.locale}`}
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${locale.locale}`} />
                        }
                        rootUrl="madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}
                        />
                    <TopicCard
                        locale={`${locale.locale}`}
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${locale.locale}`} />
                        }
                        rootUrl="madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}
                        /><TopicCard 
                        locale={`${locale.locale}`}
                        topic="breastfeeding" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.breastfeeding.${locale.locale}`} />
                        }
                        rootUrl="madrid"

                        resultCount={props.upcomingListings.filter((item) => item.tags.includes("nutrition")).length}/>
                    <TopicCard
                        locale={`${locale.locale}`}
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${locale.locale}`} />
                        }
                        rootUrl="madrid"
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}
                        />
                    <TopicCard
                        locale={`${locale.locale}`}
                        topic="fitness" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.fitness.${locale.locale}`} />
                        }
                        rootUrl={props.city}
                        // resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}
                        />
                    
                </div>
            </div>
            <div className="all-topics">
                <h2>
                <FormattedMessage id={`homepage.allTopics.${locale.locale}`} />        
                </h2>  
                <RenderTags tags={props.topics} locale={`${locale.locale}`} /> 
            </div>
            <div className="types">
                <h2>
                    <FormattedMessage id={`city.searchByType.${locale.locale}`} defaultMessage="Search by type" />    
                </h2>  
                <div className="scroll-container">
                    <TypeCard
                        locale={`${locale.locale}`}
                        topic="classes" 
                        topicLocalised={<FormattedMessage id={`general.classes.${locale.locale}`} defaultMessage="classes"/>}
                        rootUrl={props.city}
                        // resultCount={props.classEntries.filter((item) => item.city === {props.city}).length}
                    />
                    <TypeCard
                        locale={`${locale.locale}`}
                        topic="seminars" 
                        topicLocalised={<FormattedMessage id={`general.seminars.${locale.locale}`} defaultMessage="seminars"/>}
                        rootUrl={props.city}
                        // resultCount={props.classEntries.filter((item) => item.city === {props.city}).length}
                    />
                    <TypeCard
                        locale={`${locale.locale}`}
                        topic="meetups" 
                        topicLocalised={<FormattedMessage id={`general.meetups.${locale.locale}`} defaultMessage="meetups"/>}
                        rootUrl={props.city}

                        // resultCount={props.classEntries.filter((item) => item.city === {props.city}).length}
                    />
                    
                </div>
            </div>
            {/* <div className="types">
                <h2>
                    <FormattedMessage id={`homepage.byLanguage.${locale.locale}`} defaultMessage="By language" />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <LanguageCard
                        locale={`${locale.locale}`}
                        topic="spanish"
                        rootUrl="madrid" 
                        topicLocalised={<FormattedMessage 
                            id={`general.spanish.${locale.locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <LanguageCard
                        locale={`${locale.locale}`}
                        topic="english" 
                        rootUrl="madrid"
                        topicLocalised={<FormattedMessage 
                            id={`general.english.${locale.locale}`} 
                            defaultMessage="Blog" />}
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                </Grid>
            </div> */}
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2>
                        <FormattedMessage id={`homepage.providers.header.${locale.locale}`} />
                        &nbsp;{capitalize(props.city)}
                    </h2> 
                        <Providers providers={props.providers}/>
                    {/* <RenderProviderCard provider={props.providers} /> */}
                </div>
            </div>
        </Container>)
}

export default City; 
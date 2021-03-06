import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CityCard from '../components/CityCard';
import { LocaleContext } from '../contexts/LocaleContext';
import ListingCard from '../components/ListingCard';
import LazyLoad from 'react-lazy-load';
import TypeCard from '../components/TypeCard';
import LanguageCard from '../components/LanguageCard';
import TopicCard from '../components/TopicCard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';

// Translated text
import TranslatedText from '../components/TranslatedText';

function RenderTags({tags}) {
    let i=0;
    const { locale } = useContext(LocaleContext);

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
                    <TranslatedText 
                        id={`topics.${tag.name.split(" ")[0]}`}
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
    const { locale } = useContext(LocaleContext);

    return(
        <Container className="content">
        <div className="tagline">
            <h2 className="tagline-header">
                <TranslatedText 
                    id={`homepage.tagline.header`}
                    defaultMessage="Parenting and pregnancy classes for all"
                />
            </h2>  
            <p className="tagline-paragraph">
                <TranslatedText 
                    id={`homepage.tagline.paragraph`}
                    defaultMessage="Find pregnancy and parenting classes and events, either online or in one of the cities we are in"
                />
            </p>
        </div>
        
        <div className="cities">
            <h2>
                <TranslatedText 
                    id={`homepage.searchByCity`} 
                    defaultMessage="Search by city" />    
            </h2>  
            <div className="scroll-container">
                {/* <Grid container className="cities-links" spacing={2} alignContent="center"> */}
                    <CityCard
                        locale={`${locale}`}
                        topic="madrid" 
                        topicLocalised="Madrid"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <CityCard
                        locale={`${locale}`}
                        topic="paris" 
                        topicLocalised="Paris"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <CityCard
                        locale={`${locale}`}
                        topic="oslo" 
                        topicLocalised="Oslo"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <CityCard
                        locale={`${locale}`}
                        topic="stockholm" 
                        topicLocalised="Stockholm"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
                    <CityCard
                        locale={`${locale}`}
                        topic="london" 
                        topicLocalised="London"
                        // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                    />
            </div>
            
        </div>
        {/* <div className="types">
            <h2>
                <FormattedMessage 
                    id={`homepage.searchOnline.${locale}`} 
                    defaultMessage="Search online" />    
            </h2>  
            <Grid container className="topic-cards " spacing={2}>
                <TypeCard className="classes-card"
                    locale={`${locale}`}
                    topic="online classes" 
                    count={props.onlineClasses.filter(item => item.format === "class").length }
                    topicLocalised={<FormattedMessage 
                        id={`general.classes.${locale}`} 
                        defaultMessage="Classes" />}
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                />
                <TypeCard className="webinars-card"
                    locale={`${locale}`}
                    topic="webinars" 
                    count={props.onlineClasses.filter(item => item.format === "webinar").length }
                    topicLocalised={<FormattedMessage 
                        id={`general.webinars.${locale}`} 
                        defaultMessage="Webinars" />}
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                />
                {/* <TopicCard
                    locale={`${locale}`}
                    topic="blog" 
                    topicLocalised={<FormattedMessage 
                        id={`general.blog.${locale}`} 
                        defaultMessage="Blog" />}
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                /> 
            </Grid>
        </div> */}
        {/* <div className="online-classes">
            <h2>
                <FormattedMessage id={`homepage.popularOnlineClasses.${locale}`} defaultMessage="Popular online classes"/>    
            </h2> 
            <Grid container className="topic-cards" spacing={2} alignContent="center">
                {props.onlineClasses.map((listing) => {                        
                    return(
                        <Grid item key={listing.id}>
                            <ListingCard 
                                nameId={listing.nameId}
                                format={listing.format}
                                online={listing.online}
                                listingImage={listing.listingImage}
                                listingTitle={(listing.hasOwnProperty('listingTitle')) ? listing.listingTitle : listing.listingName}
                                companyLogo={listing.companyLogo}
                                companyName={listing.companyName}
                                date={listing.date}
                                duration={listing.duration}
                                district={listing.district}
                                address={listing.address}
                                city={listing.city}
                                language={listing.language}
                                tags={listing.tags}
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
            
        </div> */}
        <div className="popular-online">
            <h2>
                <TranslatedText id={`homepage.popularOnlineClasses`} defaultMessage="Popular online classes"/>    
            </h2>  
            <div className="scroll-container">
                {props.onlineClasses.map((listing) => {
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
                })}
            </div>
            <div className="show-all-link">
                <Link to={{pathname:`/${locale.split('-')[0]}/online/explore`}}>
                    <TranslatedText id={`general.showAll`} defaultMessage="show all" />    
                </Link>
                <Icon>keyboard_arrow_right</Icon>
            </div>
        </div>

        <div className="popular-topics">
            <h2>
                <TranslatedText id={`homepage.popularTopics`} defaultMessage="Topics"/>    
            </h2>  
            <div className="scroll-container">
                <TopicCard
                    locale={`${locale}`}
                    topic="parenting" 
                    topicLocalised={                            
                        <TranslatedText id={`topics.parenting`} />
                    }
                    rootUrl="online"
                />
                <TopicCard
                    locale={`${locale}`}
                    topic="pregnancy" 
                    topicLocalised={                            
                        <TranslatedText id={`topics.pregnancy`} />
                    }
                    rootUrl="online"
                />
                <TopicCard
                    locale={`${locale}`}
                    topic="baby" 
                    topicLocalised={                            
                        <TranslatedText id={`topics.baby`} />
                    }
                    rootUrl="online"
                />
                <TopicCard 
                    locale={`${locale}`}
                    topic="nutrition" 
                    topicLocalised={                            
                        <TranslatedText id={`topics.nutrition`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}
                />
                <TopicCard 
                    locale={`${locale}`}
                    topic="postpartum" 
                    topicLocalised={<TranslatedText id={`topics.postpartum`} defaultMessage="baby"/>}
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("baby")).length}
                    />
                <TopicCard 
                    locale={`${locale}`}
                    topic="fitness" 
                    topicLocalised={<TranslatedText id={`topics.fitness`} defaultMessage="fitness"/>}
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("baby")).length}
                    />
                
            </div>
        </div>
        {/* <div className="popular-topics">
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
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}
                    />
                <TopicCard 
                    locale={`${locale}`}
                    topic="pregnancy" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.pregnancy.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("pregnancy")).length}
                    />
                <TopicCard 
                    locale={`${locale}`}
                    topic="baby" 
                    topicLocalised={<FormattedMessage id={`topics.baby.${locale}`} defaultMessage="baby"/>}
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("baby")).length}
                    />
                <TopicCard 
                    locale={`${locale}`}
                    topic="nutrition" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.nutrition.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classesThisWeek.filter((item) => item.tags.includes("nutrition")).length}
                    />
                {/* <TopicCard 
                    locale={`${locale}`}
                    topic="music" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.music.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}
                    />
                <TopicCard
                    locale={`${locale}`}
                    topic="postpartum" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.postpartum.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}
                    />
                <TopicCard
                    locale={`${locale}`}
                    topic="fitness" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.fitness.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}
                    />
                <TopicCard
                    locale={`${locale}`}
                    topic="first aid" 
                    topicLocalised={                            
                        <FormattedMessage id={`topics.first.${locale}`} />
                    }
                    rootUrl="online"
                    // resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}
                    /> 
            </Grid>
        </div> */}
        <div className="all-topics">
            <h2>
            <TranslatedText id={`homepage.allTopics`} />        
            </h2>  
            <RenderTags tags={props.topics} locale={`${locale}`} rootUrl="online" /> 
        </div>
        {/* <div className="types">
            <h2>
                <FormattedMessage id={`homepage.onlineByLanguage.${locale}`} defaultMessage="By language" />    
            </h2>  
            <Grid container className="topic-cards" spacing={2} alignContent="center">
                <LanguageCard
                    locale={`${locale}`}
                    topic="english" 
                    rootUrl="online"
                    topicLocalised={<FormattedMessage 
                        id={`general.english.${locale}`} 
                        defaultMessage="Blog" />}
                    // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                />
                <LanguageCard
                    locale={`${locale}`}
                    topic="spanish"
                    rootUrl="online" 
                    topicLocalised={<FormattedMessage 
                        id={`general.spanish.${locale}`} 
                        defaultMessage="Blog" />}
                    // resultCount={props.classEntries.filter((item) => item.city === "Madrid").length}
                />
                
            </Grid>
        </div> */}
    
        <div className="providers">
            <h2>
                <TranslatedText id={`homepage.onlineProviders`} defaultMessage="Online providers"/>    
            </h2> 
            {/* <p>List your classes</p> */}
            <OnlineProviders providers={props.onlineProviders}/>

        </div>
        
        
        
    </Container>
    );
}

export default Home; 
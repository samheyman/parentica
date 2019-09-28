import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ClassCard from '../components/ClassCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
        >
        <Box p={3}>{children}</Box>
        </Typography>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


function Explore(props) {
    const [value, setValue] = React.useState(props.tabSelected);

    function handleChange(event, newValue) {
        // scroll down 1px to trigger lazy loading of cards
        window.scrollBy(0, 1);
        setValue(newValue);
    }

    const classesList = props.listings.map(
        (classEntry) => {
            if ((classEntry.type === 'group' || classEntry.type === 'online')) {
                return(
                    <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                        <ClassCard classEntry={classEntry} />      
                    </Grid>
                );
            }
        }
    );

    const meetupsList = props.listings.map((classEntry) => {
        if( classEntry.type === 'meetup') {
            return (
                <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                    <ClassCard classEntry={classEntry} />      
                </Grid>
            );        
        } else {
            return(
                null
            );
        }
    });
    const seminarsList = props.listings.map((classEntry) => {
        if((classEntry.type === 'seminar' || classEntry.type === 'webinar')) {
            return (
                <Grid item xs={12} sm={6} md={4} key={classEntry.id}>
                    <ClassCard classEntry={classEntry} />      
                </Grid>
            );        
        } else {
            return(
                null
            );
        }
    });
    // TODO better way to do this
    let classesCount = classesList.filter((item) => item !== '' && item != null).length;
    let meetupsCount = meetupsList.filter((item) => item !== '' && item != null).length;
    let seminarsCount = seminarsList.filter((item) => item !== '' && item != null).length;

    // console.log(props.classes.length + " classes: " + props.classes);
    console.log(classesCount + " classes");
    console.log(seminarsCount + " seminars");
    console.log(meetupsCount + " meetups");

    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            console.log(props.topic);
            return(
                <Container className="main-content">
                    <h2>{
                        props.format === 'online' ?
                        <FormattedMessage 
                            id={`explore.tab.online.${locale}`}
                            defaultMessage="online"
                        />
                        :
                        <FormattedMessage 
                            id={`explore.tab.madrid.${locale}`}
                            defaultMessage="Madrid"
                        />
                        
                    }</h2>
                    <div className="result-filters">
                        {(props.topic && props.topic!=="all" && props.topic!==null)?
                            <React.Fragment>
                                <span className={`tag tag-${props.topic}`}>
                                    <FormattedMessage 
                                        id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                                        defaultMessage={props.topic}
                                    />
                                </span>
                                
                                <Link to={{pathname:`/${props.locale.split('-')[0]}/${props.format}/explore`}}>
                                    <span className="tag">
                                        <FormattedMessage 
                                            id={`general.clear.${locale}`}
                                            defaultMessage="clear"
                                        />
                                    </span>
                                </Link>
                                
                            </React.Fragment>
                            :
                            null
                        }
                        {(props.classLanguage==="spanish" || props.classLanguage==="english")?
                            <React.Fragment>
                                <span className={`tag tag-${props.topic}`}>
                                    <FormattedMessage 
                                        id={`general.${props.classLanguage}.${locale}`}
                                        defaultMessage=""
                                    />
                                </span>
                                
                                <Link to={{pathname:`/${props.locale.split('-')[0]}/madrid/explore`}}>
                                    <span className="tag">
                                        <FormattedMessage 
                                            id={`general.clear.${locale}`}
                                            defaultMessage="clear"
                                        />
                                    </span>
                                </Link>
                                
                            </React.Fragment>
                            :
                            null
                        }
                    </div>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example">
                    <Tab
                        label={
                            <React.Fragment>
                            <FormattedMessage 
                                id={`explore.tab.classes.${locale}`}
                                defaultMessage="Classes"
                                values={{
                                    count: classesCount
                                }}
                            />
                            {/* <br/><span className="results-count">({classesCount})</span> */}
                            </React.Fragment>
                        } 
                        {...a11yProps(0)} 
                    />
                    <Tab 
                        label={
                            <React.Fragment>
                            <FormattedMessage 
                                id={`explore.tab.seminars.${locale}`}
                                defaultMessage="seminars"
                                values={{
                                    count: seminarsCount
                                }}
                            />
                            {/* <br/><span className="results-count">({seminarsCount})</span> */}
                            </React.Fragment>
                        } 
                        {...a11yProps(2)} 
                    />
                    {
                    props.format!=='online' ?
                        <Tab 
                            label={
                                <React.Fragment>
                                <FormattedMessage 
                                    id={`explore.tab.meetups.${locale}`}
                                    defaultMessage="meetups"
                                    values={{
                                        count: meetupsCount
                                    }}
                                />
                                {/* <br/><span className="results-count">({meetupsCount})</span> */}
                                </React.Fragment>
                            } 
                            {...a11yProps(1)} 
                        />
                    : null
                    }
                </Tabs>
            </AppBar>
            <TabPanel className="search-results" value={value} index={0}>
                {(classesCount > 0 ) ?
                <Grid container spacing={2} alignContent="center">
                    {classesList.filter((item) => item !== '')}
                </Grid>
                :
                <p>
                    <FormattedMessage 
                        id={`explore.results.city.none.${locale}`}
                        defaultMessage=""
                        // values={{
                        //     topicLabel: <FormattedMessage 
                        //                     id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                        //                     defaultMessage={props.topic}
                        //                 />
                        // }}
                    />
                </p>}
            </TabPanel>
            <TabPanel className="search-results" value={value} index={1}>
                {(seminarsCount > 0 ) ?
                <Grid container spacing={2} alignContent="center">
                    {seminarsList.filter((item) => item !== '')}
                </Grid>
                :
                <p>
                    <FormattedMessage 
                        id={`explore.results.seminars.none.${locale}`}
                        defaultMessage="Sorry no seminars found."
                        // values={{
                        //     topicLabel: 
                        //         <FormattedMessage 
                        //             id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                        //             defaultMessage={props.topic}
                        //         />
                        // }}
                    />
                </p>}
            </TabPanel>
            <TabPanel className="search-results" value={value} index={2}>
                {(meetupsCount > 0 ) ?
                <Grid container spacing={2} alignContent="center">
                    {meetupsList.filter((item) => item !== '')}
                </Grid>
                :
                <p>
                    <FormattedMessage 
                        id={`explore.results.meetups.none.${locale}`}
                        defaultMessage="Sorry no meetups found."
                        // values={{
                        //     topicLabel: 
                        //         <FormattedMessage 
                        //             id={`topics.${props.topic.split(" ")[0]}.${locale}`}
                        //             defaultMessage={props.topic}
                        //         />
                        // }}
                    />
                </p>}
            </TabPanel>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Explore;